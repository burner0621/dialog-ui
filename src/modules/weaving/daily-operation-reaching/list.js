import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [{
    field: "MachineDate",
    title: "Tanggal"
  }, {
    field: "MachineTime",
    title: "Jam"
  }, {
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "SizingBeamNumber",
    title: "No. Beam"
  }];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        for (var datum of result.data) {
          if (datum.DateTimeOperation) {
            datum.MachineDate = moment(datum.DateTimeOperation).format('DD/MM/YYYY');
            datum.MachineTime = moment(datum.DateTimeOperation).format('LT');
          }
        }
        return {
          total: result.info.total,
          data: result.data
        };
      } else {
        return {
          total: 0,
          data: {}
        };
      }
    });
  };

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("update", {
          Id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
