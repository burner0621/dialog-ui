import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var BankLoader = require('../../../loader/account-banks-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var BuyerLoader = require('../../../loader/buyers-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.data.Status = this.context.status || this.data.Status || "IN";
        this.data.SourceType = this.context.sourceType || this.data.SourceType || this.sourceTypes[0];
        this.data.Bank = this.context.bank || this.data.Bank || this.data.Bank;
    }

    // statusOptions = ["IN", "OUT"];
    sourceTypes = ["Operasional", "Investasi", "Pendanaan", "Lain - lain"];

    get bankLoader() {
        return BankLoader;
    }

    bankView = (bank) => {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get getSupplierLabel() {
        if (this.data.Status == "OUT" && this.data.SourceType == "Operasional") {
            return "Supplier";
        } else {
            return "Ke";
        }
    }

    supplierView = (supplier) => {
        return supplier.Code ? `${supplier.Code} / ${supplier.Name}` : ""
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get getBuyerLabel() {
        if (this.data.Status == "IN" && this.data.SourceType == "Operasional") {
            return "Buyer";
        } else {
            return "Dari";
        }
    }

    buyerView = (buyer) => {
        return buyer.Code ? `${buyer.Code} / ${buyer.Name}` : ""
    }

    get isFrom() {
        if (this.data.Status == "IN") {
            return true;
        }
        return false;
    }
}