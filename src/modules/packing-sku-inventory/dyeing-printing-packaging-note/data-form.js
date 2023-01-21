import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var BonLoader = require('../../../loader/dyeing-printing-bon-loader')

import UnitLoader from "../../../loader/unit-loader";
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
            length: 3,
        },
        control: {
            length: 3,
        },
    };
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }
    constructor(service) {
        this.service = service;
    }

    get NoBonLoader() {
        return BonLoader;
    }
    get NoBonDummy(){

    }
    shiftData = ["","PAGI","SIANG"];

    columnsSpp=[
        { field: "noSpp", title: "No. SPP" },
        { field: "buyer", title: "Buyer" },
        { field: "unit", title: "Unit" },                
        { field: "material", title: "Material" },
        { field: "warna", title: "Warna" },
        { field: "motif", title: "Motif" },
        { field: "jenis", title: "Jenis" },        
        { field: "grade", title: "Grade" },
        { field: "packagingQty", title: "QTY Packaging" },
        { field: "packagingUnit", title: "Packaging" },                      
        { field: "satuan", title: "Satuan" },
        { field: "saldo", title: "Saldo" },
    ];

    bind(context) {
        this.context = context;

        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }
}


