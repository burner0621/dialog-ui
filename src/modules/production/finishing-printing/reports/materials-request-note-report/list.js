import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

const UnitLoader = require('../../../../../loader/unit-loader');
const ProductLoader = require('../../../../../loader/product-loader');
const ProductionOrderLoader = require('../../../../../loader/production-order-loader');
const MaterialRequestNoteLoader = require('../../../../../loader/material-request-note-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.statusLists = ["", "SUDAH COMPLETE", "BELUM COMPLETE"];
        this.unitQuery = { "division.name": "FINISHING & PRINTING" };
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "Code", title: "No. SPB" },
        {
            field: "CreatedDate", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "OrderNo", title: "No. SPP" },
        { field: "ProductName", title: "Nama Barang" },
        { field: "Grade", title: "Grade" },
        { field: "OrderQuantity", title: "Panjang SPP (Meter)" },
        { field: "Length", title: "Panjang SPB (Meter)" },
        { field: "DistributedLength", title: "Panjang Realisasi (Meter)" },
        {
            field: "Status", title: "Status", formatter: function (value, data, index) {
                return value ? "SUDAH COMPLETE" : "BELUM COMPLETE";
            }
        },
        { field: "Remark", title: "Keterangan" },
    ];

    search() {
        this.flag = true;
        this.mrnTable.refresh();
    }

    reset() {
        this.materialsRequestNote = undefined;
        this.productionOrder = undefined;
        this.unit = undefined;
        this.product = undefined;
        this.status = "";
        this.dateFrom = undefined;
        this.dateTo = undefined;

        this.flag = false;
        this.mrnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            materialsRequestNoteCode: this.materialsRequestNote ? this.materialsRequestNote.Code : "",
            productionOrderId: this.productionOrder ? this.productionOrder._id : "",
            unitId: this.unit ? this.unit._id : "",
            productId: this.product ? this.product._id : "",
            status: this.status,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : undefined,
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : undefined
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    get unitLoader() {
        return UnitLoader;
    }

    get materialRequestNoteLoader() {
        return MaterialRequestNoteLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get productLoader() {
        return ProductLoader
    }
}
