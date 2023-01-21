import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

const moment = require('moment');

@inject(DialogController)
@useView("./detail-dialog-view.html")
export class DialogDetailView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(params) {
        // console.log(params);
        this.data = params.data;
        // this.table.refresh();
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        sortable: false,
        pagination: false
    }

    columns = [
        [
            { field: "SalesReceiptNo", title: "No Kwitansi", rowspan: 2 },
            { title: "HistoryPembayaran", colspan: 2 }
        ], [
            {
                field: "SalesReceiptDate", title: "Tanggal Pembayaran", formatter: (value, data, index) => {
                    return moment.utc(value).local().format('DD MMM YYYY');
                }
            },
            { field: "Nominal", title: "Jumlah Pembayaran" },
        ]
    ];
}