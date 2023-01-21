import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

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
    itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Satuan", "Qty Terima"];
    shifts = ["PAGI", "SIANG"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    detailOptions = {};
    groups = ["A", "B"];

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "INSPECTION MATERIAL";
        this.detailOptions.isEdit = this.isEdit;
        this.error = this.context.error;


        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.isEdit && !this.readOnly) {
            this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material",  "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Satuan", "Qty Terima", ""];
        } else {
            this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material",  "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Satuan", "Qty Terima"];
        }
    }
    addItemCallback = (e) => {
        this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders || [];
        this.data.inspectionMaterialProductionOrders.push({})
    };
}


