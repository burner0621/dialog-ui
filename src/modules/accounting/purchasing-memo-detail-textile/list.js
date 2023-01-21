import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.isPosted) return { classes: "success" };
    else return {};
  }

  context = ["Detail", "Cetak PDF"];

  type = 1;

  columns = [
    { field: "DocumentNo", title: "No. Memo" },
    {
      field: "Date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    // { field: "UnitLoad", title: "Beban Unit" },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "DivisionName", title: "Divisi" },
  ];

  async activate(params) {
    this.ressearch = params.search;
  }

  loader = (info) => {
    let order = {};

    if (info.sort) order[info.sort] = info.order;
    else order["LastModifiedUtc"] = "desc";

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      type: this.type,
      filter: JSON.stringify({ IsInklaring: this.IsInklaring }),
    };

    return this.service.search(arg).then((result) => {
      return {
        total: result.info.total,
        data: result.data,
      };
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.initTab();
  }

  initTab() {
    this.tabs = ["Rincian Memo Pembelian Textil Disposisi", "Rincian Memo Pembelian Textil Non Disposisi"];

    // Default tab is non-inklaring
    this.activeTab = this.tabs[0];
    this.IsInklaring = false;
  }

  changeTab(tab) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.IsInklaring = this.activeTab !== this.tabs[0] ? true : false;
      this.type = this.activeTab !== this.tabs[0] ? 2 : 1;

      this.tableList.refresh();
    }
  }

  create(activeTab) {
    const createRoute =
      activeTab === "Rincian Memo Pembelian Textil Disposisi" ? "create" : "create-inklaring";
    this.router.navigateToRoute(createRoute);
  }

  contextClickCallback(event, activeTab) {
    var arg = event.detail;
    var data = arg.data;
    const viewRoute =
      activeTab === "Rincian Memo Pembelian Textil Disposisi" ? "view" : "view-inklaring";
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute(viewRoute, {
          id: data.Id,
          search: this.ressearch,
        });
        break;
      case "Cetak PDF":
        this.service.getPDFById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak Bukti Realisasi":
        return data;
      default:
        return true;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      this.service
        .post(this.dataToBePosted)
        .then((result) => {
          this.table.refresh();
        })
        .catch((e) => {
          this.error = e;
        });
    }
  }
}
