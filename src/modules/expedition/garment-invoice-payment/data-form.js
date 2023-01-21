import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedBuyer;
    @bindable selectedCurrency;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    length4 = {
        label: {
            align: "right",
            length: 6
        },
        control: {
            length: 6
        }
    }
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    invoicesColumns = [
        { header: "No Invoice"},
        { header: "Amount"},
        { header: "Amount IDR"},
    ];


    get buyerLoader() {
        return BuyerLoader;
    }
    get currencyLoader() {
        return CurrencyLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit=this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if(this.data.Buyer && this.data.Currency){
            this.selectedBuyer=this.data.Buyer;
            this.selectedCurrency=this.data.Currency;
            for(var i of this.data.Items){
                i.buyer=this.selectedBuyer;
                i.rate= this.selectedCurrency.Rate;
            }
        }
    }

    buyerView = (data) => {
        var code= data.Code || data.code;
        var name= data.Name || data.name;
        return `${code} - ${name}`;
    }

    currencyView = (data) => {
        var code= data.Code || data.code;
        return `${code}`;
    }

    get addInvoices() {
        return (event) => {
            this.data.Items.push({buyer: this.data.Buyer, rate: this.data.Currency.Rate});
        };
    }

    get removeInvoices() {
        return (event) => {
            this.error = null;
        };
    }

    get totalAmount(){
        var amount=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                amount+=item.Amount;
            }
        }
        return amount;
    }

    get totalAmountIDR(){
        var amount=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                amount+=item.IDRAmount;
            }
        }
        return amount;
    }


    selectedBuyerChanged(newValue){
        if(newValue != this.data.Buyer){
            this.data.Items.splice(0);
            this.data.Buyer=newValue;
        }
    }

    selectedCurrencyChanged(newValue){
        if(newValue != this.data.Currency){
            this.data.Items.splice(0);
            this.data.Currency={
                Id:newValue.Id,
                Rate: newValue.rate,
                Code: newValue.code
            };
            console.log(newValue)
        }
    }
}
