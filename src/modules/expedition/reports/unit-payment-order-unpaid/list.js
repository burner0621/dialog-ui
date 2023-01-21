import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const PurchasingDocumentExpeditionLoader = require('../../../../loader/purchasing-document-expedition-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)
export class List {
    columns = [
        { field: 'UnitPaymentOrderNo', title: 'No Surat Perintah Bayar' },
        {
            field: 'UPODate', title: 'Tanggal Surat Perintah Bayar', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'InvoiceNo', title: 'No Invoice' },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'Currency', title: 'Mata Uang' },
        {
            field: 'IncomeTax', title: 'PPH', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : (value == 0 ? '0.0000' : '-');
            },
        },
        {
            field: 'DPPVat', title: 'DPP + PPN', sortable: false, formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : (value == 0 ? '0.0000' : '-');
            },
        },
        {
            field: 'DueDate', title: 'Tanggal Jatuh Tempo', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'ProductName', title: 'Nama Barang' },
        {
            field: 'Quantity', title: 'Jumlah', sortable: false, formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000') : (value == 0 ? '0' : '-');
            },
        },
        { field: 'UnitName', title: 'Unit' },
        {
            field: 'TotalPaid', title: 'Bayar', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : (value == 0 ? '0.0000' : '-');
            },
        },
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
        this.selectSupplier = ['code', 'name'];
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order
        };

        if (this.purchasingDocumentExpedition) {
            arg.unitPaymentOrderNo = this.purchasingDocumentExpedition.UnitPaymentOrderNo;
        }

        if (this.supplier) {
            arg.supplierCode = this.supplier.code;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date' && this.dateTo && this.dateTo != 'Invalid Date') {
            arg.dateFrom = this.dateFrom;
            arg.dateTo = this.dateTo;

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        if (Object.getOwnPropertyNames(arg).length === 3) {
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
                        if (result.data[i].UnitPaymentOrderNo != before.UnitPaymentOrderNo) {
                            before = result.data[i];
                            before._UnitPaymentOrderNo_rowspan = 1;
                            before._UPODate_rowspan = 1;
                            before._InvoiceNo_rowspan = 1;
                            before._SupplierName_rowspan = 1;
                            before._Currency_rowspan = 1;
                            before._IncomeTax_rowspan = 1;
                            before._DPPVat_rowspan = 1;
                            before._DueDate_rowspan = 1;
                        } else {
                            before._UnitPaymentOrderNo_rowspan++;
                            before._UPODate_rowspan++;
                            before._InvoiceNo_rowspan++;
                            before._SupplierName_rowspan++;
                            before._Currency_rowspan++;
                            before._IncomeTax_rowspan++;
                            before._DPPVat_rowspan++;
                            before._DueDate_rowspan++;

                            before.DPPVat += result.data[i].DPPVat;

                            result.data[i].UnitPaymentOrderNo = undefined;
                            result.data[i].UPODate = undefined;
                            result.data[i].InvoiceNo = undefined;
                            result.data[i].SupplierName = undefined;
                            result.data[i].Currency = undefined;
                            result.data[i].IncomeTax = undefined;
                            result.data[i].DPPVat = undefined;
                            result.data[i].DueDate = undefined;
                        }
                    }

                    setTimeout(() => {
                        $('#spb-unpaid-table td').each(function () {
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
        }
        else {
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
                }
                else {
                    let wsData = [];

                    for (let data of this.excelData) {
                        wsData.push({
                            'No Surat Perintah Bayar': data.UnitPaymentOrderNo,
                            'Tanggal Surat Perintah Bayar': moment(data.UPODate).format('DD MMM YYYY'),
                            'No Invoice': data.InvoiceNo,
                            'Supplier': data.SupplierName,
                            'Mata Uang': data.Currency,
                            'PPH': data.IncomeTax ? numeral(data.IncomeTax).format('0,000.0000') : '-',
                            'DPP': data.DPP ? numeral(data.DPP).format('0,000.0000') : '-',
                            'PPN': data.VAT ? numeral(data.VAT).format('0,000.0000') : '-',
                            'Tanggal Jatuh Tempo': moment(data.DueDate).format('DD MMM YYYY'),
                            'TotalPaid': data.TotalPaid ? numeral(data.TotalPaid).format('0,000.0000') : '-',
                            
                        });
                    }

                    let wb = XLSX.utils.book_new();
                    wb.Props = {
                        Title: 'Report',
                        Subject: 'Dan Liris',
                        Author: 'Dan Liris',
                        CreatedDate: new Date()
                    };
                    wb.SheetNames.push('Laporan SPB');

                    let ws = XLSX.utils.json_to_sheet(wsData);
                    wb.Sheets['Laporan SPB'] = ws;

                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                    let buf = new ArrayBuffer(wbout.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

                    let fileSaver = require('file-saver');
                    fileSaver.saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'Laporan SPB.xlsx');
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
        this.purchasingDocumentExpedition = undefined;
        this.supplier = undefined;
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

    get purchasingDocumentExpeditionLoader() {
        return PurchasingDocumentExpeditionLoader;
    }
}
