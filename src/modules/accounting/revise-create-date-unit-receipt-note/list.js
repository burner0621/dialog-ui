import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return ""
            }
        },
        { field: "URNNo", title: "No. Bon Terima Unit" },
        {
            field: "CreatedUtc", title: "Tanggal Bon Terima Unit",
            formatter: (value, data) => {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "URNType", title: "Tipe Bon Terima Unit" },
        { field: "SupplierName", title: "Supplier" },
        { field: "DONo", title: "No. Surat Jalan" },
        { field: "DRNo", title: "No. Bukti Pengantar" },
        { field: "UENNo", title: "No. Bon Pengeluaran" }
    ];

    controlOptions = {
        label: {
            align: "left",
            length: 2
        },
        control: {
            length: 5
        }
    };

    Types = ["BUM", "BUK"];

    context = ["Rincian", "Cetak PDF"];

    today = new Date();

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {

    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                result.data.map((data) => {
                    data.SupplierName = data.Supplier.Name;
                    return data;
                });

                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    back() {
        this.router.navigateToRoute('list');
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    posting() {
        if (this.dataToBePosted.length > 0) {
            this.service.revise(this.dataToBePosted, moment(this.revisiondate).format("YYYY-MM-DD")).then(result => {
                alert("Tanggal Berhasil Diubah");
                this.table.refresh();
            }).catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal Mengubah Tanggal, silakan coba lagi!");
                } else {
                    this.error = e;
                }
            })
        } else {
            alert("Tanggal Harus Diisi");
        }

    }

}