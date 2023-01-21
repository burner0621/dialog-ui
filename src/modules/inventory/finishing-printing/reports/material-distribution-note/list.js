import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

const UnitLoader = require('../../../../../loader/unit-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["", "PRODUKSI", "RE-GRADING", "TEST"];
        this.unitQuery = { "DivisionName":"DYEING & PRINTING" };
        this.error = {};
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
        { field: "No", title: "No Bon" },
        { field: "Type", title: "Tipe Bon" },
        { field: "MaterialRequestNoteNo", title: "No SPB" },
        { field: "ProductionOrderNo", title: "No SPP" },
        { field: "ProductName", title: "Nama Barang" },
        { field: "Grade", title: "Grade" },
        { field: "Quantity", title: "Jumlah (Piece)", sortable: false },
        { field: "Length", title: "Panjang Barang Datang (Meter)", sortable: false },
        { field: "SupplierName", title: "Asal" },
        {
            field: "IsDisposition", title: "Disposisi", formatter: function (value, data, index) {
                return value ? "IYA" : "TIDAK";
            }
        },
        {
            field: "IsApproved", title: "Approve", formatter: function (value, data, index) {
                return data.IsDisposition ? (value ? "SUDAH" : "BELUM") : "-";
            }
        }
    ];

    search() {
        this.error = {};

        if (!this.date || this.date == "Invalid Date")
            this.error.date = "Tanggal harus diisi";

        if (!this.unit)
            this.error.unit = "Unit harus diisi";

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.mdnTable.refresh();
        }
    }

    reset() {
        this.unit = undefined;
        this.type = "";
        this.date = undefined;
        this.error = {};

        this.flag = false;
        this.mdnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            unitId: this.unit ? this.unit.Id : "",
            type: this.type,
            date: moment(this.date).format("MM/DD/YYYY")
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

    PDF() {
        this.error = {};

        if (!this.date || this.date == "Invalid Date")
            this.error.date = "Tanggal harus diisi";

        if (!this.unit)
            this.error.unit = "Unit harus diisi";

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
                unitId: this.unit ? this.unit.Id : "",
                unitName: this.unit ? this.unit.Name : "",
                type: this.type,
                date: moment(this.date).format("MM/DD/YYYY")
            };

            this.service.pdf(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }
}
