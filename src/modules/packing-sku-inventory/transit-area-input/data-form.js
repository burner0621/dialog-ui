import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
let InspectionAreaLoader = require("../../../loader/pre-input-transit-loader");

@inject(Service)
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
    imQuery = { "DestinationArea": "TRANSIT" }
    itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Buyer", "Material", "Nama Barang","Unit", "Warna", "Motif", "Keterangan", "Grade", "Satuan", "Qty Terima"];
    shifts = ["PAGI", "SIANG"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    detailOptions = {};
    groups = ["A", "B"];

    get inspectionAreaLoader() {
        return InspectionAreaLoader;
    }

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "TRANSIT";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.detailOptions = {
            isEdit: this.isEdit
        }

        // if (this.data.bonNo) {
        //     this.selectedInspectionMaterial = {};
        //     this.selectedInspectionMaterial.bonNo = this.data.bonNo;
        // }

        if (this.isEdit && !this.readOnly) {
            this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Buyer", "Material", "Nama Barang","Unit", "Warna", "Motif", "Keterangan","Mesin Produksi", "Grade", "Satuan", "Qty Terima", ""];
        } else {
            this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Buyer", "Material", "Nama Barang", "Unit", "Warna", "Motif", "Keterangan", "Mesin Produksi", "Grade","Satuan", "Qty Terima"];
        }

        if(this.data.transitProductionOrders){
            this.transitProductionOrders = this.data.transitProductionOrders;
        }
    }
    addItemCallback = (e) => {
        this.transitProductionOrders = this.transitProductionOrders || [];
        this.transitProductionOrders.push({})
    };

    // @bindable selectedInspectionMaterial;
    // selectedInspectionMaterialChanged(n, o) {
    //     if (this.selectedInspectionMaterial) {
    //         this.data.outputId = this.selectedInspectionMaterial.id;
    //         if (this.selectedInspectionMaterial.preTransitProductionOrders) {
    //             this.data.transitProductionOrders = this.selectedInspectionMaterial.preTransitProductionOrders;
    //         }

    //     }

    // }

}


