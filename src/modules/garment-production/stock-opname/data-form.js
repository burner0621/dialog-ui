import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable title;
    @bindable data = {};
    @bindable error = {};

    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            { header: "PO No", value: "POSerialNumber" },
            { header: "RO No", value: "RO" },
            { header: "Kode Barang", value: "ProductCode" },
            { header: "Nama Barang", value: "ProductName" },
            { header: "Design Color", value: "DesignColor" },
            { header: "Jumlah Sebelumnya", value: "BeforeQuantity" },
            { header: "Jumlah", value: "Quantity" },
        ]
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }
}