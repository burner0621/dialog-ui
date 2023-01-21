import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["detail"];

  columns = [
    {
      field: "date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "bonNo", title: "No. Bon" },
    { field: "shift", title: "Shift" },
    { field: "destinationArea", title: "Area Tujuan" },
    { field: "group", title: "Group" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      var data = {};
      data.total = result.total;
      data.data = result.data;
      return data;
    });
  };

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", {
          id: data.id,
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
