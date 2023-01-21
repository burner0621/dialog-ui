import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.title = "Detail SPP";
    }

    textOptions = {
        label: {
            length: 1,
            align: "left"
        },
        control: {
            length: 1,
            align: "right"
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { field: "no", title: "No." },
        { field: "cartNumber", title: "Nomor Kereta" },
        { field: "process", title: "Proses" },
        { field: "processArea", title: "Area" },
        { field: "quantity", title: "Kuantiti (m)" },
        { field: "status", title: "Status" }
    ];

    columnsHistory = [
        {
            field: "_createdDate", title: "Tanggal Buat", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "deliveryDateCorrection", title: "Tanggal Hasil Revisi", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "reason", title: "Alasan" }
    ]

    async activate(params) {
        console.log(params);
        // this.orderNo = params.orderNo ? decodeURIComponent(params.orderNo) : 0;

        this.info = {
            orderId: params.orderNo
        };

        this.result = await this.service.getByOrderId(this.info);
        this.data = this.result.data;
        this.histories = this.result.histories;

        let total = 0;

        for (let datum of this.data) {

            total += Number(datum.quantity);
            datum.quantity = numeral(datum.quantity).format('0,000.00');
        }

        this.total = total.toFixed(2);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    exportToExcel() {
        this.service.generateKanbanXls(this.info);
    }

    cancelCallback(event) {
        this.list();
    }
}