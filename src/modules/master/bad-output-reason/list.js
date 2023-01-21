import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian"];
    }

    setColumns() {
        this.columns = [
            { field: "Reason", title: "Keterangan Bad Output" },            
            { field: "MachineDetails", title: "List Machine" }
        ];
    }


    loadData = (info) => {
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
            .then((result) => {
                var items = [];
                console.log(result.data);
                for(var a of result.data){
                    var machine = ""
                    if(a.MachineDetails || a.MachineDetails.length > 0){
                        for(var b of a.MachineDetails){
                            machine+=`${b.Name}` + "</br>";
                        }
                    }
                    var data = {
                        Id : a.Id,
                        Reason : a.Reason,
                        MachineDetails : machine
                    }
                    items.push(data);
                }
                return {
                    total: result.info.total,
                    data: items
                }
            });
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

    contextShowCallback(index, name, data) {
        return true;
    }

    create() {
        console.log("tambah")
        this.router.navigateToRoute('create');
    }
}