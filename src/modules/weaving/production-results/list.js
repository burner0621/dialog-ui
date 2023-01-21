import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "MachineNumber", title: "No. Mesin" },
    { field: "Production", title: "Produksi" },
    { field: "SCMPX", title: "S/CMPX" },
    { field: "EFF", title: "EFF" },
    { field: "RPM", title: "RPM" },
    { field: "T", title: "T" },
    { field: "F", title: "F" },
    { field: "W", title: "W" },
    { field: "L", title: "L" },
    { field: "H", title: "H" }
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

    //   return this.service.search(arg).then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     };
    //     // .catch(error=>{
    //     //     console.log(error);
    //     // })
    //   });
    // };

    return {
      total: 1,
      data: [
        {
          Id: 1,
          MachineNumber: "1/2",
          Production: "165",
          SCMPX: "124",
          EFF: "673",
          RPM: "525",
          T: "26",
          F: "6",
          W: "5",
          L: "2",
          H: "8"
        }
      ]
    };
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
