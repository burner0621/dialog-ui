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

  // context = ["detail", "print"];
  context = ["detail"];

  columns = [
    {
      field: "date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format("DD MMMM YYYY");
      },
    },
    {
      field: "bonNo",
      title: "No. Bon",
    },
    {
      field: "shift",
      title: "Shift",
    },
    { field: "type", title: "Jenis" },
    // {
    //   field: "avalCartNo",
    //   title: "No. Kereta"
    // },
    // {
    //   field: "productionOrderType",
    //   title: "Jenis"
    // },
    // {
    //   field: "uomUnit",
    //   title: "Satuan"
    // },
    // {
    //   field: "productionOrderQuantity",
    //   title: "Qty Satuan"
    // },
    // {
    //   field: "qtyKg",
    //   title: "Qty KG"
    // }
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

    // return {
    //   data: [{
    //     Id: 1,
    //     Date: "2020-04-05 17:00:00.0000000 +00:00",
    //     BonNo: "IM.20.0009",
    //     Shift: "PAGI",
    //     CartNo: "12",
    //     ProductionOrderType: "SOLID",
    //     UOMUnit: "YDS",
    //     ProductionOrderQuantity: "3,13",
    //     ProductionOrderKg: "1"
    //   }]
    // }
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
      // case "print":
      //   this.service.generateReportById(data.id);
      //   break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }

  excel() {
    this.router.navigateToRoute('excel');
    // this.service.generateExcel();
}
}
