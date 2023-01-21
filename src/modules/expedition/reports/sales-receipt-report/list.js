import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';

@inject(Service)
export class List {
    columns = [
        { field: 'SalesReceiptNo', title: 'No Kwitansi' },
        {
            field: 'SalesReceiptDate',
            title: 'Tanggal Pembayaran',
            formatter: function(value, data, index) {
                return value ? moment(value).format('DD/MM/YYYY') : '-';
            },
        },
        // { field: 'Products', title: 'Nama Barang' },
        {
            field: 'TotalPaid',
            title: 'Jumlah Pembayaran',
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '0';
            },
            align: 'right'
        },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        { field: 'Buyer', title: 'Buyer' },
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
        sortable: false,
        pagination: false
    };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];


    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {

        };


        if (this.info.dateFrom)
            arg.dateFrom = moment(this.info.dateFrom).format("MM/DD/YYYY");

        if (this.info.dateTo)
            arg.dateTo = moment(this.info.dateTo).format("MM/DD/YYYY");

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
        this.error = {};
        this.flag = true;
        this.tableList.refresh();
    }

    excel() {

        let params = {
            dateFrom: this.info.dateFrom ? moment(this.info.dateFrom).format("MM/DD/YYYY") : "",
            dateTo: this.info.dateTo ? moment(this.info.dateTo).format("MM/DD/YYYY") : ""
        };

        this.service.getXls(params)

        // this.getExcelData();
    }

    reset() {
        this.flag = false;

        this.error = {};
        this.info.dateFrom = undefined;
        this.info.dateTo = undefined;
        this.tableList.refresh();
    }


}