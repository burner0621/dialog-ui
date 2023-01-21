import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import {EventAggregator} from 'aurelia-event-aggregator';
let PackagingAreaLoader = require("../../../loader/input-packaging-loader");

@inject(EventAggregator)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    // itemColumns = ["No. SPP", "Buyer", "Unit", "Material", "Warna", "Motif", "Grade", "Satuan", "Saldo"];
    itemColumns = ["No. SPP", "Qty Order","Buyer", "Unit", "Material", "Warna", "Motif", "Grade", "Satuan","Qty Masuk"];
    shifts = ["PAGI", "SIANG"];
    groups = ["A", "B"];
    constructor(eventAggregator,service) {
        this.eventAggregator = eventAggregator;
        this.service = service;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    get packagingAreaLoader() {
        return PackagingAreaLoader;
    }
    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "PACKING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedPackaging = {};
            this.selectedPackaging.bonNo = this.data.bonNo;
            this.data.packagingProductionOrders = [];
        }

    }

    @bindable selectedPackaging;
    selectedPackagingChanged(n, o) {
        if(n!=o){
            if (this.selectedPackaging) {
                this.data.inputPackagingId = this.selectedPackaging.id;
                this.data.bonNo = this.selectedPackaging.bonNo;
            }
        }
    }
    
    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
    addItemCallback = (e) => {
        this.data.packagingProductionOrders = this.data.packagingProductionOrders || [];
        this.data.packagingProductionOrders.push({});
    };
}


