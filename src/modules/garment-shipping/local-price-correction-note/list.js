import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail", "cetak"]

    columns = [
        { field: "correctionNoteNo", title: "No Nota Koreksi" },
        { field: "salesNote.noteNo", title: "No Nota Penjualan" },
        {
            field: "correctionDate", title: "Tgl Koreksi", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "salesNote.buyerCode", title: "Buyer" },
        {
            field: "dueDate", title: "Tgl Jatuh Tempo", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }, sortable: false
        },
        { field: "salesNote.dispositionNo", title: "No Disposisi" },
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
                for (const data of result.data) {
                    data.salesNote.buyer = data.salesNote.buyer || {};
                    data.salesNote.buyerCode = `${data.salesNote.buyer.code} - ${data.salesNote.buyer.name}`;
                    data.dueDate = this.dueDate(data.salesNote.date, data.salesNote.tempo);
                }

                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    dueDate(date, tempo) {
        if (!date) {
            return null;
        }

        let dueDate = new Date(date || new Date());
        dueDate.setDate(dueDate.getDate() + tempo);
        
        return dueDate;
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "cetak":
                this.service.getPdfById(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
