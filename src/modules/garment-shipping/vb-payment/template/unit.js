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
}