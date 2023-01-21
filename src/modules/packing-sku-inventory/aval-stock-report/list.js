import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    @bindable searchDate;
    listDataFlag = false;
    columns = [
        { field: "avalType", title: "Nama Barang" },
        {
            field: "startAvalQuantity", title: "Awal Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "startAvalWeightQuantity", title: "Awal Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "inAvalQuantity", title: "Masuk Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "inAvalWeightQuantity", title: "Masuk Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "outAvalQuantity", title: "Keluar Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "outAvalWeightQuantity", title: "Keluar Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "endAvalQuantity", title: "Akhir Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "endAvalWeightQuantity", title: "Akhir Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        }
    ];

    loader = (info) => {
        var arg = {
            searchDate: this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null,
        }

        return this.listDataFlag ? this.service.search(arg)
            .then((result) => {
                return {
                    data: result
                }
            }) : { total: 0, data: {} };
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    export() {
        var searchDate = this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null;
        this.service.generateExcel(searchDate);

    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    reset() {
        this.listDataFlag = false;
        this.searchDate = null;
        this.table.refresh();
    }
}

