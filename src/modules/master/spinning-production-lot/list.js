import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["detail"];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  columns = [
    { field: "Unit.name", title: "Spinning" },
    {
      field: "Date", title: "Tanggal", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "Machine.name", title: "Mesin" },
    { field: "Yarn.Name", title: "Benang" },
    { field: "Lot", title: "Lot" }
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
      .then((result) => {
        return {
          total: result.info.total,
          data: result.data
        }
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
