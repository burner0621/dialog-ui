import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
import XLSX from 'xlsx';
const PPHBankExpenditureNoteLoader = require('../../../../loader/pph-bank-expenditure-note-loader');
const PurchasingDocumentExpeditionLoader = require('../../../../loader/purchasing-document-expedition-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)
export class List {
    columns = [
        { field: 'No', title: 'No Bukti Pengeluaran Bank' },
        {
            field: 'Date',
            title: 'Tgl Bayar PPH',
            formatter: function(value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'Category', title: 'Category' },
        {
            field: 'DPP',
            title: 'DPP',
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        {
            field: 'IncomeTax',
            title: 'PPH',
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        { field: 'Currency', title: 'Mata Uang' },
        { field: 'Bank', title: 'Bank Bayar PPH' },
        { field: 'Supplier', title: 'Supplier' },
        { field: 'SPB', title: 'No SPB' },
        { field: 'InvoiceNo', title: 'No Invoice' },
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

    constructor(service) {
        this.service = service;
        this.error = {};

        this.flag = false;
        this.selectUPO = ['no'];
        this.selectSupplier = ['code', 'name'];
        this.divisionSelect = ['code', 'name'];
        this.paymentMethodItems = ['', 'CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
        };

        if (this.pphBankExpenditureNote) {
            arg.no = this.pphBankExpenditureNote.No;
        }

        if (this.unitPaymentOrder) {
            arg.unitPaymentOrderNo = this.unitPaymentOrder.UnitPaymentOrderNo;
        }

        if (this.expedition) {
            arg.invoiceNo = this.expedition.InvoiceNo;
        }

        if (this.supplier) {
            arg.supplierCode = this.supplier.code;
        }

        if (this.division) {
            arg.divisionCode = this.division.code;
        }

        /*
        if (this.paymentMethod != '') {
            arg.paymentMethod = this.paymentMethod;
        }
        */

        if (this.dateFrom && this.dateFrom != 'Invalid Date' && this.dateTo && this.dateTo != 'Invalid Date') {
            arg.dateFrom = this.dateFrom;
            arg.dateTo = this.dateTo;

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        if (Object.getOwnPropertyNames(arg).length === 4) {
            arg.dateFrom = new Date();
            arg.dateFrom.setMonth(arg.dateFrom.getMonth() - 1);
            arg.dateTo = new Date();

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        return this.flag ? (
            this.service.search(arg)
            .then(result => {
                let before = {};

                for (let i in result.data) {
                    if (result.data[i].No != before.No) {
                        before = result.data[i];
                        before._No_rowspan = 1;
                        before._Date_rowspan = 1;
                        before._DPP_rowspan = 1;
                        before._IncomeTax_rowspan = 1;
                        before._Currency_rowspan = 1;
                        before._Bank_rowspan = 1;
                    } else {
                        before._No_rowspan++;
                        before._Date_rowspan++;
                        before._DPP_rowspan++;
                        before._IncomeTax_rowspan++;
                        before._Currency_rowspan++;
                        before._Bank_rowspan++;

                        before.DPP += result.data[i].DPP;
                        before.IncomeTax += result.data[i].IncomeTax;

                        result.data[i].No = undefined;
                        result.data[i].Date = undefined;
                        result.data[i].DPP = undefined;
                        result.data[i].IncomeTax = undefined;
                        result.data[i].Currency = undefined;
                        result.data[i].Bank = undefined;
                    }
                }

                setTimeout(() => {
                    $('#pph-bank-table td').each(function() {
                        if ($(this).html() === '-')
                            $(this).hide();
                    })
                }, 10);

                return {
                    total: result.info.total,
                    data: result.data
                };
            })
        ) : { total: 0, data: [] };
    }

    search() {
        if (this.dateFrom == 'Invalid Date')
            this.dateFrom = undefined;
        if (this.dateTo == 'Invalid Date')
            this.dateTo = undefined;

        if ((this.dateFrom && this.dateTo) || (!this.dateFrom && !this.dateTo)) {
            this.error = {};
            this.flag = true;
            this.tableList.refresh();
        } else {
            if (!this.dateFrom)
                this.error.dateFrom = "Tanggal Awal harus diisi";
            else if (!this.dateTo)
                this.error.dateTo = "Tanggal Akhir harus diisi";
        }
    }

    getExcelData() {
        let info = {
            offset: this.page * 50,
            limit: 50,
        };

        this.loader(info)
            .then(response => {
                this.excelData.push(...response.data);

                if (this.excelData.length !== response.total) {
                    this.page++;
                    this.getExcelData();
                } else {
                    let wsData = [];

                    let title = {
                        "": "RuleTester",
                        "": "RuleTester"
                    }

                    for (let data of this.excelData) {
                        wsData.push({
                            'No Bukti Pengeluaran Bank': data.No,
                            'Tanggal Bayar PPH': data.Date ? moment(data.Date).format('DD MMM YYYY') : '-',
                            'Category': data.Category,
                            'DPP': data.DPP ? numeral(data.DPP).format('0,000.00') : '-',
                            'PPH': data.IncomeTax ? numeral(data.IncomeTax).format('0,000.00') : '-',
                            'Mata Uang': data.Currency,
                            'Bank Bayar PPH': data.Bank,
                            'Supplier': data.Supplier,
                            'No SPB': data.SPB,
                            'No Invoice': data.InvoiceNo,
                        });
                    }

                    let wb = XLSX.utils.book_new();
                    wb.Props = {
                        Title: 'Report',
                        Subject: 'Dan Liris',
                        Author: 'Dan Liris',
                        CreatedDate: new Date()
                    };
                    wb.SheetNames.push('Laporan PPH');

                    console.log(this);
                    let ws = XLSX.utils.json_to_sheet(wsData, { origin: "A6" });
                    XLSX.utils.sheet_add_aoa(ws, [
                        ["PT.Dan Liris"],
                        ["Laporan Bukti Pengeluaran Bank PPH"],
                        [`PERIODE : ${this.dateFrom ? moment(this.dateFrom).format('DD MMMM YYYY') : '-'} sampai dengan ${this.dateTo ? moment(this.dateTo).format('DD MMMM YYYY') : '-'}`]
                    ], { origin: "A2" });
                    wb.Sheets['Laporan PPH'] = ws;

                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                    let buf = new ArrayBuffer(wbout.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

                    let fileSaver = require('file-saver');
                    fileSaver.saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'Laporan PPH.xlsx');
                }
            });
    }

    excel() {
        this.flag = true;

        this.page = 0;
        this.excelData = [];
        this.getExcelData();
    }

    reset() {
        this.flag = false;
        this.error = {};
        this.pphBankExpenditureNote = undefined;
        this.unitPaymentOrder = undefined;
        this.expedition = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.paymentMethod = '';
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.tableList.refresh();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get pphBankExpenditureNoteLoader() {
        return PPHBankExpenditureNoteLoader;
    }

    get unitPaymentOrderLoader() {
        return (keyword, filter) => {
            return PPHBankExpenditureNoteLoader(keyword, filter)
                .then(response => {
                    let unitPaymentOrders = [];

                    for (let data of response) {
                        unitPaymentOrders.push(...data.Items);
                    }

                    return unitPaymentOrders;
                });
        };
    }

    get purchasingDocumentExpeditionLoader() {
        return PurchasingDocumentExpeditionLoader;
    }
}