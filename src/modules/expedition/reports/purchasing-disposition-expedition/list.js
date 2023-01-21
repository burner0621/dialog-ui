import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service, PurchasingService } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');
const DispositionLoader = require('../../../../loader/purchase-dispositions-all-loader');
const DispoExpeditionLoader = require('../../../../loader/purchasing-disposition-expedition-loader');
const DivisionLoader = require('../../../../loader/division-loader');
var AccountLoader = require('../../../../loader/account-loader');

@inject(Service, PurchasingService)
export class List {
    columns = [
        [
            { field: 'DispositionNo', title: 'No. Disposisi', rowspan: 2, sortable: true },
            {
                field: 'CreatedUtc',
                title: 'Tgl Disposisi',
                formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'PaymentDueDate',
                title: 'Tgl Jatuh Tempo',
                formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            { field: 'InvoiceNo', title: 'Nomor Proforma', rowspan: 2, sortable: true },
            { field: 'SupplierName', title: 'Supplier', rowspan: 2, sortable: true },
            {
                field: 'CurrencyRate',
                title: 'Kurs',
                rowspan: 2,
                formatter: function (value, data, index) {
                    return value ? numeral(value).format('0,000.00') : '-';
                },
                align: 'right'
            },
            { title: 'Jumlah', colspan: 5 },
            { field: 'DueDateDays', title: 'Tempo', rowspan: 2, sortable: true },
            { field: 'Category', title: 'Kategori', rowspan: 2, sortable: true },
            { field: 'Unit', title: 'Unit', rowspan: 2, sortable: true },
            { field: 'Division', title: 'Divisi', rowspan: 2, sortable: true },

            {
                field: 'Position',
                title: 'Posisi',
                formatter: (value, data, index) => {
                    let status = this.itemsStatus.find(p => p.value === value);
                    return status.text;
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'SentToVerificationDivisionDate',
                title: 'Tgl Pembelian Kirim',
                formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
                rowspan: 2,
            },
            { title: 'Verifikasi', colspan: 3 },
            { field: 'VerifiedBy', title: 'Verifikator', rowspan: 2, sortable: true },

            { title: 'Kasir', colspan: 5 },
            {
                field: 'DifferenceNominal', title: 'Sisa yang Belum Dibayar', rowspan: 2, formatter: function (value, data, index) {
                    return value ? numeral(value).format('0,000.00') : '-';
                },
                align: 'right'
            },

            { field: 'ExternalPurchaseOrderNo', title: 'PO Eksternal', rowspan: 2, sortable: true },
            { field: 'DONo', title: 'Nomor Surat Jalan', rowspan: 2, sortable: true },
            { field: 'UrnNo', title: 'Nomor Bon Terima', rowspan: 2, sortable: true },
            { field: 'UnitPaymentOrderDate', title: 'Tanggal SPB', rowspan: 2, sortable: true },
            { field: 'UnitPaymentOrderNo', title: 'Nomor SPB', rowspan: 2, sortable: true },

            { field: 'Staff', title: 'Staff', rowspan: 2, sortable: true }
        ],
        [{
            field: 'DPP',
            title: 'DPP',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'VAT',
            title: 'PPN',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'IncomeTax',
            title: 'PPh',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'PaymentCorrection',
            title: 'Koreksi Pembayaran',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'PayToSupplier',
            title: 'Total',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'VerificationDivisionDate',
            title: 'Tgl Terima',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'VerifyDate',
            title: 'Tgl Cek',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'SendDate',
            title: 'Tgl Kirim',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'CashierDivisionDate',
            title: 'Tgl Terima',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'BankExpenditureNoteDate',
            title: 'Tgl Bayar',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'BankExpenditureNoteNo',
            title: 'No Bukti Pengeluaran Bank'
        },
        {
            field: 'SupplierPayment',
            title: 'Nominal yang dibayar',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'Currency',
            title: 'Mata Uang'
        },
            // {
            //     field: 'BankExpenditureNotePPHDate', title: 'Tgl Bayar PPH', formatter: function (value, data, index) {
            //         return value ? moment(value).format('DD MMM YYYY') : '-';
            //     },
            // },
            // {
            //     field: 'BankExpenditureNotePPHNo', title: 'No Kuitansi PPH'
            // },
        ]
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
    };

    constructor(service, purchasingService) {
        this.service = service;
        this.purchasingService = purchasingService;

        this.flag = false;
        this.selectDisposition = ['DispositionNo'];
        this.selectSupplier = ['code', 'name'];
        this.itemsStatus = [
            { text: '', value: 0 },
            { text: 'Bag. Pembelian', value: 1 },
            { text: 'Dikirim ke Bag. Verifikasi', value: 2 },
            { text: 'Bag. Verifikasi', value: 3 },
            { text: 'Dikirim ke Bag. Keuangan', value: 4 },
            //{ text: 'Dikirim ke Bag. Keuangan', value: 5 },
            { text: 'Dikirim ke Bag. Pembelian', value: 6 },
            { text: 'Bag. Keuangan', value: 7 },
            // { text: 'Bag. Keuangan', value: 8 },
        ];
        this.paymentStatus = [
            { text: 'ALL', value: 0 },
            { text: 'SUDAH DIBAYAR', value: 1 },
            { text: 'BELUM DIBAYAR', value: 2 },

        ];
        this.spbStatus = [
            { text: 'ALL', value: 0 },
            { text: 'SUDAH ADA', value: 1 },
            { text: 'BELUM ADA', value: 2 },

        ];
    }

    loader = (info) => {
        let order = {};
        var postedDateFrom = null;
        var postedDateTo = null;
        if (info.sort)
            order[info.sort] = info.order;

        let filter = {};

        if (this.disposition) {
            filter.dispositionNo = this.disposition.DispositionNo;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }
        if (this.division) {
            filter.divisionName = this.division.Name;
        }

        if (this.Position) {
            if (this.Position.value != 0)
                filter.Position = this.Position.value;
        }

        if (this.staffName) {
            filter.CreatedBy = this.staffName.username;
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            filter: JSON.stringify(filter),
            order: order
        };

        arg.bankExpenditureNoteNo = this.bankExpenditureNo ? this.bankExpenditureNo.bankExpenditureNoteNo : null;
        arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
        arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
        arg.dateFromPayment = this.dateFromPayment ? moment(this.dateFromPayment).format("YYYY-MM-DD") : null;
        arg.dateToPayment = this.dateToPayment ? moment(this.dateToPayment).format("YYYY-MM-DD") : null;
        arg.SPBStatus = this.SPBStatus ? this.SPBStatus.text : null;
        arg.PaymentStatus = this.PaymentStatus ? this.PaymentStatus.text : null;
        return this.flag ? (
            this.service.getReport(arg)
                .then(result => {
                    return {
                        total: result.info.Count,
                        data: result.data
                    };
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.flag = true;
        this.tableList.refresh();
    }

    getExcelData() {
        let order = {};
        var postedDateFrom = null;
        var postedDateTo = null;

        let filter = {};

        if (this.disposition) {
            filter.dispositionNo = this.disposition.DispositionNo;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }

        if (this.Position.value != 0) {
            filter.Position = this.Position.value;
        }

        if (this.dateFrom && this.dateTo) {
            postedDateFrom = this.dateFrom;
            postedDateTo = this.dateTo;
        }

        if (this.staffName) {
            filter.CreatedBy = this.staffName.username;
        }
        if (this.division) {
            filter.divisionName = this.division.Name;
        }
        let arg = {
            filter: JSON.stringify(filter)
        };
        arg.bankExpenditureNoteNo = this.bankExpenditureNo ? this.bankExpenditureNo.bankExpenditureNoteNo : "";
        arg.dateFromPayment = this.dateFromPayment ? moment(this.dateFromPayment).format("YYYY-MM-DD") : null;
        arg.dateToPayment = this.dateToPayment ? moment(this.dateToPayment).format("YYYY-MM-DD") : null;
        arg.SPBStatus = this.SPBStatus ? this.SPBStatus.text : null;
        arg.PaymentStatus = this.PaymentStatus ? this.PaymentStatus.text : null;
        arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
        arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
        this.service.getXls(arg);
    }

    excel() {
        this.getExcelData();
    }

    reset() {
        this.staffName = null;
        this.flag = false;
        this.disposition = null;
        this.bankExpenditureNo = null;
        this.unitPaymentOrder = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.Position = { value: 0 };
        this.PaymentStatus = { value: 0 };
        this.SPBStatus = { value: 0 };
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.dateFromPayment = undefined;
        this.dateToPayment = undefined;
        this.tableList.refresh();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get dispositionLoader() {
        return DispositionLoader;
    }

    get dispoExpeditionLoader() {
        return DispoExpeditionLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }


    dispoExpeditionView = (disExpedition) => {
        console.log(disExpedition);
        return `${disExpedition.bankExpenditureNoteNo}`
    }

    divisionView = (division) => {

        return `${division.Name}`
    }

    stafView = (staff) => {
        return `${staff.username}`
    }

}