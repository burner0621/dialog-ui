import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, SalesService, CoreService } from "../service";

const CuttingInLoader = require('../../../../loader/garment-cutting-in-by-ro-loader');

@inject(Service, SalesService, CoreService)
export class Item {
    @bindable selectedCuttingIn;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    get cuttingInFilter() {
        //this.selectedCuttingIn = null;
        if (this.data.Unit && this.data.Buyer) {
            return {
                UnitId: this.data.Unit.Id,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC",
                BuyerCode: this.data.Buyer.Code
            };
        } else {
            return {
                UnitId: 0,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC",
                BuyerCode: ""
            };
        }
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions=context.context.options;
        if(this.data){
            this.selectedCuttingIn={
                RONo:this.data.RONo,
                Article: this.data.Article
            }
        }
        this.isShowing = true;
        if (this.data.Details) {
            if (this.data.Details.length > 0) {
                this.isShowing = true;
            }
        }
    }
    itemsColumnsCreate= [
           // "Kode Barang",
            "Keterangan",
            "Jumlah",
            "Jumlah Keluar",
            ""
        ];

    itemsColumns= [
        // "Kode Barang",
            "Keterangan",
            "Jumlah Keluar",
            ""
        ];

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get cuttingInLoader() {
        return CuttingInLoader;
    }

    async selectedCuttingInChanged(newValue, oldValue){
        if(this.isCreate){
            if(newValue) {
                console.log(newValue)
                if(this.data.Details.length>0){
                    this.data.Details.splice(0);
                }
                //this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
                if(noResult.data.length>0){
                    this.data.Comodity = noResult.data[0].Comodity;
                } else {
                    const comodityCodeResult = await this.salesService.getHOrderKodeByNo({ no: this.data.RONo });
                    const comodityCode = comodityCodeResult.data[0];
                    if (comodityCode) {
                        const comodityResult = await this.coreService.getGComodity({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
                        this.data.Comodity = comodityResult.data[0];
                    }
                }
                let ssCuttingItems=[];
                let ssCutting = await this.service.searchItem({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
                //console.log(ssCutting)
                if(ssCutting.data.length>0){
                    for(var ssC of ssCutting.data){
                        for(var ssCItem of ssC.Details){
                            for(var scSize of ssCItem.Sizes){
                                var item={};
                                item.cuttingInDetailId=scSize.CuttingInDetailId;
                                item.qty=scSize.Quantity;
                                if(ssCuttingItems[scSize.CuttingInDetailId]){
                                    ssCuttingItems[scSize.CuttingInDetailId].qty+=scSize.Quantity;
                                }
                                else{
                                    ssCuttingItems[scSize.CuttingInDetailId]=item;
                                }
                            }
                        }
                    }
                }
                //console.log()
                Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, CuttingType:"MAIN FABRIC"}) }))
                    .then(result => {
                        for(var cuttingInHeader of result.data){
                            for(var cuttingInItem of cuttingInHeader.Items){
                                for(var cuttingInDetail of cuttingInItem.Details){
                                    var qtyOut=0;
                                    var detail={};
                                    
                                    if(ssCuttingItems[cuttingInDetail.Id]){
                                        qtyOut+=ssCuttingItems[cuttingInDetail.Id].qty;
                                    }
                                    console.log(qtyOut)
                                   // if(cuttingInDetail.CuttingInQuantity-qtyOut>0){
                                        // cuttingInDetail.CuttingInId = cuttingInHeader.Id;
                                        // cuttingInDetail.CuttingInDetailId = cuttingInDetail.Id;
                                        // cuttingInDetail.Product=cuttingInDetail.Product;
                                        //cuttingInDetail.CuttingInDate=cuttingInHeader.CuttingInDate;
                                    if(this.data.Details.length==0){
                                       // detail.Quantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                        detail.CuttingInQuantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                        detail.DesignColor=cuttingInDetail.DesignColor;
                                        this.data.Details.push(detail);
                                    }
                                    else{
                                        var exist= this.data.Details.find(a=>a.DesignColor==cuttingInDetail.DesignColor);
                                        if(!exist){
                                            //detail.Quantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                            detail.CuttingInQuantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                            detail.DesignColor=cuttingInDetail.DesignColor;
                                            this.data.Details.push(detail);
                                        }
                                        else{
                                            var idx= this.data.Details.indexOf(exist);
                                            //exist.Quantity+=cuttingInDetail.CuttingInQuantity-qtyOut;
                                            exist.CuttingInQuantity+=cuttingInDetail.CuttingInQuantity-qtyOut;
                                            this.data.Details[idx]=exist;
                                        }
                                    }    
                                   // }
                                    
                                }
                            }
                        }
                    });
            }
            else {
                this.context.selectedCuttingInViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Items.splice(0);
            }
        }
    }

}