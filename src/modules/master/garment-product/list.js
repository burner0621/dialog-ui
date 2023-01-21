import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    // data = [];
    // info = { page: 1, keyword: '' };
    context = ["detail"];
    columns = [
    { field: "Code", title: "Kode Barang" },
    { field: "Name", title: "Nama Barang" },
    { field: "Composition", title: "Komposisi" },
    { field: "Const", title: "Konstruksi" },
    { field: "Yarn", title: "Yarn" },
    { field: "Width", title: "Width" },
    { field: "UomUnit", title: "Satuan Default" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select:["Code","Name","Uom.Unit","Tags"],
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
        this.accessoriesId = "";
        this.accessories = [];
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
}
