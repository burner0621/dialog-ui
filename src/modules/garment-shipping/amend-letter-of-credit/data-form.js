import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const LCLoader = require('../../../loader/garment-shipping-letter-of-credit-loader');

import moment from 'moment';
@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedLC;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "No Amend", value: "amendNumber" },
        { header: "Tgl Amend", value: "date" },
        { header: "Description", value: "description" },
        { header: "Amount", value: "amount" }
    ]

    get lcLoader() {
        return LCLoader;
    }

    lcView = (data) => {
        return `${data.documentCreditNo}`;
    }
    
    async selectedLCChanged(newValue){
        if(!this.data.id){
            this.data.DataItems.splice(0);
            this.data.amendNumber=0;
        }
        if(newValue){
            this.data.documentCreditNo=newValue.documentCreditNo;
            this.service.search({filter : JSON.stringify({ DocumentCreditNo: this.data.documentCreditNo })})
            .then(result=>{
                if(result.data.length>0){
                    for(var lc of result.data){
                        if(this.data.id && this.data.amendNumber==lc.amendNumber){
                            continue;
                        }
                        else{
                            lc.date=moment(lc.date).format("DD MMM YYYY");
                            this.data.DataItems.push(lc);
                        }
                    }
                }
                if(!this.data.id)
                    this.data.amendNumber=result.data.length +1;
            })
        }
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        if(this.data.id){
            this.selectedLC={
                documentCreditNo:this.data.documentCreditNo
            };
        }
    }

    
    
}
