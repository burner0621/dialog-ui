import { inject, bindable, computedFrom } from 'aurelia-framework'
const UnitLoader = require('../../../../loader/garment-units-loader');


export class unit {
    @bindable selectedUnit;
    constructor() {
        
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
        this.headerData= context.context.options.data;
        this.items=this.headerData.invoiceDetails;
    }
    get unitLoader() {
        return UnitLoader;
    }

    unitView = (data) => {
        var code= data.Code || data.code;
        return `${code}`;
    }
    selectedUnitChanged(newValue){
        if(newValue){
            this.data.unit= {
                code:newValue.Code || newValue.code,
                id:newValue.Id || newValue.id,
                name: newValue.Name || newValue.name
            }

        }
    }

    get amountPercentage(){
        let amountPercentage=0;
        if(this.items){
            var totQty=0;
            var qty=0;
            for(var item of this.items){
                if(item.items){
                    for(var detailInv of item.items){
                        totQty+=detailInv.quantity;
                        if(detailInv){
                            if(detailInv.unit.code==this.data.unit.code){
                                qty+=detailInv.quantity;
                            }
                        }
                        amountPercentage=qty / totQty * 100;
                    }
                }
            }
        }
        this.data.amountPercentage=amountPercentage;
        return amountPercentage;
    }

    get billAmount(){
        let billAmount=0;
        if(this.headerData.totalBill && this.data.amountPercentage){
            billAmount=this.headerData.totalBill*this.data.amountPercentage.toFixed(2)/100;
        }
        this.data.billAmount=billAmount;
        return billAmount;
    }
}