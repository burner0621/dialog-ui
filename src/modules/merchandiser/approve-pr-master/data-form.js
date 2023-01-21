import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [
        { header: "Kategori" },
        { header: "Kode Barang" },
        { header: "Komposisi" },
        { header: "Konstruksi" },
        { header: "Yarn" },
        { header: "Width" },
        { header: "Keterangan" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Price" },
        { header: "Satuan Harga" },
        { header: "Konversi" },
        { header: "Total" },
    ]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }
} 