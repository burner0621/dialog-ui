import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail"]//,"Cetak PDF"]

    columns = [
        { field: "noteNo", title: "No Nota Penjualan Lokal" },
        {
            field: "date", title: "Tgl Penjualan", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "buyerCode", title: "Buyer" },
        {
            field: "dueDate", title: "Tgl Jatuh Tempo", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }, sortable: false
        },
        { field: "dispositionNo", title: "No Disposisi" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ IsApproveShipping:false, IsUsed:true, IsRejectedShipping:false, isRejectedFinance:false})
        }

        return this.service.search(arg)
            .then(result => {
                for (const data of result.data) {
                    data.buyer = data.buyer || {};
                    data.buyerCode = `${data.buyer.code} - ${data.buyer.name}`;
                    data.dueDate = this.dueDate(data.date, data.tempo);
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
            case "Cetak PDF": 
                this.service.getPdfById(data.id); 
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
