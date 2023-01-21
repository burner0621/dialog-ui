import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import { Dialog } from "../../../au-components/dialog/dialog";
import { Service } from "./service";
import PurchasingDocumentExpeditionService from "../shared/purchasing-document-expedition-service";
import { PermissionHelper } from "../../../utils/permission-helper";
import {
  VERIFICATION,
  CASHIER,
  ACCOUNTING,
} from "../shared/permission-constants";

@inject(
  Router,
  Service,
  PurchasingDocumentExpeditionService,
  Dialog,
  PermissionHelper
)
export class List {
  context = ["Hapus"];

  columns = [
    { field: "UnitPaymentOrderNo", title: "No. SPB" },
    {
      field: "UPODate",
      title: "Tanggal SPB",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "DueDate",
      title: "Tanggal Jatuh Tempo",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "InvoiceNo", title: "Nomor Invoice" },
    { field: "SupplierName", title: "Supplier" },
    { field: "DivisionName", title: "Divisi" },
    {
      field: "TotalPaid",
      title: "Total Bayar",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "Currency", title: "Mata Uang" },
  ];

  columns2 = [
    {
      field: "VerifyDate",
      title: "Tanggal Verifikasi",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "UnitPaymentOrderNo", title: "No. SPB" },
    {
      field: "UPODate",
      title: "Tanggal SPB",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "DueDate",
      title: "Tanggal Jatuh Tempo",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "InvoiceNo", title: "Nomor Invoice" },
    { field: "SupplierName", title: "Supplier" },
    { field: "DivisionName", title: "Divisi" },
    {
      field: "TotalPaid",
      title: "Total Bayar",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "Currency", title: "Mata Uang" },
  ];

  constructor(
    router,
    service,
    purchasingDocumentExpeditionService,
    dialog,
    permissionHelper
  ) {
    this.service = service;
    this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;
    this.router = router;
    this.dialog = dialog;

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();
  }

  initPermission() {
    this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {

      for (let code of this.roles[i].code) {
        if (this.permissions.hasOwnProperty(code)) {
          this.roles[i].hasPermission = true;
          this.accessCount++;
          this.activeRole = this.roles[i];
          this.changeTable(this.activeRole);
        }
      }

    }
  }

  changeRole(role) {
    if (role.key !== this.activeRole.key) {
      this.activeRole = role;
      this.tableList.refresh();
    }
  }
  //   changeTable(role) {
  //     this.code = role.key === "CASHIER" ? true : false;
  //   }
  changeTable(role) {
    this.code = role.key !== "VERIFICATION" ? true : false;
  }

  loader = (info) => {
    let order = {};

    if (info.sort) order[info.sort] = info.order;
    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      filter: JSON.stringify({ Position: this.activeRole.position }), // VERIFICATION_DIVISION
    };

    return this.purchasingDocumentExpeditionService
      .search(arg)
      .then((result) => {
        return {
          total: result.info.total,
          data: result.data,
        };
      });
  };

  contextClickCallback(event) {
    let arg = event.detail;
    let data = arg.data;

    switch (arg.name) {
      case "Hapus":
        this.dialog
          .prompt(
            "Apakah anda yakin mau menghapus data ini?",
            "Hapus Data Penerimaan Dokumen Pembelian"
          )
          .then((response) => {
            if (response.ok) {
              this.service.delete(data).then((result) => {
                this.tableList.refresh();
              });
            }
          });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
