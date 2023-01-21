import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        { field: "Code", title: "Kode", width: "8%" },
        { field: "Name", title: "Nama", width: "17%" },
        { field: "Address", title: "Alamat", width: "20%" },
        { field: "PhoneNumber", title: "No. Telepon", width: "10%" },
        { field: "NIK", title: "NIK", width: "10%" },
        { field: "NPWP", title: "No. NPWP", width: "10%" },
        { field: "WPName", title: "Nama Wajib Pajak", width: "15%" },
        { field: "KaberType", title: "Status Buyer", width: "10%" }, 
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["Code", "Name", "Address"],
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

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    upload() {
        this.router.navigateToRoute('upload');
    }

}
