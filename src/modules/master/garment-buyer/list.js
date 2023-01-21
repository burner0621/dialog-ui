import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "Code", title: "Kode" },
    { field: "Name", title: "Nama" },
    { field: "Address", title: "Alamat" },
    { field: "City", title: "Kota" },
    { field: "Country", title: "Negara" },
    { field: "Contact", title: "Kontak" },
    { field: "Tempo", title: "Tempo" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["Code", "Name", "Address", "City", "Country", "Contact", "Tempo"],
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
        this.buyerId = "";
        this.buyers = [];
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
