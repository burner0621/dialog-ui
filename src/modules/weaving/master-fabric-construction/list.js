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
      field: "DateCreated",
      title: "Tanggal Dibuat",
      formatter: function (value, data, index) {
        moment.locale("id");
        return moment.utc(value).local().format('DD MMMM YYYY');
      }
    },
    {
      field: "ConstructionNumber",
      title: "Konstruksi"
    },
    {
      field: "TotalYarn",
      title: "Total(Gr)"
    }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg).then(result => {
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
        this.router.navigateToRoute("view", {
          Id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
