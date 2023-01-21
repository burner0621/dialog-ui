import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service) {
        this.service = service;
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
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit,
            checkedAll: true,
            readOnly:this.readOnly
        }
        // if(this.data.SewingDOId){
        //     this.selectedSewingDO= await this.service.getSewingDObyId(this.data.SewingDOId);
        // }

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

    ROView=(ro) => {
        return `${ro.RONo}`;
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
    

    get unitLoader() {
        return UnitLoader;
    }


    selectedUnitChanged(newValue){
        this.selectedRO=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Price=0;
        this.data.Items.splice(0);
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.selectedRO=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Price=0;
            this.data.Items.splice(0);
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
                                    item.Color=finishingInItem.Color;
                                    item.DesignColor=finishingInItem.DesignColor;
                                    item.BasicPrice=finishingInItem.BasicPrice;
                                    item.ComodityPrice=this.data.Price;
                                    item.RemainingQuantity=finishingInItem.RemainingQuantity;

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
                this.data.Items.splice(0);
            }
            this.data.Items.splice(0);
        }
    }

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah Keluar",
            "Satuan",
            "Warna",
        ]
    }


    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave)
                    qty += item.Quantity;
            }
        }
        return qty;
    }
}