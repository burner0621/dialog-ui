import { inject, bindable, computedFrom } from 'aurelia-framework'
const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');


export class invoice {
    @bindable selectedInvoice;

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
        if(this.data.InvoiceNo){
            this.selectedInvoice={
                invoiceNo:this.data.InvoiceNo,
                id:this.data.InvoiceId,
                amountToBePaid:this.data.Amount
            }
        }
        this.filter={
            BuyerAgentCode: this.data.buyer.Code || this.data.buyer.code
        }
    }
    
    
    get invoiceLoader() {
        return InvoiceLoader;
    }

    selectedInvoiceChanged(newValue){
        console.log(newValue)
        if(newValue){
            this.data.InvoiceNo=newValue.invoiceNo;
            this.data.InvoiceId=newValue.id;
            this.data.Amount= newValue.amountToBePaid;
            this.data.IDRAmount= newValue.amountToBePaid * this.data.rate;
        }
    }
}