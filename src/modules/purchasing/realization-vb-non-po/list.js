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

  context = ["Detail", "Cetak Bukti Realisasi"];

  columns = [
    { field: "DocumentNo", title: "No. Realisasi VB" },
    { field: "VBRequestDocumentNo", title: "No. Permohonan VB" },
    {
      field: "Date",
      title: "Tanggal Realisasi",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "VBRequestDocumentRealizationEstimationDate",
      title: "Tanggal Estimasi",
      formatter: function (value, data, index) {
        if (data.VBRequestDocumentNo)
          return moment(value).format("DD MMM YYYY");
        else return "-";
      },
    },
    // { field: "UnitLoad", title: "Beban Unit" },
    { field: "CreatedBy", title: "Dibuat oleh" },
    {
      field: "Position",
      title: "Status Verifikasi",
      formatter: function (value, row, index) {
        return value > 3 && value != 6
          ? "Sudah"
          : value == 6
          ? "Ditolak"
          : "Belum";
      },
    },
    { field: "Remark", title: "Keterangan" },
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
    this.tabs = ["Realisasi VB Non PO", "Realisasi VB Inklaring Non PO"];

    // Default tab is non-inklaring
    this.activeTab = this.tabs[0];
    this.IsInklaring = false;
  }

  changeTab(tab) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.IsInklaring = this.activeTab !== this.tabs[0] ? true : false;

      this.tableList.refresh();
    }
  }

  create(activeTab) {
    const createRoute =
      activeTab === "Realisasi VB Non PO" ? "create" : "create-inklaring";
    this.router.navigateToRoute(createRoute);
  }

  contextClickCallback(event, activeTab) {
    var arg = event.detail;
    var data = arg.data;
    const viewRoute =
      activeTab === "Realisasi VB Non PO" ? "view" : "view-inklaring";
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute(viewRoute, {
          id: data.Id,
          search: this.ressearch,
        });
        break;
      case "Cetak Bukti Realisasi":
        this.service.getSalesReceiptPdfById(data.Id);
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
