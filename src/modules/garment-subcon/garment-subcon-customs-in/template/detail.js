import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from '../service';
const CustomsOutLoader = require('../../../../loader/garment-subcon-customs-out-loader');

@inject(Service)
export class Detail {
    @bindable selectedCustomsOut;

    get customsOutLoader() {
        return CustomsOutLoader;
    }

    constructor(service) {
        this.service = service;
    }

    get filter() {
        var filterSC={
            SubconContractId:this.SCId
        }
        for(var item of this.context.context.items){
            filterSC[`CustomsOutNo == "${item.data.CustomsOutNo}"`]=false;
        }
        return filterSC;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        console.log(context)
        if(this.data.SubconCustomsOutId){
            this.selectedCustomsOut = this.data.CustomsOutNo;
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = this.context.context.options.isEdit;
        this.SCId=context.context.options.SCId;
        if(this.isEdit){
            this.readOnly=false;
        }

    }

    async selectedCustomsOutChanged(newValue) {
        if (newValue) {
            this.data.CustomsOutNo = newValue.CustomsOutNo;
            this.data.SubconCustomsOutId = newValue.Id;
            this.data.CustomsOutQty = newValue.Quantity;
        }
    }


}