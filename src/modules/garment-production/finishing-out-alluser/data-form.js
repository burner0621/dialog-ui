import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable selectedUnit;
    @bindable selectedUnitTo;
    @bindable itemOptions = {};
    @bindable selectedFinishingTo;

    finishingToOptions = ['GUDANG JADI','SEWING'];

    constructor(service,purchasingService) {
        this.service = service;
        this.purchasingService=purchasingService;
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
            "Size",
            "Jumlah",
            "Satuan",
            "Warna"
        ]
    }

    

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isEdit: this.context.isEdit,
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

    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    selectedFinishingToChanged(newValue){
        this.data.FinishingTo=newValue;
        if(newValue=="GUDANG JADI"){
            this.data.UnitTo=this.data.Unit;
            this.selectedUnitTo=this.data.UnitTo;
        }
        else{
            this.data.UnitTo=null;
            this.selectedUnitTo=this.data.UnitTo;
        }
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
            if(this.selectedFinishingTo=="GUDANG JADI"){
                this.data.UnitTo=this.data.Unit;
                this.selectedUnitTo=this.data.UnitTo;
            }
        }
        else{
            this.context.selectedROViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Buyer =null;
            this.data.Items.splice(0);
        }
        this.context.selectedROViewModel.editorValue = "";
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Buyer =null;
        this.data.Items.splice(0);
    }

    selectedUnitToChanged(newValue){
        if(newValue){
            this.data.UnitTo=newValue;
        }
        else{
            this.data.UnitTo= null;
        }
    }

    async selectedROChanged(newValue, oldValue){
        if(this.context.isCreate){
            if(newValue) {
                
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity = newValue.Comodity;
                
                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
                
                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                }
                else{
                    this.data.Price=0;
                }

                Promise.resolve(this.service.searchFinishingInComplete({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id }) }))
                    .then(result => {
                        
                        for(var finishingIn of result.data){
                            for(var finishingInItem of finishingIn.Items){
                                var item={};
                                if(finishingInItem.RemainingQuantity>0){
                                    item.FinishingInItemId=finishingInItem.Id;
                                    item.FinishingInId=finishingIn.Id;
                                    item.Quantity=finishingInItem.RemainingQuantity;
                                    item.Product=finishingInItem.Product;
                                    item.Uom=finishingInItem.Uom;
                                    item.Size=finishingInItem.Size;
                                    item.FinishingInQuantity=finishingInItem.RemainingQuantity;
                                    item.Color=finishingInItem.Color;
                                    item.DesignColor=finishingInItem.DesignColor;
                                    item.BasicPrice=finishingInItem.BasicPrice;
                                    item.ComodityPrice=this.data.Price;

                                    this.data.Items.push(item);
                                }
                            }
                        }
                    });
            }
            else {
                this.context.selectedROViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Buyer =null;
                this.data.Items.splice(0);
            }
            this.data.Items.splice(0);
        }
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id,"Items.Any(RemainingQuantity>0)":true})
            };
            return this.service.searchFinishingIn(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                        }
                        return roList;
                });
        }
    }

    changeChecked(){
        if(this.data.Items){
            for(var a of this.data.Items){
                a.Quantity=a.FinishingInQuantity;
                a.IsSave=false;
            }
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave){
                    if(this.data.IsDifferentSize){
                        if(item.Details){
                            for(var detail of item.Details){
                                qty += detail.Quantity;
                            }
                        }
                    }
                    else{
                        qty += item.Quantity;
                    }
                }
            }
        }
        return qty;
    }
}