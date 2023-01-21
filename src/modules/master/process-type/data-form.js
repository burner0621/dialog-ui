import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var OrderLoader = require('../../../loader/order-type-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedOrder;
    @bindable selectedStyle;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    }
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    // detailColumns = [{ header: "Jenis Proses" }, { header: "Jenis Order" }, { header: "Keterangan" }];

    units = ["", "DYEING", "PRINTING"];
    orderFields = ["name", "code"];
    sppCodes = [""];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.OrderType) {
            this.selectedOrder = this.data.OrderType;
        }
    }


    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    selectedOrderChanged(newValue, oldValue) {
        var _selectedOrder = newValue;
        if (_selectedOrder) {
            this.data.OrderType = _selectedOrder;
            this.data.Unit = this.data.OrderType.Unit;
            this.selectedOrder = _selectedOrder;
            if (this.data.Unit && this.data.Unit.toUpperCase() == "DYEING") {
                this.sppCodes = ["", "SPD", "SPW", "SPLD", "SPDT", "SPWT", "SPYD", "SPPC", "SPBD", "SPBW", "SPDV"];
            } else if (this.data.Unit && this.data.Unit.toUpperCase() == "PRINTING") {
                this.sppCodes = ["", "SPP", "SPDP", "SPTP", "SPSO", "SPPT", "SPPC", "SPBP","SPDV"];
            } else if (this.data.Unit) {
                this.sppCodes = ["", "SPPC", "SPDV"];
            } else {
                this.sppCodes = [""];
            }
        } else {
            // delete this.data.orderTypeId;
            this.selectedOrder = {};
            this.data.OrderType = null;
            this.data.Unit = null;

        }

    }

    get orderLoader() {
        return OrderLoader;
    }

    orderView = (order) => {
        return `${order.Code ? order.Code : ""} - ${order.Name}`
    }

} 