import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var moment = require('moment');

@inject(BindingEngine, Element, Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable currency;
    @bindable supplier;
    @bindable options = {};

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }
    invoiceNoteItem = {
        columns: [
            { header: "Nomor Invoice", value: "invoice.invoiceNo"},
            { header: "Tanggal Invoice" },
            { header: "Total Amount" }
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({});
        }.bind(this),
    };

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.options = this.options ? this.options : {};
        // console.log(context);

        if(this.data.supplier){
            this.options.supplierId = this.data.supplier.Id;      
        }
        if(this.data.currency){
            this.options.currencyCode = this.data.currency.Code;
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get supplierIsImport() {
        if (this.data.supplier) {
            if (this.data.supplier.import)
                return true
            else
                return false
        }
        else
            return false
    }
    
    currencyChanged(newValue, oldValue) {
        var selectedCurrency = newValue;

        if (selectedCurrency) {
            this.data.currency = selectedCurrency;
            this.options.currencyCode = this.data.currency.code; 
        }
        else {
            this.currency = null;
            this.data.items = [];
            this.supplier = null;
        }

        if (!this.data.isView){
            this.data.items = [];
            this.context.error.items = [];
        }
        
    }

    supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            this.data.supplier = selectedSupplier;
            this.data.supplierId = selectedSupplier.Id;
            this.options.supplierId = selectedSupplier.Id;
            this.options.currencyCode = this.data.currency.code;   
            this.data.supplier.isView = false;
        }
        else {
            this.data.supplier = null;
            this.data.supplierId = null;
            this.data.items = [];
        }

        if (!this.data.isView){
            this.data.items = [];
            this.context.error.items = [];
        }
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    currencyView = (currency) => {
        var code=currency.code? currency.code : currency.Code;
        return `${code}`
    }

    supplierView = (supplier) => 
    {
        var code=supplier.code? supplier.code : supplier.Code;
        var name=supplier.name? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }
}
