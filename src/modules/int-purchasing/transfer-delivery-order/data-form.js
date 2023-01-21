import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var SupplierLoader = require('../../../loader/supplier-loader');
var DivisionLoader = require('../../../loader/division-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable supplier;
    @bindable division;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.externalTransferOrderItemsOptions = { filter: {} };
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsInfo = [
        "Nomor TO External",
    ];

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        
        this.error = this.context.error;
// console.log(this.readOnly);
        if (this.readOnly) {
            this.itemsInfo.push("");
        }

        if (this.data) {
            this.division = this.data.Division;
            this.supplier = this.data.Supplier;
        }
        // console.log(this.division);
    }

    get divisionLoader() {
        return DivisionLoader;
    }
    get supplierLoader() {
        return SupplierLoader;
    }
    divisionView = (division) => {
        return `${division.code} - ${division.name}`;
    }
    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    supplierChanged(newValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier._id) {
                this.data.supplier = selectedSupplier;
                this.data.SupplierId = selectedSupplier._id;
                this.data.SupplierName=selectedSupplier.name;
                this.data.SupplierCode=selectedSupplier.code;
                
            }
        }
    }

    divisionChanged(newValue, oldValue) {
        this.data.division = newValue;
        if (newValue) {
            // console.log(this.data.division)
            this.data.DivisionId = this.data.division._id;
            this.data.DivisionName=this.data.division.name;
            this.data.DivisionCode=this.data.division.code;
            Object.assign(this.externalTransferOrderItemsOptions.filter, { OrderDivisionName: this.data.DivisionName });
            if (oldValue && newValue._id !== oldValue._id)
            this.data.items.splice(0, this.data.items.length);
    }
    else if (oldValue) {
        this.data.items.splice(0, this.data.items.length);
        }
    }

    get addItems() {
        return () => {
            this.data.items.push({});
            // console.log(this.division);
        }
    };

}