import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Rincian"]

    dataTobePosted = []

    columns = [
        {
            field: "IsPosted",
            title: "Post",
            checkbox: true,
            sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return ""
            }
        },
        { field: "MemoNo", title: "No Memo" },
        {
            field: "MemoDate", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "AccountingBookType", title: "Jenis Buku" },
        { field: "GarmentCurrenciesCode", title: "Mata Uang" },
        { field: "Remarks", title: "Keterangan" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    rowFormatter(data, index) {
        if (data.IsPosted)
            return { classes: "success" }
        else
            return {}
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        console.log(this.dataTobePosted);
        var items = this.dataTobePosted.map(s => s.Id);
        this.service.posting({Ids: items})
            .then(result => {
                alert("Data berhasil disimpan");
                this.error = {};
                this.table.refresh();
                this.selectedItems = [];
            })
            .catch(e => {
                if (e.message) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                this.error = e;
            });
    }
}