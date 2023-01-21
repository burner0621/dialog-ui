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
    // itemColumns = ["No. SPP", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Satuan", "Jumlah Order", "Saldo"];
    itemColumns = ["No. SPP", "Buyer", "Unit", "Material", "Warna", "Motif","Jenis", "Grade", "Qty Packaging", "Packaging", "Satuan", "Panjang"];    
    // itemColumns = ["No. SPP", "Buyer", "Unit", "Material", "Warna", "Motif", "Grade", "Satuan", "Saldo","Terpakai"];
    itemColumnsDetail = ["No. SPP", "Saldo Awal", "Saldo Terpakai"];
    
    shifts = ["","PAGI", "SIANG"];
    detailOptions = {};
    destinationAreas = ["","INSPECTION MATERIAL","TRANSIT", "GUDANG AVAL","GUDANG JADI"];
    constructor(service) {
        this.service = service;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "PACKING";

        this.error = this.context.error;
        this.detailShow = true;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;


    }
    addItemCallback = (e) => {
        this.data.packagingProductionOrders = this.data.packagingProductionOrders || [];
        this.data.packagingProductionOrders.push({});
        
        
    };
    
}


