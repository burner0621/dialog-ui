import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let PackagingAreaLoader = require("../../../loader/output-packaging-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable readOnlyKeterangan;
    @bindable data;
    @bindable error;
    @bindable selectedPackaging;
    @bindable selectedType;
    @bindable isAdj;
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
    // itemColumns = ["Select","No. SPP","Qty Order", "Buyer", "Unit", "Material", "Warna", "Motif","Jenis", "Grade", "Qty Packaging", "Packaging", "Satuan", "Saldo","QTY Keluar","Keterangan"];
    itemColumns = ["Daftar Surat Perintah Produksi"];
    itemColumnsAdj = ["No SP", "QTY Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Qty Pack", "SAT", "SAT", "@ QTY", "QTY Total", "No Dokumen"];
    shifts = ["PAGI", "SIANG"];
    groups = ["A", "B"];
    types = ["OUT", "ADJ"];
    detailOptions = {};
    detailOptionsAdj = {};
    destinationAreas = ["INSPECTION MATERIAL", "TRANSIT", "GUDANG AVAL", "GUDANG JADI"];
    constructor(service) {
        this.service = service;
    }

    get packagingAreaLoader() {
        return PackagingAreaLoader;
    }

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }
    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    @bindable ItemsCollection;
    async bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.type = this.context.type;
        

        this.data.area = "PACKING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        // if(this.data.id){
        //     this.callbackId = await this.service.getById(this.data.id);
        // }
        if (this.data.id) {
            this.selectedType = this.data.type
        }

        if (this.data.destinationArea) {
            this.destinationArea = this.data.destinationArea;
        }
        if (this.data.packagingProductionOrders) {
            this.selectedPackaging = this.data;
            this.selectedPackaging.bonNo = this.data.bonNo;
            console.log(this.data.packagingProductionOrders);
        }


        if (this.readOnly) {
            this.itemColumnsAdj = ["No SP", "QTY Order", "Material", "Nama Barang","Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Qty Pack", "SAT", "SAT", "@ QTY", "QTY Total", "No Dokumen"];
        } else {
            this.itemColumnsAdj = ["No SP", "QTY Order", "Material", "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Qty Pack", "SAT", "SAT", "@ QTY", "Saldo", "QTY Total", "No Dokumen"];
        }

        this.detailOptions = {
            isEdit: this.isEdit,
            readOnly: this.readOnly,
            destinationArea: this.destinationArea,
            type : this.type
        };

        if (this.ItemsCollection) {
            this.ItemsCollection.bind();
        }
    }

    addItemCallback = (e) => {
        this.data.packagingProductionOrders = this.data.packagingProductionOrders || [];

        console.log(this.data.packagingProductionOrders);
        this.data.packagingProductionOrders.push({});
    };
    addItemCallbackAdj = (e) => {
        this.data.packagingProductionOrdersAdj = this.data.packagingProductionOrdersAdj || [];
        this.data.packagingProductionOrdersAdj.push({});
    };

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }

    selectedTypeChanged(n, o) {
        this.data.type = this.selectedType;
        if (this.selectedType == "ADJ")
            this.isAdj = true;
        else
            this.isAdj = false;

    }

    @bindable destinationArea;
    destinationAreaChanged(n, o) {
        if (this.destinationArea) {
            this.data.destinationArea = this.destinationArea;
            this.detailOptions.destinationArea = this.data.destinationArea;

            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
        }
    }

}


