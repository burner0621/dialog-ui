import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
// import XLSX from "xlsx";
import { Service } from "./service";
const BankLoader = require("../../../../loader/account-banks-loader");

@inject(Service)
export class List {
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  divisionOptions = ["", "Garment", "Textile"];

  monthList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  yearList = [];

  columns = [
    { field: "BankName", title: "Nama Bank" },
    { field: "AccountNumber", title: "Nomor Rekening" },
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "Debit",
      title: "Debit",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Credit",
      title: "Kredit",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Balance",
      title: "Saldo",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
  ];

  currencyColumns = [
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "Debit",
      title: "Debit",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Credit",
      title: "Kredit",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
    {
      field: "Balance",
      title: "Saldo",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "0";
      },
      align: "right",
    },
  ];

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    pagination: false,
  };

  @bindable currencyData;
  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.initialBalance = "";
    this.closingBalance = "";

    // let dateNow = new Date();
    // this.monthNow = dateNow.getMonth();
    // this.info.month = this.monthList[this.monthNow];

    // this.yearNow = dateNow.getFullYear();
    // this.info.year = this.yearNow;
    // for (var i = this.yearNow - 3; i <= this.yearNow; i++) {
    //     this.yearList.push(i);
    // }
  }

  bankView = (bank) => {
    return bank.AccountName
      ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}`
      : "";
  };

  validate() {
    if (
      this.info.startDate == "Invalid Date" ||
      !this.info.startDate ||
      this.info.endDate == "Invalid Date" ||
      !this.info.endDate
    ) {
      if (this.info.startDate == "Invalid Date" || !this.info.startDate)
        this.error.startDate = "Tanggal awal harus diisi";

      if (this.info.endDate == "Invalid Date" || !this.info.endDate)
        this.error.endDate = "Tanggal akhir harus diisi";

      return false;
    } else {
      this.error = {};
      return true;
    }
  }

  currencyLoader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      order: order,
      select: [],
    };

    if (this.info.bank && this.info.bank.Id) arg.bankId = this.info.bank.Id;

    if (this.info.startDate && this.info.startDate != "Invalid Date")
      arg.startDate = moment(this.info.startDate).format("MM/DD/YYYY");

    if (this.info.endDate && this.info.endDate != "Invalid Date")
      arg.endDate = moment(this.info.endDate).format("MM/DD/YYYY");

    if (this.info.divisionName) {
      arg.divisionName = this.info.divisionName === "Garment" ? "G" : "T";
    }

    // if (!this.flag) {
    //     this.currencyData = { total: 0, data: [] };

    // }

    return this.flag
      ? this.service.searchCurrency(arg).then((result) => {
          // this.error = {}

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

          // console.log(result)
          // this.currencyData = {
          //     data: result.data.CurrencyReports
          // }
          return {
            // total: result.info.Count,
            data: result.data,
          };
        })
      : Promise.resolve({ total: 0, data: [] });
  };

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      order: order,
      select: [],
    };

    if (this.info.bank && this.info.bank.Id) arg.bankId = this.info.bank.Id;

    if (this.info.startDate && this.info.startDate != "Invalid Date")
      arg.startDate = moment(this.info.startDate).format("MM/DD/YYYY");

    if (this.info.endDate && this.info.endDate != "Invalid Date")
      arg.endDate = moment(this.info.endDate).format("MM/DD/YYYY");

    if (this.info.divisionName) {
      arg.divisionName = this.info.divisionName === "Garment" ? "G" : "T";
    }

    // if (!this.flag) {
    //     this.currencyData = { total: 0, data: [] };

    // }

    return this.flag
      ? this.service.search(arg).then((result) => {
          // this.error = {}

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

          // console.log(result)
          // this.currencyData = {
          //     data: result.data.CurrencyReports
          // }
          return {
            // total: result.info.Count,
            data: result.data,
          };
        })
      : Promise.resolve({ total: 0, data: [] });
  };

  search() {
    this.error = {};
    this.flag = this.validate();
    this.tableList.refresh();
    this.currencyTableList.refresh();
  }

  excel() {
    // if (this.info.dateFrom == 'Invalid Date')
    //     this.info.dateFrom = undefined;
    // if (this.info.dateTo == 'Invalid Date')
    //     this.info.dateTo = undefined;
    // if (this.info.bank && this.info.bank.Id)
    //     this.info.bankId = this.info.bank.Id;

    // let validationError = false;

    // if (this.info && (!this.info.bank || this.info.bank.Id == null)) {
    //     this.error.bank = "Bank harus diisi";
    //     validationError = true;
    // }

    let validationError = !this.validate();

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let divisionName;
      if (this.info.divisionName) {
        divisionName = this.info.divisionName === "Garment" ? "G" : "T";
      }

      let params = {
        bankId: this.info.bank ? this.info.bank.Id : 0,
        startDate: moment(this.info.startDate).format("MM/DD/YYYY"),
        endDate: moment(this.info.endDate).format("MM/DD/YYYY"),
        divisionName,
      };

      this.service.getXls(params);
    }
    // this.getExcelData();
  }

  reset() {
    this.error = {};
    this.isEmpty = true;
    // this.flag = false;
    this.info = {};
    this.currency = "";
    this.initialBalance = "";
    this.closingBalance = "";
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
    this.currencyTableList.refresh();
  }

  get bankLoader() {
    return BankLoader;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
