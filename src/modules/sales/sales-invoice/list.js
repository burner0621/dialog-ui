import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { SPINNING, WEAVING, DYEINGPRINTING } from '../sales-invoice/shared/permission-constant';
import { PermissionHelper } from '../../../utils/permission-helper';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, PermissionHelper, Dialog)
export class List {
  context = ["Detail", "Cetak Surat Jalan", "Cetak Faktur Penjualan Valas", "Cetak Faktur Penjualan IDR"];

  columns1 = [
    { field: "SalesInvoiceNo", title: "No. Faktur Penjualan" },
    {
      field: "Buyer.Name",
      title: "Buyer",
    },
    {
      field: "SalesInvoiceDate",
      title: "Tgl Faktur Penjualan",
      formatter: (value, data, index) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    { field: "DeliveryOrderNo", title: "No. Surat Jalan" },
    { field: "VatType", title: "Jenis PPN" },
  ];

  columns2 = [
    { field: "SalesInvoiceNo", title: "No. Faktur Penjualan" },
    {
      field: "Buyer.Name",
      title: "Buyer",
    },
    {
      field: "SalesInvoiceDate",
      title: "Tgl Faktur Penjualan",
      formatter: (value, data, index) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    { field: "DeliveryOrderNo", title: "No. Surat Jalan" },
    { field: "VatType", title: "Jenis PPN" },
  ];

  columns3 = [
    { field: "SalesInvoiceNo", title: "No. Faktur Penjualan" },
    {
      field: "Buyer.Name",
      title: "Buyer",
    },
    {
      field: "SalesInvoiceDate",
      title: "Tgl Faktur Penjualan",
      formatter: (value, data, index) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    { field: "DeliveryOrderNo", title: "No. Surat Jalan" },
    { field: "VatType", title: "Jenis PPN" },
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
      filter: JSON.stringify({ SalesInvoiceCategory: this.activeRole.key }),
    };

    return this.service.search(arg).then((result) => {
      var data = {};
      data.total = result.info.total;
      data.data = result.data;
      return data;
    });
  };

  constructor(router, service, permissionHelper, dialog) {
    this.service = service;
    this.router = router;
    this.dialog = dialog;
    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();
  }

  initPermission() {
    this.roles = [SPINNING, WEAVING, DYEINGPRINTING];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {
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
      this.code1 = true;
      this.code2 = false;
      this.code3 = false;
    } else if (role.key === "WEAVING") {
      this.code1 = false;
      this.code2 = true;
      this.code3 = false;
    } else if (role.key === "DYEINGPRINTING") {
      this.code1 = false;
      this.code2 = false;
      this.code3 = true;
    } else {
      this.code1 = false;
      this.code2 = false;
      this.code3 = false;
    }
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute("view", { id: data.Id });
        break;
      case "Cetak Surat Jalan":
        this.service.getDeliveryOrderPdfById(data.Id);
        break;
      case "Cetak Faktur Penjualan Valas":
        this.service.getSalesInvoiceValasPdfById(data.Id);
        break;
      case "Cetak Faktur Penjualan IDR":
        this.service.getSalesInvoiceIDRPdfById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak Surat Jalan":
        return data;
      case "Cetak Faktur Penjualan Valas":
        if (data.Currency.Symbol == "Rp") {
          // this.dialog.prompt('Dokumen dalam Rupiah tidak memiliki PDF Valas');
          return null;
        } else {
          return data;
        }
      case "Cetak Faktur Penjualan IDR":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create", { activeRole: this.activeRole.key });
  }
}
