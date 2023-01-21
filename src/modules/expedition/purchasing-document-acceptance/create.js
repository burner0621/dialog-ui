import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import { Service } from "./service";
import PurchasingDocumentExpeditionService from "../shared/purchasing-document-expedition-service";
import { PermissionHelper } from "../../../utils/permission-helper";
import {
  VERIFICATION,
  CASHIER,
  ACCOUNTING,
} from "../shared/permission-constants";
const UnitPaymentOrderLoader = require("../../../loader/unit-payment-order-loader");
const SupplierLoader = require("../../../loader/supplier-loader");
const DivisionLoader = require("../../../loader/division-loader");

@inject(Router, Service, PurchasingDocumentExpeditionService, PermissionHelper)
export class Create {
  columns2 = [
    { field: "selected", checkbox: true, sortable: false },
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
    },
    { field: "Currency", title: "Mata Uang" },
  ];

  columns = [
    { field: "selected", checkbox: true, sortable: false },
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
    },
    { field: "Currency", title: "Mata Uang" },
  ];

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(
    router,
    service,
    purchasingDocumentExpeditionService,
    permissionHelper
  ) {
    this.router = router;
    this.service = service;
    this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;

    this.selectUPO = ["no"];
    this.selectSupplier = ["code", "name"];
    this.selectDivision = ["code", "name"];
    this.documentData = [];
    this.selectedItems = [];

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
    console.log(role);
    if (role.key !== this.activeRole.key) {
      this.activeRole = role;
      this.selectedItems.splice(0, this.selectedItems.length);
      this.documentData.splice(0, this.documentData.length);
      this.documentTable.refresh();
    }
  }

  //   changeTable(role) {
  //     this.code = role.key === "CASHIER" ? true : false;
  //   }

  changeTable(role) {
    this.code = role.key !== "VERIFICATION" ? true : false;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  search() {
    let filter = { Position: this.activeRole.positionAutocomplete };

    if (this.unitPaymentOrder)
      filter.UnitPaymentOrderNo = this.unitPaymentOrder.no;

    if (this.supplier) filter.SupplierCode = this.supplier.code;

    if (this.division) filter.DivisionCode = this.division.Code;
    let arg = {
      page: 1,
      size: 255,
      filter: JSON.stringify(filter),
    };

    this.purchasingDocumentExpeditionService.search(arg).then((result) => {
      this.selectedItems.splice(0, this.selectedItems.length);
      this.documentData.splice(0, this.documentData.length);
      this.documentData.push(...result.data);
      this.documentTable.refresh();
    });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  saveCallback(event) {
    /*
            let data = {
                ReceiptDate: this.receiptDate,
                Role: this.activeRole.key,
                PurchasingDocumentExpedition: [],
            };
        */

    let data = {
      Role: this.activeRole.key,
      PurchasingDocumentExpedition: [],
    };

    for (let s of this.selectedItems) {
      data.PurchasingDocumentExpedition.push({
        Id: s.Id,
        UnitPaymentOrderNo: s.UnitPaymentOrderNo,
      });
    }

    this.service
      .create(data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch((e) => {
        this.error = e;
      });
  }

  get unitPaymentOrderLoader() {
    return UnitPaymentOrderLoader;
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}
