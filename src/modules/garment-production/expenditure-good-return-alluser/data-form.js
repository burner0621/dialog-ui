import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,SalesService,PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,SalesService,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable isCreate = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service,salesService,purchasingService) {
        this.service = service;
        this.salesService=salesService;
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
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isCreate=this.context.isCreate;
        this.itemOptions = {
            isEdit: this.context.isEdit,
            checkedAll: true,
            isCreate: this.context.isCreate
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

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id, ExpenditureType:"EXPORT"})
            };
            return this.service.getExpenditureGood(info)
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

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    selectedUnitChanged(newValue){
        this.selectedRO=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Items = [];
        this.data.Price=0;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items = [];
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
        }
    }

    async selectedROChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Buyer=null;
        this.data.ContractNo=null;
        this.data.Items.splice(0);
        this.data.Price=0;
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            this.data.Buyer=newValue.Buyer;
            this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;

            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
            }
            else{
                this.data.Price=0;
            }
            Promise.resolve(this.service.getExpenditureGood({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, ExpenditureType:"EXPORT"}) }))
                    .then(result => {
                        for(var exGood of result.data){
                            for(var exGoodItem of exGood.Items){
                                let Qty= exGoodItem.Quantity-exGoodItem.ReturQuantity;
                                if(Qty>0){
                                    var item={};
                                    if(this.data.Items.length>0){
                                        var duplicate= this.data.Items.find(a=>a.Size.Id==exGoodItem.Size.Id && a.Uom.Id==exGoodItem.Uom.Id);
                                        
                                        if(duplicate){
                                            var idx= this.data.Items.indexOf(duplicate);
                                            duplicate.Quantity+=Qty;
                                            duplicate.StockQuantity+=Qty;
                                            this.data.Items[idx]=duplicate;
                                        }else{
                                            item.IsSave=true;
                                            item.FinishedGoodStockId=exGoodItem.FinishedGoodStockId;
                                            item.ExpenditureGoodId=exGood.Id;
                                            item.ExpenditureGoodItemId=exGoodItem.Id;
                                            item.Size=exGoodItem.Size;
                                            item.StockQuantity=Qty;
                                            item.Quantity=Qty;
                                            item.Uom= exGoodItem.Uom;
                                            item.Description=exGoodItem.Description;
                                            item.BasicPrice=exGoodItem.BasicPrice;
                                            this.data.Items.push(item);
                                        }
                                    }
                                    else{
                                        item.IsSave=true;
                                        item.FinishedGoodStockId=exGoodItem.FinishedGoodStockId;
                                        item.ExpenditureGoodId=exGood.Id;
                                        item.ExpenditureGoodItemId=exGoodItem.Id;
                                        item.Size=exGoodItem.Size;
                                        item.StockQuantity=Qty;
                                        item.Quantity=Qty;
                                        item.Uom= exGoodItem.Uom;
                                        item.Description=exGoodItem.Description;
                                        item.BasicPrice=exGoodItem.BasicPrice;
                                        this.data.Items.push(item);
                                    }
                                }
                            }
                        }

                    });
            }
        
        
        else {
            this.context.selectedROViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Items.splice(0);
            this.data.Price=0;
            this.data.Buyer=null;
            this.data.ContractNo=null;
        }
    }
    itemsInfo = { 
        columns: [
            "Size",
            "Jumlah Pengeluaran",
            "Jumlah Retur",
            "Satuan",
            "Keterangan",
        ]
    };

    itemsInfoNotCreate = { 
        columns: [
            "Size",
            "Jumlah Retur",
            "Satuan",
            "Keterangan",
        ]
    };

    ROView=(ro) => {
        return `${ro.RONo}`;
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