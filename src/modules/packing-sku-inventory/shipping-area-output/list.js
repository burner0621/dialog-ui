import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    context = ["detail packinglist", "print rekap bon", "print packinglistSales","detail bon", "print bon"]

    columns = [
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "bonNo", title: "No. Bon" },
        { field: "shift", title: "Shift" },
        { field: "group", title: "Group" },
        { field: "destinationArea", title: "Area Tujuan" },
        { field: "type", title: "Jenis" },
    ];

    rowFormatter(data, index) {
        console.log(data);
        console.log(data.updateBySales);
        if (data.updateBySales) {
            return { classes: "success" }
        } else
        return {}
        
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.total;
                data.data = result.data;
                // for (var item of data.data) {
                //     if (item.destinationArea === "PENJUALAN") {
                //         item.bonNo = "-";
                //     }
                // }
                return data;
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
            case "detail packinglist":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "print rekap bon":
                this.service.getPdfById(data.id, false);
                break;
            case "print packinglistSales":
                this.service.getPdfPackingListSalesById(data.id);
                break;
            case "detail bon":
                this.router.navigateToRoute('view-bon', { id: data.id });
                break;
            case "print bon":
                this.service.getPdfById(data.id, true);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
    
    excel() {
        this.router.navigateToRoute('excel');
        // this.service.generateExcel();
    }
}

