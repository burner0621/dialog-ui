import { inject, bindable, containerless, computedFrom } from 'aurelia-framework'
import { Service } from "./service";

const EMKLLoader = require('../../../loader/garment-emkl-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data;
    @bindable selectedEmkl;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "No Disposisi EMKL" },
        { header: "Tgl Invoice / Tagihan" },
        { header: "No Invoice / Tagihan" },
        { header: "Amount" },
        { header: "Jasa" },
        { header: "Biaya Lain-Lain"},
        { header: "Biaya Trucking"},
        { header: "PPN (Jasa)"},
        { header: "Amount (-Jasa-PPN)"},
        { header: "PPH" },
        { header: "Terbayar" },
        { header: ""}
    ];

    billsColumns = [
        { header: "Unit", value: "unit" },
        { header: "Tagihan", value: "bill" },
    ];

    get emklLoader() {
        return EMKLLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.itemsOptions = {
            isEdit: this.isEdit,
            data: this.data
        }
    }

    emklView = (data) => {
        var name = data.Name || data.name;
        return `${name}`;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({});
        };
    }

    get removeItems() {
        return (event) => {
        };
    }

    selectedEmklChanged(newValue) {
        this.data.emkl = newValue;
        this.data.items.splice(0);
    }

    @computedFrom('data.emkl')
    get address() {
        return (this.data.emkl || {}).address || (this.data.emkl || {}).Address;
    }

    @computedFrom('data.emkl')
    get npwp() {
        return (this.data.emkl || {}).npwp || (this.data.emkl || {}).NPWP;
    }

    get bills() {
        let bills = { C1A: 0, C1B: 0, C2A: 0, C2B: 0, C2C: 0, };
        if (this.data.items) {
            for (const item of this.data.items) {
                if (item.paymentDisposition && item.paymentDisposition.amountPerUnit) {
                    bills["C1A"] += item.paymentDisposition.amountPerUnit["C1A"] || 0;
                    bills["C1B"] += item.paymentDisposition.amountPerUnit["C1B"] || 0;
                    bills["C2A"] += item.paymentDisposition.amountPerUnit["C2A"] || 0;
                    bills["C2B"] += item.paymentDisposition.amountPerUnit["C2B"] || 0;
                    bills["C2C"] += item.paymentDisposition.amountPerUnit["C2C"] || 0;
                }
            }
        }

        let result = [];
        for (const key in bills) {
            if (bills.hasOwnProperty(key)) {
                const element = bills[key];
                if (element) {
                    result.push({ unit: key, bill: element.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
                }
            }
        }

        return result;
    }
}
