import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { data } from 'jquery';
import { result } from 'underscore';

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "Code", title: "Kode" },
    { field: "AccountingBookType", title: "Nama" }
  ]

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

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
        var data = {}
        data.total = result.info.total;
        data.data = result.data;
        return data;
    });
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