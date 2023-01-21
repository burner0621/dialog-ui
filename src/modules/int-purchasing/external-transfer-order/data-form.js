import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var DivisionLoader = require('../../../loader/division-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedOrderDivision;
    @bindable selectedDeliveryDivision;
    @bindable selectedCurrency;

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

    externalTransferOrderItemsColumns = [
        "Nomor Transfer Request",
    ];

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.readOnly) {
            this.externalTransferOrderItemsColumns.push("");
        }

        if (this.data) {
            this.selectedOrderDivision = this.data.OrderDivision;
            this.selectedDeliveryDivision = this.data.DeliveryDivision;
            this.selectedCurrency = this.data.Currency;
        }

        if (!this.selectedCurrency) {
            this.selectedCurrency = await this.service.getCurrency("IDR");
        }

    }

    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
        return `${division.code} - ${division.name}`;
    }

    selectedOrderDivisionChanged(newValue, oldValue) {
        this.data.OrderDivision = newValue;
        if (newValue) {
            this.data.OrderDivisionId = newValue._id;

            Object.assign(this.externalTransferOrderItemsOptions.filter, { DivisionId: newValue._id }); // DivisionId dari table ITO

            if (oldValue && newValue._id !== oldValue._id)
                this.data.ExternalTransferOrderItems.splice(0, this.data.ExternalTransferOrderItems.length);
        }
        else if (oldValue) {
            this.data.ExternalTransferOrderItems.splice(0, this.data.ExternalTransferOrderItems.length);
        }
    }

    selectedDeliveryDivisionChanged(newValue) {
        if (newValue) {
            this.data.DeliveryDivision = newValue;
            this.data.DeliveryDivisionId = newValue._id;
        }
    }

    currencyView = (currency) => {
        return `${currency.code} - ${currency.description}`;
    }
    selectedCurrencyChanged(newValue) {
        if (newValue) {
            this.data.Currency = newValue;
            this.data.CurrencyId = newValue._id;
        }
    }

    get addExternalTransferOrderItems() {
        return () => {
            this.data.ExternalTransferOrderItems.push({});
        }
    };

}