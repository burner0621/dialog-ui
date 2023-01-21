import { inject } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';
import numeral from 'numeral';

const BuyerLoader = require('../../../../loader/garment-buyers-loader');

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 4 },
        control: { length: 3 }
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    monthOptions = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    yearOptions = [];

    tableOptions = {
        pagination: false,
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        [
            { field: "no", title: "NO", halign: "center", align: "right", sortable: false, rowspan: 2 },
            {
                field: "truckingDate", title: "TGL<br>TRUCKING", formatter: (value) => {
                    return moment(value).format("MM/DD/YYYY");
                }, sortable: false, rowspan: 2
            },
            { field: "buyerAgentName", title: "NAMA / ALAMAT", sortable: false, rowspan: 2 },
            { field: "buyerAgentCode", title: "INDEX<br>DEBTR", halign: "center", align: "center", sortable: false, rowspan: 2 },
            { field: "comodity", title: "JENIS BARANG", sortable: false, rowspan: 2 },
            { title: "I N V O I C E", sortable: false, colspan: 2 },
            { title: "P E B", sortable: false, colspan: 2 },
            { title: "J U M L A H", sortable: false, colspan: 4 },
        ],
        [
            { field: "invoiceNo", title: "No.", halign: "center", align: "center", sortable: false },
            {
                field: "invoiceDate", title: "TGL.", formatter: (value) => {
                    return moment(value).format("MM/DD/YYYY");
                }, sortable: false
            },
            { field: "pebNo", title: "No.", halign: "center", align: "center", sortable: false },
            {
                field: "pebDate", title: "TGL.", formatter: (value) => {
                    return new Date(value) > new Date(1901, 0, 1) ? moment(value).format("MM/DD/YYYY") : "-";
                }, sortable: false
            },
            {
                field: "quantityUom", title: "QUANTITY", formatter: (value) => {
                    return numeral(value.quantity).format("0,000") + " " + value.uom;
                }, halign: "center", align: "right", sortable: false
            },
            {
                field: "amountCurrency", title: "AMOUNT", formatter: (value) => {
                    return value.currency + " " + numeral(value.amount).format("0,000.00");
                }, sortable: false
            },
            {
                field: "rate", title: "RATE", formatter: (value) => {
                    return numeral(value).format("0,000");
                }, halign: "center", align: "right", sortable: false
            },
            {
                field: "idrAmount", title: "JML. IDR", formatter: (value) => {
                    return numeral(value).format("0,000.00");
                }, halign: "center", align: "right", sortable: false
            },
        ]
    ]

    get filter() {
        return {
            month: this.monthOptions.indexOf(this.selectedMonth) + 1,
            year: this.selectedYear
        };
    }

    bind() {
        const now = new Date();

        this.selectedMonth = this.monthOptions[now.getMonth()];

        const selectedYear = now.getFullYear();
        for (let i = selectedYear - 5; i <= selectedYear + 5; i++) {
            this.yearOptions.push(i.toString());
        }
        this.selectedYear = selectedYear.toString();
    }

    loader = (info) => {
        const arg = Object.assign({}, this.filter);

        return this.listDataFlag ? (
            this.service.search(arg)
                .then(result => {
                    for (let i = 0; i < result.data.length; i++) {
                        result.data[i].no = i + 1;
                        result.data[i].quantityUom = { quantity: result.data[i].quantity, uom: result.data[i].uom };
                        result.data[i].amountCurrency = { currency: result.data[i].currency, amount: result.data[i].amount };
                    }
                    return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    reset() {
        const now = new Date();

        this.selectedMonth = this.monthOptions[now.getMonth()];
        this.selectedYear = now.getFullYear().toString();

        this.listDataFlag = false;
        this.table.refresh();
    }

    xls() {
        this.service.xls(this.filter);
    }
}