// import {inject} from 'aurelia-framework';
// import {Service} from "./service";
// import {Router} from 'aurelia-router';

// var moment = require('moment');

// @inject(Router, Service)
// export class List {
//     data = [];
//     info = { page: 1, keyword: '' };

//     constructor(router, service) {
//         this.service = service;
//         this.router = router;
//     }

//     async activate() {
//         this.info.keyword = '';
//         var result = await this.service.search(this.info);
//         this.data = result.data;
//         this.info = result.info;

//         this._adjustDateTime();
//     }

//     loadPage() {
//         var keyword = this.info.keyword;
//         this.service.search(this.info)
//             .then(result => {
//                 this.data = result.data;
//                 this.info = result.info;
//                 this.info.keyword = keyword;

//                 this._adjustDateTime();
//             })
//     }

//     changePage(e) {
//         var page = e.detail;
//         this.info.page = page;
//         this.loadPage();
//     }

//     back() {
//         this.router.navigateToRoute('list');
//     }

//     view(data) {
//         this.router.navigateToRoute('view', { id: data._id });
//     }

//     create() {
//         this.router.navigateToRoute('create');
//     }

//     _adjustDateTime(){
//         for (var monitoringEvent of this.data)
//         {
//             if (monitoringEvent.dateEnd == null )
//                 delete monitoringEvent.dateEnd;
//             if (monitoringEvent.timeInMillisEnd == null )
//                 delete monitoringEvent.timeInMillisEnd;

//             monitoringEvent.timeInMomentStart = monitoringEvent.timeInMillisStart != undefined ? moment(monitoringEvent.timeInMillisStart).format('HH:mm') : undefined;
//             monitoringEvent.timeInMomentEnd = monitoringEvent.timeInMillisEnd != undefined ? moment(monitoringEvent.timeInMillisEnd).format('HH:mm') : undefined;

//             if (monitoringEvent.dateStart)
//                 monitoringEvent.dateStart = moment(monitoringEvent.dateStart).format("D MMM YYYY");
//             if (monitoringEvent.dateEnd)
//                 monitoringEvent.dateEnd = moment(monitoringEvent.dateEnd).format("D MMM YYYY");
//         }
//     } 
// }

import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    context = ["detail"]

    columns = [
        {
            field: "DateStart", title: "Tanggal Mulai", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "DateStart", title: "Jam Mulai", formatter: function (value, data, index) {
                return moment(value).format("HH:mm");
            }
        },
        {
            field: "DateEnd", title: "Tanggal Selesai", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "DateEnd", title: "Jam Selesai", formatter: function (value, data, index) {
                return moment(value).format("HH:mm");
            }
        },
        { field: "Machine.Name", title: "Mesin" },
        { field: "ProductionOrder.OrderNo", title: "Nomor Order Produksi" },
        { field: "ProductionOrderDetail.ColorRequest", title: "Warna" },
        { field: "CartNumber", title: "Nomor Kereta" },
        { field: "MachineEvent.Name", title: "Event Mesin" },
        { field: "Remark", title: "Keterangan" },
        {
            field: "ProductionOrder.DeliveryDate", title: "Jadwal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        }

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
            // select: ["dateStart", "dateEnd", "machine.name", "productionOrder.orderNo", "selectedProductionOrderDetail.colorRequest", "cartNumber", "machineEvent.name", "remark", "productionOrder.deliveryDate"]
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "view":
                return true;
            default:
                return true;
        }
    }


    create() {
        this.router.navigateToRoute('create');
    }
}

