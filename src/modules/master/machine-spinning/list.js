import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Detail"];
    columns = [
        { field: "No", title: "Nomor Mesin" },
        { field: "Brand", title: "Type Mesin" },
        { field: "Name", title: "Merk Mesin" },
        { field: "MachineCode", title: "Kode Mesin" },
        { field: "Year", title: "Tahun" },
        { field: "Condition", title: "Kondisi Mesin" },
        { field: "CounterCondition", title: "Kondisi Counter" },
        { field: "Line", title: "Line" },
        { field: "UnitName", title: "Unit" },
        { field: "ProcessTypeList", title: "Jenis Proses" },
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
                for (var data of result.data) {
                    data.ProcessTypeList = data.Types.map((item) => {
                        if (item && item.Type) {
                            return "- " + item.Type;
                        }
                    });
                    data.ProcessTypeList = data.ProcessTypeList.join("\n");
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

    upload() {
        this.router.navigateToRoute('upload');
    }

    download() {
        var endpoint = 'machine-spinnings/download';
        var request = {
            method: 'GET'
        };

        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
        this.service._downloadFile(getRequest);
        this.service.publish(getRequest);
    }
}