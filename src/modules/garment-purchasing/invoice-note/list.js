import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak Nota Pajak Pph", "Cetak Nota Pajak Ppn"];
    columns = [
        { field: "invoiceNo", title: "Nomor Invoice" },
        {
            field: "invoiceDate", title: "Tanggal Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.Name", title: "Nama Supplier" },
        { field: "items", title: "List Nomor Surat Jalan", sortable: false },
        { field: "CreatedBy", title: "Admin Pembelian" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["InvoiceDate", "invoiceNo", "Supplier.Name", "Items.DeliveryOrderNo", "UseVat", "UseIncomeTax", "IsPayVat", "IsPayTax"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.items.toString = function () {
                        var str = "<ul>";
                        for (var item of s.items) {
                            str += `<li>${item.deliveryOrder.doNo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
                // return data;
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
            case "Cetak Nota Pajak Pph":
                this.service.getPdfIncomeTaxNote(data.Id);
                break;
            case "Cetak Nota Pajak Ppn":
                this.service.getPdfVatNote(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Nota Pajak Pph":
                return data.useIncomeTax && data.isPayTax;
            case "Cetak Nota Pajak Ppn":
                return data.useVat && data.isPayVat;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}