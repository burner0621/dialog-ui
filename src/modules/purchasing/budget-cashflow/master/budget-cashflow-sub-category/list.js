import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Ubah", "Hapus"];
    columns = [
        { field: "CashflowCategory.Name", title: "Kategori Budget Cashflow" },
        { field: "CashflowCategory.LayoutOrder", title: "Nomor Urut Kategori Budget Cashflow" },
        {
            field: "CashflowCategory.Type", title: "Tipe Kategori Budget Cashflow", formatter: function (value, data, index) {
                return value == 1 ? "Cash In" : "Cash Out";
            }
        },
        { field: "Name", title: "Nama" },
        {
            field: "LayoutOrder", title: "Nomor Urut"
        }
    ];

    tableOptions = {
        // showColumns: false,
        search: true,
        showToggle: false,
        sortable: false,
        pagination: false,
    };

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
                var resultPromise = result.data.map((datum) => {
                    return this.service.getBudgetCashflowCategoryById(datum.CashflowCategoryId)
                        .then((cashfowCategory) => {
                            datum.CashflowCategory = cashfowCategory;
                            return datum;
                        })
                });

                return Promise.all(resultPromise)
                    .then((cashflowSubCategories) => {
                        return {
                            data: cashflowSubCategories,
                            total: 1
                        }
                    })
                // return {
                //     total: result.info.total,
                //     data: result.data
                // }
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
            case "Ubah":
                this.router.navigateToRoute('edit', { id: data.Id });
                break;
            case "Hapus":
                this.service.delete(data)
                    .then((response) => {
                        alert("Data berhasil tersimpan")
                        this.table.refresh();
                    })
                    .catch((error) => {
                        alert("Terjadi kesalahan!");
                    })
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}