import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "Unit", title: "Unit Weaving" },
    { field: "OrderNumber", title: "SPP" },
    { field: "ConstructionNumber", title: "No Konstruksi" },
    { field: "Process", title: "Proses" },
    { field: "Operator", title: "Operator" },
    { field: "MachineNumber", title: "No Mesin" },
    { field: "Trouble", title: "Trouble" },
    { field: "Description", title: "Keterangan" },    
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

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        let getUnitPromises = result.data.map(datum =>
          this.service.getUnitById(datum.Unit)
        );

        return Promise.all(getUnitPromises).then(units => {
          for (var datum of result.data) {
            if (units && units.length > 0) {
              let unit = units.find(
                unitResult => datum.Unit == unitResult.Id
              );
              datum.Unit = unit.Name;
            }
          }
          return {
            total: result.info.total,
            data: result.data
          };
        });
      } else {
        return {
          total: result.info.total,
          data: result.data
        };
      }
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
