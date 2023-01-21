import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "EstimatedNumber", title: "No Estimasi Produksi" },
    {
      field: "DateEstimated",
      title: "Tanggal Estimasi Produksi",
      formatter: function(value, data, index) {
        moment.locale("id");
        return moment(new Date(value)).format("DD MMMM YYYY");
      }
    }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10),
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.searchEstimatedProductions(arg).then(result => {
      return {
        total: result.info.total,
        data: result.data
      };
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { Id: data.Id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
