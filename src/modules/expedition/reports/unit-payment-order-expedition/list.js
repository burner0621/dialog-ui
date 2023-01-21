import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service, AzureService } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');
// const CurrencyLoader = require('../../../../loader/currency-loader');
// const CategoryLoader = require('../../../../loader/category-loader');
// const UnitLoader = require('../../../../loader/unit-loader');
const DivisionLoader = require('../../../../loader/division-loader');
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

@inject(Service, AzureService)
export class List {
    columns = [
        [
            { field: 'No', title: 'No. SPB', rowspan: 2, sortable: true },
            {
                field: 'Date',
                title: 'Tgl SPB',
                formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'DueDate',
                title: 'Tgl Jatuh Tempo',
                formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            { field: 'InvoiceNo', title: 'Nomor Invoice', rowspan: 2, sortable: true },
            { field: 'Supplier.name', title: 'Supplier', rowspan: 2, sortable: true },
            { field: 'PaymentMethod', title: 'Term Pembayaran', rowspan: 2, sortable: true },
            { field: 'Currency', title: 'Kurs', rowspan: 2, sortable: true },
            { title: 'Jumlah', colspan: 4 },
            {
                // field: 'totalDays', title: 'Tempo', rowspan: 2, sortable: true, formatter: function (value, data, index) {
                //     return moment(data.DueDate).diff(moment(data.Date), 'days', false);
                // }
                field: 'totalDays',
                title: 'Tempo',
                rowspan: 2,
                sortable: true,
                formatter: function (value, data, index) {
                    return Math.abs(Math.ceil((moment(data.DueDate) - moment(data.Date)) / (1000 * 60 * 60 * 24)));
                }
            },
            { field: 'Category.Name', title: 'Kategori', rowspan: 2, sortable: true },
            { field: 'Unit.Name', title: 'Unit', rowspan: 2, sortable: true },
            { field: 'Division.Name', title: 'Divisi', rowspan: 2, sortable: true },
            {
                field: 'Position',
                title: 'Posisi',
                formatter: (value, data, index) => {
                    let status = this.itemsStatus.find(p => p.value === value);
                    return status != undefined ? status.text : '-';
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'SendToVerificationDivisionDate',
                title: 'Tgl Pembelian Kirim',
                formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
                rowspan: 2,
                sortable: true,
            },
            { field: 'CreatedBy', title: 'Admin', rowspan: 2, sortable: true },
            { title: 'Verifikasi', colspan: 3 },
            {
                field: 'VerifiedBy',
                title: 'Verifikator',
                sortable: true,
                rowspan: 2
            },
            { title: 'Kasir', colspan: 3 },
            {
                field: 'PaymentDifference',
                title: 'Sisa yang Belum Dibayar',
                formatter: function (value, data, index) {
                    return value ? numeral(value).format('0,000.00') : '-';
                },
                align: 'right',
                rowspan: 2
            }
        ],
        [{
            field: 'DPP',
            title: 'DPP',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            sortable: true,
            align: 'right'
        },

        {
            field: 'PPn',
            title: 'PPn',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            sortable: true,
            align: 'right'
        },
        {
            field: 'PPh',
            title: 'PPh',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            sortable: true,
            align: 'right'
        },
        {
            field: 'TotalTax',
            title: 'Total',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            sortable: true,
            align: 'right'
        },
        {
            field: 'VerificationDivisionDate',
            title: 'Tgl Terima',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
            sortable: true,
        },
        {
            field: 'VerifyDate',
            title: 'Tgl Cek',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
            sortable: true,
        },
        {
            field: 'SendDate',
            title: 'Tgl Kirim',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
            sortable: true,
        },
        {
            field: 'CashierDivisionDate',
            title: 'Tgl Terima',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
            sortable: true,
        },
        {
            field: 'BankExpenditureNoteNo',
            title: 'No Bukti Pengeluaran Bank',
            sortable: true,
        },
        {
            field: 'PaymentNominal',
            title: 'Nominal Pembayaran',
            formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right',
        }
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

    constructor(service, azureService) {
        this.service = service;
        this.azureService = azureService;

        this.flag = false;
        this.selectUPO = ['no'];
        this.selectSupplier = ['code', 'name'];
        this.divisionSelect = ['code', 'name'];
        this.itemsStatus = [
            { text: '', value: 0 },
            { text: 'Bag. Pembelian', value: 1 },
            { text: 'Dikirim ke Bag. Verifikasi', value: 2 },
            { text: 'Bag. Verifikasi', value: 3 },
            { text: 'Dikirim ke Bag. Keuangan', value: 4 },
            { text: 'Dikirim ke Bag. Accounting', value: 5 },
            { text: 'Dikirim ke Bag. Pembelian', value: 6 },
            { text: 'Bag. Kasir', value: 7 },
            { text: 'Bag. Keuangan', value: 8 },
        ];

    }

    loader = (info) => {
        // console.log(this);
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let filter = {};

        if (this.unitPaymentOrder) {
            filter.no = this.unitPaymentOrder.no;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }

        // if (this.currency) {
        //     filter.currencyCode = this.currency.code;
        // }

        // if (this.category) {
        //     filter.categoryCode = this.category.code;
        // }

        // if (this.unit) {
        //     filter.unitCode = this.unit.code;
        // }

        if (this.division) {
            filter.divisionCode = this.division.Code;
        }

        if (this.status && this.status.value && this.status.value != 0) {
            filter.status = this.status.value;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            // filter: JSON.stringify(filter),
            order: order,
            // select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
        };

        Object.assign(arg, filter);

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    // let unitPaymentOrders = result.data.map(p => p.no);

                    // return this.azureService.search({ unitPaymentOrders })
                    // .then(response => {
                    // let expeditions = response.data;

                    // for (let d of result.data) {
                    //     let expedition = expeditions.find(p => p.UnitPaymentOrderNo == d.no);

                    //     if (expedition) {
                    //         Object.assign(d, expedition);
                    //     }
                    // }

                    return {
                        total: result.info.total,
                        data: result.data
                    }
                    // });
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.flag = true;
        this.tableList.refresh();
    }

    reset() {
        this.flag = false;
        this.unitPaymentOrder = undefined;
        this.supplier = undefined;
        // this.currency = undefined;
        // this.category = undefined;
        // this.unit = undefined;
        this.division = undefined;
        this.status = { value: 0 };
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.tableList.refresh();
    }

    xls() {
        let filter = {};

        if (this.unitPaymentOrder) {
            filter.no = this.unitPaymentOrder.no;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }

        // if (this.currency) {
        //     filter.currencyCode = this.currency.code;
        // }

        // if (this.category) {
        //     filter.categoryCode = this.category.code;
        // }

        // if (this.unit) {
        //     filter.unitCode = this.unit.code;
        // }

        if (this.division) {
            filter.divisionCode = this.division.Code;
        }

        if (this.status && this.status.value && this.status.value != 0) {
            filter.status = this.status.value;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        this.service.xls(filter);
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
        return `${division.Name}`;
    }
    // get currencyLoader() {
    //     return CurrencyLoader;
    // }

    // get categoryLoader() {
    //     return CategoryLoader;
    // }

    // get unitLoader() {
    //     return UnitLoader;
    // }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }
}