import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "Name", title: "Nama" },
    { field: "Indicators", title: "Indikator" },
    ];

    loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select:["name","indicators"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.Indicators.toString = function () {
                        var str = "<ul>";
                        for (var item of s.Indicators) {
                            str += `<li>${item.Indicator}</li>`;
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
        this.machineTypeId = "";
        this.machineType = [];
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

}
