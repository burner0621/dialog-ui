import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const CuttingInLoader = require('../../../loader/garment-cutting-in-by-ro-loader');

@inject(Service, SalesService, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCuttingIn;
    @bindable itemOptions = {};
    @bindable selectedCuttingIn;
    @bindable selectedUnit;
    @bindable selectedUnitFrom;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Jumlah",
        ]
    }

    @computedFrom("data.UnitFrom")
    get cuttingInFilter() {
        this.selectedCuttingIn = null;
        if (this.data.UnitFrom) {
            return {
                UnitId: this.data.UnitFrom.Id,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        } else {
            return {
                UnitId: 0,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true 
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get cuttingInLoader() {
        return CuttingInLoader;
    }

    async selectedCuttingInChanged(newValue, oldValue){
        if(this.context.isCreate){
            if(newValue) {
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.CuttingOutType = "SEWING";
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

                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.UnitFrom.Id , IsValid:true})});
                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                    //console.log(this.data.Price)
                }
                else{
                    this.data.Price=0;
                }

                let priceSewingResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
                if(priceSewingResult.data.length>0){
                    this.data.PriceSewing= priceSewingResult.data[0].Price;
                    //console.log(this.data.Price)
                }
                else{
                    this.data.PriceSewing=0;
                }
    
                Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.UnitFrom.Id, CuttingType:"MAIN FABRIC" }) }))
                    .then(result => {
                        for(var cuttingInHeader of result.data){
                            for(var cuttingInItem of cuttingInHeader.Items){
                                for(var cuttingInDetail of cuttingInItem.Details){
                                    if(cuttingInDetail.RemainingQuantity>0){
                                        cuttingInDetail.CuttingInId = cuttingInHeader.Id;
                                        cuttingInDetail.CuttingInDetailId = cuttingInDetail.Id;
                                        cuttingInDetail.ComodityPrice=this.data.Price;
                                        this.data.Items.push(cuttingInDetail);
                                    }
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

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Items.splice(0);
        }
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
    }

    selectedUnitFromChanged(newValue){
        if(newValue){
            this.data.UnitFrom=newValue;
            this.data.Unit=this.data.UnitFrom;
            this.selectedUnit=this.data.UnitFrom;
        }
        else{
            this.data.UnitFrom=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Items.splice(0);
        }
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave){
                    if(item.Details){
                        for(var detail of item.Details){
                            qty += detail.CuttingOutQuantity;
                        }
                    }
                }
            }
        }
        return qty;
    }
}