import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

var CategoryLoader = require("../../../loader/category-loader");
var DivisionLoader = require("../../../loader/division-loader");
var UnitLoader = require("../../../loader/unit-loader");
var AccountingUnitLoader = require("../../../loader/accounting-unit-loader");

@inject(Router, Service)
export class List {
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  titles = ["Lokal", "Lokal Valas", "Impor"];

  activeTitle = "Lokal";
  changeTitle(title) {
    this.isSearch = false;
    if (title !== this.activeTitle) {
      this.activeTitle = title;
      // // this.selectedItems.splice(0, this.selectedItems.length);
      // // this.documentData.splice(0, this.documentData.length);
      // this.documentTable.refresh();
    }

    this.documentTable.refresh();
  }

  bind() {}

  changeTable(title) {}

  search() {
    this.isSearch = true;
    this.documentTable.refresh();
  }

  reset() {
    // console.log("reset");
    this.division = null;
    this.category = null;
    this.accountingUnit = null;
    this.dueDate = null;
    this.isSearch = false;
    this.documentTable.refresh();
  }

  xls() {
    // console.log("excel");
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };
    // console.log("pdf");

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.generateExcelLocal(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Lokal Valas":
        return this.service
          .generateExcelLocalForeignCurrency(arg)
          .then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
      case "Impor":
        return this.service.generateExcelImport(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
    }
  }

  pdf() {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };
    // console.log("pdf");

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.printPdfLocal(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Lokal Valas":
        return this.service.printPdfLocalForeignCurrency(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Impor":
        return this.service.printPdfImport(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
    }
  }

  columns = [
    { field: "CategoryName", title: "Kategori" },
    { field: "CurrencyCode", title: "Kurs" },
    {
      field: "DebtTotal",
      title: "Hutang",
      align: "right",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
    },
    {
      field: "Total",
      title: "Total",
      align: "right",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
    },
  ];

  get categoryLoader() {
    return CategoryLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  // get unitLoader() {
  //     return UnitLoader;
  // }

  get accountingUnitLoader() {
    return AccountingUnitLoader;
  }

  loader = (info) => {
    let order = {};

    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };

    // console.log(this.activeRole);
    // console.log(arg);

    // return this.service.search(arg)
    //     .then(result => {
    //         console.log(result);
    //         return {
    //             total: result.info.total,
    //             data: result.data
    //         }
    //     });

    if (this.isSearch) {
      switch (this.activeTitle) {
        case "Lokal":
          return this.service.searchLocal(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
        case "Lokal Valas":
          return this.service.searchLocalForeignCurrency(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
        case "Impor":
          return this.service.searchImport(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
      }
      return {
        total: 0,
        data: [],
      };
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  };
}
