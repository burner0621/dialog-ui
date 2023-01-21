import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import { Service } from "./service";

const DivisionLoader = require("../../../loader/division-loader");
const VBRealizationLoader = require("../loaders/vb-realization-all-loader");
const VBRequestLoader = require("../loaders/vb-request-loader");
const AccountLoader = require("../loaders/account-loader");
const UnitLoader = require("../loaders/unit-loader");

@inject(Service)
export class List {
  statusOptions = ["Unit", "Verifikasi", "Kasir", "Retur", "Semua"];

  columns = [
    { field: "VBNo", title: "No VB" },
    { field: "VBRealizationNo", title: "No Realisasi VB" },
    { field: "VBRequestName", title: "Nama" },
    { field: "UnitName", title: "Bagian/Unit" },
    { field: "DivisionName", title: "Divisi" },
    {
      field: "SendToVerificationDate",
      title: "Tanggal Unit Kirim",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD/MM/YYYY") : "-";
      },
    },
    { field: "Purpose", title: "Keperluan" },
    { field: "RemarkRealization", title: "Ket" },
    { field: "CurrencyCode", title: "Mata Uang VB" },
    { field: "VBAmount", title: "Nominal VB" },
    { field: "CurrencyCode", title: "Mata Uang Realisasi" },
    { field: "VBRealizationAmount", title: "Nominal Realisasi" },
    {
      field: "VerificationReceiptDate",
      title: "Tanggal Terima Verifikasi",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD/MM/YYYY") : "-";
      },
    },
    {
      field: "Position",
      title: "Nama Verifikator",
      formatter: function (value, data, index) {
        // console.log(index);
        // console.log(data);
        if (value >= 4 && value != 6) return data.VerifiedToCashierBy;
        else if (value == 6) return data.NotVerifiedBy;
        else return "-";
      },
    },
    {
      field: "VerifiedToCashierDate",
      title: "Tanggal Kirim Kasir/Retur",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD/MM/YYYY") : "-";
      },
    },
    { field: "SalesReceiptNo", title: "Keterangan" },
    {
      field: "CashierReceiptDate",
      title: "Tanggal Terima Kasir",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD/MM/YYYY") : "-";
      },
    },
    // {
    //     field: 'SalesReceiptDate', title: 'Mata Uang VB',
    //     formatter: function (value, data, index) {
    //         return value ? moment(value).format('DD/MM/YYYY') : '-';
    //     },
    // },
    // // { field: 'Products', title: 'Nama Barang' },
    // {
    //     field: 'TotalPaid', title: 'Jumlah Pembayaran', formatter: function (value, data, index) {
    //         return value ? numeral(value).format('0,0') : '0';
    //     }
    // },
    // { field: 'CurrencyCode', title: 'Mata Uang' },
    // { field: 'Buyer', title: 'Buyer' },
  ];

  columns2 = [
    { field: "VBNo", title: "No. VB" },
    { field: "VBRealizationNo", title: "No. Realisasi VB" },
    {
      field: "VBType",
      title: "Tipe VB",
      formatter: function (value, data, index) {
        return value == 1 ? "Dengan PO" : "Tanpa PO";
      },
    },
    { field: "VBRequestName", title: "Nama" },
    { field: "UnitName", title: "Bagian/Unit" },
    { field: "DivisionName", title: "Divisi" },
    {
      field: "SendToVerificationDate",
      title: "Tanggal Unit Kirim",
      formatter: function (value, data, index) {
        return value ? moment.utc(value).local().format("DD MMM YYYY") : "-";
      },
    },
    { field: "Purpose", title: "Keperluan" },
    { field: "RemarkRealization", title: "Keterangan Realisasi" },
    { field: "CurrencyCode", title: "Mata Uang VB" },
    {
      field: "VBAmount",
      title: "Nominal VB",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "CurrencyCode", title: "Mata Uang Realisasi" },
    {
      field: "VBRealizationAmount",
      title: "Nominal Realisasi",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "VBRealizationDate",
      title: "Tanggal Realisasi",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    {
      field: "VerificationReceiptDate",
      title: "Tanggal Verif Terima",
      formatter: function (value, data, index) {
        return value ? moment.utc(value).local().format("DD MMM YYYY") : "-";
      },
    },
    {
      field: "Position",
      title: "Nama Verifikator",
      formatter: function (value, data, index) {
        // console.log(index);
        // console.log(data);
        if (value >= 4 && value != 6) return data.VerifiedToCashierBy;
        else if (value == 6) return data.NotVerifiedBy;
        else return "-";
      },
    },
    {
      field: "VerifiedToCashierDate",
      title: "Tanggal Verif Kirim Kasir/Retur",
      formatter: function (value, data, index) {
        return value
          ? moment.utc(value).local().format("DD MMM YYYY")
          : data.NotVerifiedDate
            ? moment.utc(data.NotVerifiedDate).local().format("DD MMM YYYY")
            : "-";
      },
    },
    {
      field: "Position",
      title: "Posisi",
      formatter: (value, data, index) => {
        switch (value) {
          case 1:
            return "Pembelian";
          case 2:
            return "Penyerahan Ke Verifikasi";
          case 3:
            return "Verifikasi";
          case 4:
            return "Verifikasi Ke Kasir";
          case 5:
            return "Kasir";
          case 6:
            return "Retur";
        }
      },
    },
    { field: "NotVerifiedReason", title: "Keterangan (Retur)" },
    {
      field: "CashierReceiptDate",
      title: "Tanggal Kasir Terima",
      formatter: function (value, data, index) {
        return value ? moment.utc(value).local().format("DD MMM YYYY") : "-";
      },
    },
  ];

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
    pagination: true,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
  }

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      // keyword: info.search,
      order: order,
    };

    if (this.info.vbRequest && this.info.vbRequest.Id)
      arg.vbId = this.info.vbRequest.Id;

    if (this.info.vbRealization && this.info.vbRealization.Id)
      arg.vbRealizationId = this.info.vbRealization.Id;

    if (this.info.account && this.info.account.username)
      arg.vbRequestName = this.info.account.username;

    if (this.info.unit && this.info.unit.Id) arg.unitId = this.info.unit.Id;

    if (this.info.dateFrom)
      arg.dateStart = moment(this.info.dateFrom).format("YYYY-MM-DD");

    if (this.info.dateTo)
      arg.dateEnd = moment(this.info.dateTo).format("YYYY-MM-DD");

    if (this.info.division && this.info.division.Id)
      arg.divisionId = this.info.division.Id;

    arg.status = this.info.status;

    return this.flag
      ? this.service.search(arg).then((result) => {
        return {
          total: result.info.total,
          data: result.data,
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {
    let params = {
      vbId: this.info.vbRequest && this.info.vbRequest.Id,
      vbRealizationId: this.info.vbRealization && this.info.vbRealization.Id,
      vbRequestName: this.info.account && this.info.account.username,
      unitId: this.info.unit && this.info.unit.Id,
      divisionId: this.info.division && this.info.division.Id,
      dateStart:
        (this.info.dateFrom &&
          moment(this.info.dateFrom).format("YYYY-MM-DD")) ||
        undefined,
      dateEnd:
        (this.info.dateTo && moment(this.info.dateTo).format("YYYY-MM-DD")) ||
        undefined,
      status: this.info.status,
    };

    // console.log(params);

    this.service.getXls(params);

    // this.getExcelData();
  }

  reset() {
    this.flag = false;

    this.error = {};
    this.info.vbRequest = undefined;
    this.info.vbRealization = undefined;
    this.info.account = undefined;
    this.info.unit = undefined;
    this.info.status = "Semua";
    this.info.dateFrom = undefined;
    this.info.dateTo = undefined;
    this.info.division = 0;
    this.selectedDivision = null;
    this.tableList.refresh();
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  @bindable selectedDivision;
  selectedDivisionChanged(newValue, oldValue) {
    if (newValue) this.info.divisionId = newValue.Id;
    else this.info.divisionId = 0;
  }

  get vbRequestLoader() {
    return VBRequestLoader;
  }

  get vbRealizationLoader() {
    return VBRealizationLoader;
  }

  get accountLoader() {
    return AccountLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }
}
