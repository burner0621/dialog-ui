import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
// import moment from "moment";

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["Update"];

  columns = [{
      field: "WarpingBrokenCauseName",
      title: "Nama Penyebab Putus"
    },
    {
      field: "Information",
      title: "Informasi"
    },
    {
      field: "WarpingBrokenCauseCategory",
      title: "Kategori Putus"
    }
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

      return this.service.search(arg).then(result => {
        return {
          total: result.info.total,
          data: result.data
        };
      });
    // return {
    //   data: [{
    //     Id: 1,
    //     WarpingBrokenCauseName: "Benang Tipis",
    //     Information: "Test 1",
    //     WarpingBrokenCauseCategory: "Umum"
    //   }, {
    //     Id: 2,
    //     WarpingBrokenCauseName: "Slub",
    //     Information: "Test 2",
    //     WarpingBrokenCauseCategory: "Umum"
    //   }, {
    //     Id: 2,
    //     WarpingBrokenCauseName: "Gulungan Keras",
    //     Information: "Test 3",
    //     WarpingBrokenCauseCategory: "Lain-lain"
    //   }]
    // }
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Update":
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
