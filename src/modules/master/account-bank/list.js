import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "AccountName", title: "Nama Akun" },
    { field: "AccountNumber", title: "No Akun" },
    { field: "BankCode", title: "Kode Bank" },
    { field: "BankName", title: "Nama Bank" },
    { field: "BankAddress", title: "Alamat Bank" },
    { field: "Currency.Code", title: "Kode Mata Uang" },
    { field: "Division.Name", title: "Nama Divisi" },
    { field: "AccountCOA", title: "COA" },   
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["AccountName","AccountNumber","BankCode","BankName","BankAddress","CurrencyCode","DivisionName","AccountCOA"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {   
          var data = {}
          data.total = result.info.total;
          data.data = result.data;
          return data;
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

}
