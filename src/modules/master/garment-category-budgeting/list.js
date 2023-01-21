import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Detail"];
    columns = [
    { field: "code", title: "Kode Kategori" },
    { field: "name", title: "Nama kategori" },
    { field: "UOM.Unit", title: "Satuan Default" },
    { field: "categoryType", title: "Tipe Kategori" },
    { field: "codeRequirement", title: "Jenis Kategori" },    
  ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["Code", "Name"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                for(var a of result.data){
                    a.UomUnit=a.UOM.Unit;
        }       
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

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

}
