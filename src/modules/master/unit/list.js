import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["detail"];
  columns = [
    { field: "Code", title: "Kode" },
    { field: "Division.Name", title: "Nama Divisi" },
    { field: "Name", title: "Nama Unit" },
    { field: "AccountingUnit.Name", title: "Unit Pembukuan" },
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
      var resultPromise = [];
      if (result && result.data && result.data.length > 0) {
        resultPromise = result.data.map((datum) => {
          if (datum.AccountingUnitId !== 0) {
            return this.service
              .getAccountingUnit(datum.AccountingUnitId)
              .then((accountingUnit) => {
                datum.AccountingUnit = accountingUnit;
                return Promise.resolve(datum);
              });
          } else {
            return Promise.resolve(datum);
          }
        });
      }
      return Promise.all(resultPromise).then((newResult) => {
        return {
          total: result.info.total,
          data: newResult,
        };
      });
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.uomId = "";
    this.uoms = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", {
          Id: data.Id,
        });
        break;
    }
  }

  upload() {
    this.router.navigateToRoute("upload");
  }
}
