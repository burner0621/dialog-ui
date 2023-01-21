import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { SPINNING, WEAVING, DYEINGPRINTING } from '../do-sales/shared/permission-constant';
import { PermissionHelper } from '../../../utils/permission-helper';

@inject(Router, Service, PermissionHelper)
export class List {
  context = ["Detail", "Cetak DO Penjualan"];

  columns = [
    { field: "DOSalesNo", title: "No. DO" },
    { field: "DOSalesType", title: "Type DO" },
    {
      field: "Date",
      title: "Tanggal",
      formatter: (value, data, index) => {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    { field: "SalesContract.Buyer.Name", title: "Buyer" },
    {
      field: "Accepted",
      title: "Diterima",
      formatter: function (value, data, index) {
        return data.Accepted ? "Sudah" : "Belum";
      },
    },
  ];

  columns1 = [
    { field: "DOSalesNo", title: "No. DO" },
    { field: "DOSalesType", title: "Type DO" },
    {
      field: "Date",
      title: "Tanggal",
      formatter: (value, data, index) => {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    { field: "SalesContract.Buyer.Name", title: "Buyer" },
    {
      field: "Accepted",
      title: "Diterima",
      formatter: function (value, data, index) {
        return data.Accepted ? "Sudah" : "Belum";
      },
    },
  ];

  columns2 = [
    { field: "DOSalesNo", title: "No. DO" },
    { field: "DOSalesType", title: "Type DO" },
    {
      field: "Date",
      title: "Tanggal",
      formatter: (value, data, index) => {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    { field: "SalesContract.Buyer.Name", title: "Buyer" },
    {
      field: "Accepted",
      title: "Diterima",
      formatter: function (value, data, index) {
        return data.Accepted ? "Sudah" : "Belum";
      },
    },
  ];

  rowFormatter(data, index) {
    if (data.isClosed) return { classes: "danger" };
    else return {};
  }

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      filter: JSON.stringify({ DOSalesCategory: this.activeRole.key }),
    };

    return this.service.search(arg).then((result) => {
      var data = {};
      data.total = result.info.total;
      data.data = result.data;
      return data;
    });
  };

  constructor(router, service, permissionHelper) {
    this.service = service;
    this.router = router;

    this.permissions = permissionHelper.getUserPermissions();
    console.log(this.permissions)
    this.initPermission();
  }

  initPermission() {
    this.roles = [SPINNING, WEAVING, DYEINGPRINTING];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {
      console.log(this.roles[i]);
      if (this.permissions.hasOwnProperty(this.roles[i].code)) {
        this.roles[i].hasPermission = true;
        this.accessCount++;
        this.activeRole = this.roles[i];

        this.code = true;
      }
    }
  }

  changeRole(role) {
    if (role.key !== this.activeRole.key) {

      this.activeRole = role;
      this.tableList.refresh();
    }
  }
  changeTable(role) {

    if (role.key === "SPINNING") {

      this.code = true;
      this.code1 = false;
      this.code2 = false;

    } else if (role.key === "WEAVING") {

      this.code = false;
      this.code1 = true;
      this.code2 = false;

    } else {

      this.code = false;
      this.code1 = false;
      this.code2 = true;
    }

  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute("view", { id: data.Id });
        break;
      case "Cetak DO Penjualan":
        this.service.getDOSalesPdfById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak DO Penjualan":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create", { activeRole: this.activeRole.key });

  }
}
