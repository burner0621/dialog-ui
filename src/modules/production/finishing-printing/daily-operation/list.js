import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { ServiceCore } from "./service-core";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service, ServiceCore)
export class List {
    @bindable selectedSearch;
    @bindable productionOrder;
    @bindable kanban;
    @bindable step;
    @bindable machine;
    @bindable orderNo;
    @bindable stepProcess;
    @bindable cartNo;
    @bindable startDate;
    @bindable endDate;

    data = [];

    columns = [
        { field: "Machine.Name", title: "Mesin" },
        { field: "Step.Process", title: "Step / Proses" },
        { field: "Shift", title: "Shift" },
        { field: "Kanban.ProductionOrder.OrderNo", title: "No Order Produksi" },
        { field: "Kanban.Cart.CartNumber", title: "No Kereta" },
        {
            field: "DateInput", title: "Tanggal Input",
            formatter: (value, data) => {
                var date = value ? moment(value).format("DD MMM YYYY") : "-";
                return date;
            }
        },
        { field: "Input", title: "Input" },
        {
            field: "DateOutput", title: "Tanggal Output",
            formatter: (value, data) => {
                var date = value ? moment(value).format("DD MMM YYYY") : "-";
                return date;
            }
        },
        { field: "GoodOutput", title: "Good Output" },
        { field: "BadOutput", title: "Bad Output" }
    ];

    searchList = ["Nomor SPP", "Kereta", "Proses", "Mesin"];

    tableOptions = {
        search: false
    };

    context = ["Rincian"];

    constructor(router, service, serviceCore) {
        this.service = service;
        this.serviceCore = serviceCore;
        this.router = router;

        this.endDate = new Date();
        this.startDate = new Date().setDate(new Date().getDate() - 1);

        this.sppVisibility = false;
        this.cartVisiblity = false;
        this.processVisibility = false;
        this.machineVisibility = false;



        this.filter = {};
    }

    activate() {

    }

    // selectedSearchChanged(newValue, oldValue) {
    //     switch (newValue) {
    //         case this.searchList[0]: {
    //             this.sppVisibility = true;
    //             this.cartVisiblity = false;
    //             this.processVisibility = false;
    //             this.machineVisibility = false;
    //             break;
    //         }
    //         case this.searchList[1]: {
    //             this.sppVisibility = false;
    //             this.cartVisiblity = true;
    //             this.processVisibility = false;
    //             this.machineVisibility = false;
    //             break
    //         }
    //         case this.searchList[2]: {
    //             this.sppVisibility = false;
    //             this.cartVisiblity = false;
    //             this.processVisibility = true;
    //             this.machineVisibility = false;
    //             break;
    //         }
    //         case this.searchList[3]: {
    //             this.sppVisibility = false;
    //             this.cartVisiblity = false;
    //             this.processVisibility = false;
    //             this.machineVisibility = true;
    //             break;
    //         }
    //     }
    // }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            columnToSearch: this.selectedSearch,
            machine: this.machine,
            orderNo: this.orderNo,
            stepProcess: this.stepProcess,
            cartNo: this.cartNo,
            startDate: moment(this.startDate).format("YYYY-MM-DD"),
            endDate: moment(this.endDate).format("YYYY-MM-DD"),
            filter: JSON.stringify(this.filter),
            // select: ["machine.name", "step.process", "shift", "kanban.productionOrder.orderNo", "kanban.cart.cartNumber", "dateInput", "input", "dateOutput", "goodOutput", "badOutput", "type"]
        };


        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });

        // console.log(info);
        // return {
        //     total: 0,
        //     data: []
        // }
    }

    search() {
        this.dailyOperationTable.refresh();
    }

    contextClickCallback(event) {

        var arg = event.detail;
        var data = arg.data;

        if (data.Type == "input") {
            this.router.navigateToRoute('view-input', { id: data.Id });
        }
        else {
            this.router.navigateToRoute('view-output', { id: data.Id });
        }
    }

    back() {
        this.router.navigateToRoute('list');
    }

    createInput() {
        this.router.navigateToRoute('create-input');
    }

    createOutput() {
        this.router.navigateToRoute('create-output');
    }

    get productionOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["OrderNo"] };
            return this.service.productionOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get kanbanLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["Cart.CartNumber"] };
            return this.service.kanban(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get machineLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["Name"] };
            return this.serviceCore.machine(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get stepLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["Process"] };
            return this.serviceCore.step(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    cartNumber = (doc) => {
        return doc.cart.cartNumber;
    }

    productionOrderChanged(value) {
        if (value) {
            this.filter = {
                "Kanban.ProductionOrder.OrderNo": value.OrderNo
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    kanbanChanged(value) {
        if (value) {
            this.filter = {
                "Kanban.Cart.CartNumber": value.Cart.CartNumber
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    stepChanged(value) {
        if (value) {
            this.filter = {
                "Step.Process": value.Process
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    // machineChanged(value) {
    //     if (value) {
    //         this.filter = {
    //             "MachineName": value.Name
    //         };
    //     }
    //     else
    //         this.filter = {};

    //     this.dailyOperationTable.refresh();
    // }
}
