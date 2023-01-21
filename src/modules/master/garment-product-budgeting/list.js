import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    info = { page: 1, keyword: '' };
    context = ["Detail"];
    columns = [
    { field: "Code", title: "Kode Barang" },
    { field: "Name", title: "Nama Barang" },
    { field: "UomUnit", title: "Satuan Default" },
    // { field: "currency.code", title: "Mata Uang" },
    // { field: "price", title: "Harga Barang" },
    { field: "Tags", title: "Tags" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
      
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select:["Code","Name","UomUnit","Tags"],
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
      case "Detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

    upload() {
        this.router.navigateToRoute('upload');
    }
    
    create() {
        this.router.navigateToRoute('create');
    }

}
