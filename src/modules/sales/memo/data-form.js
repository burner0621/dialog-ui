import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const SalesInvoiceLoader = require('./../../../loader/sales-invoice-loader');
const BuyerLoader = require('./../../../loader/buyers-loader');
const UnitLoader = require('./../../../loader/unit-loader');

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    memoTypes = ["", "PPN", "Realisasi Uang Muka", "Potongan Pembayaran"];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.hasPosting = this.context.hasPosting;
    }

    columns = [
        { header: "Jumlah Pembayaran", value: "PaymentAmount" },
        { header: "Mata Uang", value: "Currency" },
        { header: "Kurs", value: "CurrencyRate" },
        { header: "Bunga\n(%)", value: "Interest" },
        { header: "Total", value:"Total" }
    ];

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get salesInvoiceLoader() {
        return SalesInvoiceLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }
}
