import { inject, bindable } from 'aurelia-framework'
import { Service } from '../service';

var DispositionLoader = require('../../../../loader/garment-disposition-memo-detail-loader');
var GarmentDebtLoaderBillsNo = require('../../../../loader/garment-debt-loader-bills-no');
var GarmentDebtLoaderPaymentBills = require('../../../../loader/garment-debt-loader-payment-bills');

@inject(Service)
export class MemoDetailPurchasedItem {
    @bindable dataDebt;

    get dispositionLoader() {
        return DispositionLoader;
    }

    get garmentDebtLoaderBillsNo() {
        return GarmentDebtLoaderBillsNo;
    }

    get garmentDebtLoaderPaymentBills() {
        return GarmentDebtLoaderPaymentBills;
    }

    constructor() { }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        if (this.data.Disposition && !this.data.Disposition.MemoDetails) {
            thi.data.Disposition.MemoDetails = [];
        }
        // this.disposition = this.data.disposition || null;
    }

    // @bindable disposition;
    // dispositionChanged(newValue, oldValue) {
    //     if (newValue) {
    //         this.data = newValue;
    //         this.data.disposition = newValue;
    //     } else {
    //         this.data = null;
    //     }
    // }

    controlOptions = {
        control: {
            length: 12
        }
    };

    memoDetailsColumns = [
        '__check',
        { header: "No. Surat Jalan", value: "Product" },
        { header: "No. Nota Intern", value: "Quantity" },
        { header: "No. BP Besar", value: "AvailableQuantity" },
        { header: "No. BP Kecil", value: "Weight" },
        { header: "Kode Supplier", value: "WeightTotal" },
        { header: "Keterangan", value: "Length" },
        { header: "Mata Uang", value: "LengthTotal" },
        { header: "Rate Bayar", value: "Remark" },
        { header: "Rate Beli", value: "Notes" },
        { header: "Saldo Akhir", value: "Notes" },
        { header: "Jumlah", value: "Notes" },
        { header: "Jumlah dalam Rupiah", value: "Notes" }
    ]

    memoDetailsColumnsView = [
        { header: "No. Surat Jalan", value: "Product" },
        { header: "No. Nota Intern", value: "Quantity" },
        { header: "No. BP Besar", value: "AvailableQuantity" },
        { header: "No. BP Kecil", value: "Weight" },
        { header: "Kode Supplier", value: "WeightTotal" },
        { header: "Keterangan", value: "Length" },
        { header: "Mata Uang", value: "LengthTotal" },
        { header: "Rate Bayar", value: "Remark" },
        { header: "Rate Beli", value: "Notes" },
        { header: "Saldo Akhir", value: "Notes" },
        { header: "Jumlah", value: "Notes" },
        { header: "Jumlah dalam Rupiah", value: "Notes" }
    ]

    onCheckAll(event) {
        if (this.item.Disposition && this.item.Disposition.MemoDetails)
            for (var item of this.Disposition.MemoDetails) {
                item.Select = event.detail.target.checked;
            }
    }
}