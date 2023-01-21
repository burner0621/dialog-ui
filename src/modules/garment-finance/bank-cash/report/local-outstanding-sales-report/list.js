import { inject } from 'aurelia-framework';
import { Service } from "./service";
import numeral from "numeral";
import moment from 'moment';

const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Service)

export class List {
    itemYears = [];
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
        this.itemMonths = [
            { text: "January", value: 1 },
            { text: "February", value: 2 },
            { text: "March", value: 3 },
            { text: "April", value: 4 },
            { text: "May", value: 5 },
            { text: "June", value: 6 },
            { text: "July", value: 7 },
            { text: "August", value: 8 },
            { text: "September", value: 9 },
            { text: "October", value: 10 },
            { text: "November", value: 11 },
            { text: "Desember", value: 12 },
        ];
        this.currentYear = moment().format("YYYY");

        this.month = { text: "January", value: 1 };
        this.year = this.currentYear;

        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
            this.itemYears.push(i.toString());
        }
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`;
    }
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    search() {
        if (!this.year) {
            alert("Tahun Harus Diisi");
        }
        else if (!this.month) {
            alert("Bulan Harus Diisi");
        }
        this.searching();
    }

    async searching() {
        this.data = [];
        var order = {};
        let args = {
            order: order,
            month: this.month.value,
            year: this.year,
            buyer: this.buyer ? this.buyer.Code : ""
        };
        this.service.search(args)
            .then(result => {
                this.data = result.data;
                //this.info.total = result.info.total;
                for (var _data of this.data) {
                    _data.TruckingDate = _data.TruckingDate ? moment.utc(_data.TruckingDate).local().format('DD MMM YYYY') : "";
                    _data.Index = _data.Index == 0 ? "" : _data.Index;
                }
                this.fillTable();
            });

    }

    fillTable() {
        const columns = [
            {
                field: "Index", title: "No", cellStyle: (value, row, index, field) => {
                    return { classes: 'fixed' }
                }
            },
            { field: "TruckingDate", title: "Tanggal" },
            { field: "InvoiceNo", title: "No. Nota Penjualan Lokal" },
            {
                field: "Amount", title: "Amount", align: "right", formatter: function (value, data, index) {
                    return numeral(value).format("0,000.00");
                }
            }
        ];

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle: this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if (this.data[rowIndex].InvoiceNo == "TOTAL") {
                var rowSpan = 1;
                $(this.table).bootstrapTable('mergeCells', { index: rowIndex, field: "InvoiceNo", rowspan: rowSpan, colspan: 1 });

            }
        }
    }


    reset() {
        this.year = moment().format("YYYY");
        this.month = { text: "January", value: 1 };
        this.buyer = null;
        this.error = {};

        this.flag = false;
    }

    ExportToExcel() {
        if (!this.year) {
            alert("Tahun Harus Diisi");
        }
        else if (!this.month) {
            alert("Bulan Harus Diisi");
        }
        let args = {
            month: this.month.value,
            year: this.year,
            buyer: this.buyer ? this.buyer.Code : ""
        };
        this.service.generateExcel(args);
    }

    get buyerLoader() {
        return BuyerLoader;
    }
}
