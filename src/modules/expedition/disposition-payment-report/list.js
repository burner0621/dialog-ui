import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const SupplierLoader = require('../../../loader/supplier-loader');
const DivisionLoader = require('../../../loader/division-loader');
const DispositionNoteLoader = require('../../../loader/purchase-dispositions-all-loader');
const BankExpenditureNoteDPPAndPPNLoader = require('../../../loader/payment-disposition-loader');

@inject(Service)
export class List {
    paymentMethodList = ["", "KREDIT", "DP(DOWN PAYMENT) + BP(BALANCE PAYMENT)", "DP(DOWN PAYMENT) + PERMIN 1 + BP(BALANCE PAYMENT)", "RETENSI"];
    isPaidFilter = { IsPaid: true };

    columns = [
        { field: 'ExpenditureNo', title: 'No. Bukti Pembayaran Disposisi' },
        {
            field: 'ExpenditureDate',
            title: 'Tanggal Bayar Disposisi',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : "-";
            }
        },
        { field: 'DispositionNo', title: 'No. Disposisi' },
        {
            field: 'DispositionDate', title: 'Tgl Disposisi',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : "-";
            }
        },
        {
            field: 'DispositionDueDate', title: 'Tgl Jatuh Tempo',
            formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : "-";
            }
        },
        { field: 'BankName', title: 'Bank Bayar' },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'ProformaNo', title: 'Nomor Proforma Invoice' },
        { field: 'CategoryName', title: 'Kategori' },
        { field: 'DivisionName', title: 'Divisi' },
        {
            field: 'VATAmount', title: 'PPN', formatter: function (value, data, index) {
                return value ? numeral(value).format("0,000.00") : "-";
            },
            align: 'right'
        },
        {
            field: 'PaidAmount', title: 'Total Disposisi', formatter: function (value, data, index) {
                return value || value == 0 ? numeral(value).format("0,000.00") : "-";
            },
            align: 'right'
        },
        {
            field: 'DispositionNominal', title: 'Jumlah dibayar ke Supplier', formatter: function (value, data, index) {
                return value || value == 0 ? numeral(value).format("0,000.00") : "-";
            },
            align: 'right'
        },
        {
            field: 'DifferenceAmount', title: 'Sisa yang Belum Dibayar', formatter: function (value, data, index) {
                return value || value == 0 ? numeral(value).format("0,000.00") : "-";
            },
            align: 'right'
        },
        { field: 'TransactionType', title: 'Jenis Transaki' }
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
        sortable: false
    };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};

        this.data = [];
        this.isEmpty = true;
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            select: [],
        };

        if (this.info.bankExpenditureNote)
            arg.bankExpenditureId = this.info.bankExpenditureNote.Id;
        if (this.info.dispositionNote)
            arg.dispositionId = this.info.dispositionNote.Id;
        if (this.info.supplier)
            arg.supplierId = this.info.supplier._id;
        if (this.info.division)
            arg.divisionId = this.info.division.Id;
        if ((this.info.startDate && this.info.startDate != 'Invalid Date') || (this.info.endDate && this.info.endDate != 'Invalid Date')) {
            arg.startDate = this.info.startDate && this.info.startDate != 'Invalid Date' ? this.info.startDate : '';
            arg.endDate = this.info.endDate && this.info.endDate != 'Invalid Date' ? this.info.endDate : '';

            if (!arg.startDate) {
                arg.startDate = new Date(arg.endDate);
                arg.startDate.setMonth(arg.startDate.getMonth() - 1);
            }

            if (!arg.endDate) {
                arg.endDate = new Date(arg.startDate);
                arg.endDate.setMonth(arg.endDate.getMonth() + 1);
            }

            arg.startDate = moment(arg.startDate).format();
            arg.endDate = moment(arg.endDate).format();
        }

        console.log(arg)
        return this.flag ? (
            this.service.search(arg)
                .then((result) => {


                    return {
                        data: result.data
                    };
                })
        ) : { total: 0, data: [] };
    }

    search() {
        if (this.info.startDate == 'Invalid Date')
            this.info.startDate = undefined;
        if (this.info.endDate == 'Invalid Date')
            this.info.endDate = undefined;

        if ((this.info.startDate && this.info.endDate) || (!this.info.startDate && !this.info.endDate)) {
            this.error = {};
            this.flag = true;
            this.tableList.refresh();
        } else {
            // console.log(this.info.startDate);
            // console.log(this.info.endDate);
            if (!this.info.startDate)
                this.error.startDate = "Tanggal Awal harus diisi";
            if (!this.info.endDate)
                this.error.endDate = "Tanggal Akhir harus diisi";
        }
    }

    getExcelData() {
        let info = {
            offset: this.page * 50,
            limit: 50,
        };
    }

    excel() {
        if (this.info.startDate == 'Invalid Date')
            this.info.startDate = undefined;
        if (this.info.endDate == 'Invalid Date')
            this.info.endDate = undefined;

        if ((this.info.startDate && this.info.endDate) || (!this.info.startDate && !this.info.endDate)) {
            this.error = {};
            this.flag = true;
            let arg = {
                select: [],
            };

            if (this.info.bankExpenditureNote)
                arg.bankExpenditureId = this.info.bankExpenditureNote.Id;
            else
                arg.bankExpenditureId = 0;
            if (this.info.dispositionNote)
                arg.dispositionId = this.info.dispositionNote.Id;
            else
                arg.dispositionId = 0;
            if (this.info.supplier)

                arg.supplierId = this.info.supplier.Id;

            else
                arg.supplierId = 0;
            if (this.info.division)
                arg.divisionId = this.info.division.Id;
            else
                arg.divisionId = 0;

            if ((this.info.startDate && this.info.startDate != 'Invalid Date') || (this.info.endDate && this.info.endDate != 'Invalid Date')) {
                arg.startDate = this.info.startDate && this.info.startDate != 'Invalid Date' ? this.info.startDate : '';
                arg.endDate = this.info.endDate && this.info.endDate != 'Invalid Date' ? this.info.endDate : '';

                if (!arg.startDate) {
                    arg.startDate = new Date(arg.endDate);
                    arg.startDate.setMonth(arg.startDate.getMonth() - 1);
                }

                if (!arg.endDate) {
                    arg.endDate = new Date(arg.startDate);
                    arg.endDate.setMonth(arg.endDate.getMonth() + 1);
                }

                arg.startDate = moment(arg.startDate).format();
                arg.endDate = moment(arg.endDate).format();
            }
            console.log(arg)

            // arg.startDate = moment(arg.startDate).format();
            // arg.endDate = moment(arg.endDate).format();
            this.service.getXls(arg);
        } else {
            // console.log(this.info.startDate);
            // console.log(this.info.endDate);
            if (!this.info.startDate)
                this.error.startDate = "Tanggal Awal harus diisi";
            if (!this.info.endDate)
                this.error.endDate = "Tanggal Akhir harus diisi";
        }
    }

    reset() {
        this.flag = false;
        this.info.bankExpenditureNote = undefined;
        this.info.unitPaymentOrder = undefined;
        this.info.invoice = undefined;
        this.info.supplier = undefined;
        this.info.division = undefined;
        this.info.dispositionNote = undefined;
        this.info.bankExpenditureNote = undefined;
        this.info.startDate = undefined;
        this.info.endDate = undefined;
        this.info.paymentMethod = "";
        this.error.startDate = undefined;
        this.error.endDate = undefined;
        this.tableList.refresh();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get dispositionNoteLoader() {
        return DispositionNoteLoader;
    }

    get bankExpenditureNoteLoader() {
        return BankExpenditureNoteDPPAndPPNLoader;
    }
}