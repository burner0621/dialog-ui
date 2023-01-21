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
      field: "OperationDate",
      title: "Tanggal"
    }, {
      field: "OperationTime",
      title: "Jam"
    },
    {
      field: "WeavingUnitName",
      title: "Unit Weaving"
    },
    {
      field: "OrderProductionNumber",
      title: "No. SOP"
    },
    {
      field: "FabricConstructionNumber",
      title: "No. Konstruksi"
    },
    {
      field: "WarpOrigin",
      title: "Asal Lusi"
    },
    {
      field: "WeftOrigin",
      title: "Asal Pakan"
    },
    {
      field: "OperationStatus",
      title: "Status"
    }
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

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
        for (var datum of result.data) {
          if (datum.DateTimeOperation) {
            datum.OperationDate = moment(datum.DateTimeOperation).format('DD/MM/YYYY');
            datum.OperationTime = moment(datum.DateTimeOperation).format('LT');
          }
        }
        return {
          total: result.data.length,
          data: result.data
        };
      } else {
        return {
          total: result.info.total,
          data: result.data
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
