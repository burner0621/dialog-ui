import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import numeral from "numeral";
var moment = require("moment");

import { DialogDetailView } from "./template/detail-dialog-view";

const VbRequestAllLoader = require("./../../../../loader/vb-request-document-loader");
const UnitLoader = require("./../../../../loader/unit-loader");
const AccountLoader = require("./../../../../loader/account-loader");

import { Dialog } from "./../../../../au-components/dialog/dialog";

@inject(Router, Service, Dialog)
export class List {
  filterAccount = {};
  filter = {};
  listDataFlag = false;
  // context = ["Rincian"]
  currencies = [];

  constructor(router, service, dialog) {
    this.service = service;
    this.router = router;
    this.dialog = dialog;
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    sortable: false,
    pagination: false,
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  setValue() {
    this.arg.unitId = this.selectedUnit ? this.selectedUnit.Id : null;
    this.arg.vbRequestId = this.selectedVBRequest
      ? this.selectedVBRequest.Id
      : null;
    this.arg.applicantName = this.selectedApplicant
      ? this.selectedApplicant.username
      : null;
    this.arg.clearanceStatus = this.selectedStatus
      ? this.selectedStatus.value
      : null;
    this.arg.requestDateFrom =
      this.requestStartDate && this.requestStartDate != "Invalid Date"
        ? moment(this.requestStartDate).format("YYYY-MM-DD")
        : null;
    this.arg.requestDateTo =
      this.requestEndDate && this.requestEndDate != "Invalid Date"
        ? moment(this.requestEndDate).format("YYYY-MM-DD")
        : null;
    this.arg.realizeDateFrom =
      this.realizeStartDate && this.realizeStartDate != "Invalid Date"
        ? moment(this.realizeStartDate).format("YYYY-MM-DD")
        : null;
    this.arg.realizeDateTo =
      this.realizeEndDate && this.realizeEndDate != "Invalid Date"
        ? moment(this.realizeEndDate).format("YYYY-MM-DD")
        : null;
    this.arg.clearanceDateFrom =
      this.clearanceStartDate && this.clearanceStartDate != "Invalid Date"
        ? moment(this.clearanceStartDate).format("YYYY-MM-DD")
        : null;
    this.arg.clearanceDateTo =
      this.clearanceEndDate && this.clearanceEndDate != "Invalid Date"
        ? moment(this.clearanceEndDate).format("YYYY-MM-DD")
        : null;
  }

  columns = [
    { field: "VBNo", title: "No. VB" },
    {
      field: "Date",
      title: "Tanggal VB",
      // , formatter: function (value, data, index) {
      //     return moment.utc(value).local().format('DD MMM YYYY');
      // },
    },
    {
      field: "DateEstimate",
      title: "Estimasi Tanggal Realisasi",
      // , formatter: function (value, data, index) {
      //     return moment.utc(value).local().format('DD MMM YYYY');
      // },
    },
    { field: "Unit.Name", title: "Unit" },
    { field: "CreateBy", title: "Pemohon VB" },
    {
      field: "ApprovalDate",
      title: "Tanggal Approval",
      // , formatter: function (value, data, index) {
      //     return moment.utc(value).local().format('DD MMM YYYY');
      // },
    },
    { field: "RealizationNo", title: "No. Realisasi" },
    {
      field: "RealizationDate",
      title: "Tanggal Realisasi",
      // , formatter: function (value, data, index) {
      //     return moment.utc(value).local().format('DD MMM YYYY');
      // },
    },
    {
      field: "Usage",
      title: "Keperluan VB",
      formatter: function (value, data, index) {
        if (data.IsInklaring) return "Inklaring - " + data.NoBL;
        return value;
      },
    },
    { field: "Aging", title: "Aging (hari)" },
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "Amount",
      title: "Jumlah VB",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "RealizationAmount",
      title: "Realisasi",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "Difference",
      title: "Sisa (+/-)",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "ClearenceDate",
      title: "Tanggal Penerimaan Kasir",
      // , formatter: function (value, data, index) {
      //     return moment.utc(value).local().format('DD MMM YYYY');
      // },
    },
    { field: "Status", title: "Status" },
  ];

  loader = (info) => {
    var order = {};

    if (info.sort) order[info.sort] = info.order;

    this.arg = {
      // page: parseInt(info.offset / info.limit, 10) + 1,
      // size: info.limit,
      keyword: info.search,
      // order: order,
    };

    this.currencies = this.currencies.splice(0, this.currencies.length);

    return this.listDataFlag
      ? (this.setValue(),
        this.service.getReport(this.arg).then((result) => {
          if (
            result.data &&
            result.data.VBStatusByCurrencyReport &&
            result.data.VBStatusByCurrencyReport.length > 0
          ) {
            this.currencies = result.data.VBStatusByCurrencyReport.map(
              (item) => ({
                CurrencyCode: item.CurrencyCode,
                Total: numeral(item.Total).format("0,000.00"),
              })
            );
          }
          return {
            data: result.data.VBStatusReport,
          };
        }))
      : { total: 0, data: {} };
  };

  columnsCurrency = [
    { header: "Mata Uang", value: "CurrencyCode" },
    { header: "Total", value: "Total" },
  ];

  reset() {
    this.selectedUnit = null;
    this.selectedVBRequest = null;
    this.selectedApplicant = null;
    this.selectedStatus = this.statusTypes[0];
    this.requestStartDate = null;
    this.requestEndDate = null;
    this.realizeStartDate = null;
    this.realizeEndDate = null;
    this.clearanceStartDate = null;
    this.clearanceEndDate = null;
    this.errorRequestStartDate = null;
    this.errorRequestEndDate = null;
    this.listDataFlag = false;
    this.table.refresh();
  }

  search() {
    if (this.requestStartDate == null || this.requestEndDate == null) {
      if (this.requestStartDate == null) {
        var textStart = "Tanggal Awal Request VB tidak boleh kosong";
        this.errorRequestStartDate = textStart;
      }
      if (this.requestEndDate == null) {
        var textEnd = "Tanggal Akhir Request VB tidak boleh kosong";
        this.errorRequestEndDate = textEnd;
      }
    } else {
      this.errorRequestStartDate = null;
      this.errorRequestEndDate = null;
      this.listDataFlag = true;
      this.table.refresh();
    }
  }

  exportToExcel() {
    this.setValue();
    this.service.generateExcel(this.arg);
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.dialog.show(DialogDetailView, { data: data.VbRequestDetail });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      default:
        return true;
    }
  }

  statusTypes = [
    { value: "ALL", label: "Semua" },
    { value: "CLEARANCE", label: "Clearance" },
    { value: "OUTSTANDING", label: "Outstanding" },
    { value: "CANCEL", label: "Cancel" },
  ];

  get vbRequestAllLoader() {
    return VbRequestAllLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }

  get accountLoader() {
    return AccountLoader;
  }
}
