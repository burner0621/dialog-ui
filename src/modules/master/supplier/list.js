import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    // data = [];
    // info = { page: 1, keyword: '' };
    context = ["detail"];
    columns = [
    { field: "code", title: "Kode" },
    { field: "name", title: "Nama" },
    { field: "address", title: "Alamat" },
    { field: "NPWP", title: "NPWP" },
    {
      field: "import", title: "Import",
      formatter: function (value, row, index) {
        return value ? "YA" : "TIDAK";
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
      select:["code","name","address","import","NPWP"],
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
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }
}
