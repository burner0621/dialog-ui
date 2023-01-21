import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/supplier-loader");
const DivisionLoader = require("../../../../loader/division-loader");

@inject(Service)
export class List {
  itemYears = [];
  supplierQuery = { Import: true };
  columns = [
    { field: "SupplierName", title: "Supplier" },
    { field: "DivisionName", title: "Divisi" },
    { field: "Currency", title: "Mata Uang" },
    // { field: 'Products', title: 'Nama Barang' },
    {
      field: "StartBalance",
      title: "Saldo Awal",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Purchase",
      title: "Pembelian",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Payment",
      title: "Pembayaran",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "FinalBalance",
      title: "Saldo Akhir",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
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
    pagination: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];

    this.itemMonths = [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 10 },
      { text: "November", value: 11 },
      { text: "Desember", value: 12 },
    ];
    this.currentYear = moment().format("YYYY");

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  supplierView = (supplier) => {
    return supplier.name;
  };

  divisionView = (division) => {
    return division.Name;
  };

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      order: order,
      select: [],
      isImport: true,
    };

    if (this.info.supplier && this.info.supplier.name)
      arg.supplierName = this.info.supplier.name;

    if (this.info.division && this.info.division.Id)
      arg.divisionId = this.info.division.Id;

    if (this.info.month && this.info.month.value)
      arg.month = this.info.month.value;

    if (this.info.year) arg.year = this.info.year;

    return this.flag
      ? this.service.search(arg).then((result) => {
        // let before = {};

        // if (result.data.length != 0) {
        //     for (let i in result.data) {
        //         if (result.data[i].Currency != before.Currency) {
        //             before = result.data[i];
        //             before._Currency_rowspan = 1;
        //         } else {
        //             before._Currency_rowspan++;

        //             result.data[i].Currency = undefined;
        //         }
        //         result.data[i].Products = result.data[i].Products || "";
        //     }
        // }
        // setTimeout(() => {
        //     $('#credit-balance-table td').each(function () {
        //         if ($(this).html() === '-')
        //             $(this).hide();
        //     })
        // }, 10);

        return {
          total: result.info.Count,
          data: result.data,
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    if (false) {
      alert("");
    } else {
      let order = {};

      let arg = {
        isImport: true,
      };

      if (this.info.supplier && this.info.supplier.name)
        arg.supplierName = this.info.supplier.name;

      if (this.info.division && this.info.division.Id)
        arg.divisionId = this.info.division.Id;

      if (this.info.month && this.info.month.value)
        arg.month = this.info.month.value;

      if (this.info.year) arg.year = this.info.year;

      this.service.search(arg).then((result) => {
        this.data = result.data;
      });
    }
  }

  searching() {
    if (false) {
      alert("");
    } else {
      var info = {
        no: this.no ? this.no : "",
        category: this.category ? this.category.code : "",
        unit: this.unit ? this.unit.Code : "",
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };
      this.service.search(info).then((result) => {
        this.data = result;
      });
    }
  }

  excel() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;
    else this.info.supplierName = null;

    if (this.info.division && this.info.division.Id)
      this.info.divisionId = this.info.division.Id;
    else this.info.divisionId = null;

    // this.flag = true;
    // this.tableList.refresh();

    let params = {
      supplierName: this.info.supplierName,
      divisionId: this.info.divisionId,
      month: this.info.month.value,
      year: this.info.year,
      isImport: true,
    };

    this.service.getXls(params);

    // this.getExcelData();
  }

  pdf() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;
    else this.info.supplierName = null;

    if (this.info.division && this.info.division.Id)
      this.info.divisionId = this.info.division.Id;
    else this.info.divisionId = null;

    // this.flag = true;
    // this.tableList.refresh();

    let params = {
      supplierName: this.info.supplierName,
      divisionId: this.info.divisionId,
      month: this.info.month.value,
      year: this.info.year,
      isImport: true,
    };

    this.service.getPdf(params);

    // this.getExcelData();
  }

  viewDetail(data) {
    window.open(`${window.location.origin}/#/expedition/reports/import-credit-balance/detail/${data.SupplierCode}/${data.DivisionId}/${this.info.month.value}/${this.info.year}`);
  }

  downloadExcelDetail(data) {

    let supplierCode = "";
    let divisionId = 0;

    if (this.info.supplier)
      supplierCode = this.info.supplier.code;

    if (this.info.division)
      divisionId = this.info.division.Id;

    let params = {
      supplierCode: supplierCode,
      divisionId: divisionId,
      month: this.info.month.value,
      year: this.info.year
    }

    this.service.getXlsDetail(params);
  }

  reset() {
    this.flag = false;
    this.info.supplier = null;
    this.info.division = null;
    this.error = {};
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };
    this.tableList.refresh();
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}
