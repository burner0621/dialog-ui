import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import { data } from "jquery";

var CategoryLoader = require("../../../../loader/category-loader");
var DivisionLoader = require("../../../../loader/division-loader");
// var UnitLoader = require('../../../loader/unit-loader');
// var AccountingCategoryLoader = require('../../../loader/accounting-category-loader');
var AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");
// var UnitReceiptNoteLoader = require('../../../loader/unit-receipt-note-basic-loader');

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

  // columns = [{
  //         field: 'DispositionDate',
  //         title: 'Tgl Disposisi',
  //         formatter: function(value, data, index) {
  //             return moment(value).format("DD MMM YYYY");
  //         }
  //     },
  //     { field: 'DispositionNo', title: 'No Disposisi' },
  //     { field: 'URNNo', title: 'No SPB' },
  //     { field: 'UPONo', title: 'No BP' },
  //     { field: 'InvoiceNo', title: 'No Invoice' },
  //     { field: 'SupplierName', title: 'Supplier' },
  //     { field: 'CategoryName', title: 'Kategori' },
  //     { field: 'AccountingUnitName', title: 'Unit' },
  //     {
  //         field: 'PaymentDueDate',
  //         title: 'Jatuh Tempo',
  //         formatter: function(value, data, index) {
  //             return moment(value).format("DD MMM YYYY");
  //         }
  //     },
  //     { field: 'CurrencyCode', title: 'Currency' },
  //     {
  //         field: 'Total',
  //         title: 'Saldo',
  //         formatter: function(value, data, index) {
  //             return numeral(value).format('0,000.00');
  //         },
  //         align: "right"
  //     }
  // ];

  columnsUnitValas = [
    { header: "Unit", value: "Unit" },
    { header: "Currency", value: "CurrencyCode" },
    { header: "Total", value: "Total" },
  ];

  columnsUnit = [
    { header: "Unit", value: "Unit" },
    { header: "Total (IDR)", value: "Total" },
  ];

  columnsCurrency = [
    { header: "Currency", value: "CurrencyCode" },
    { header: "Total", value: "Total" },
  ];

  columnsCategory = [
    {header : "Category", value: "CategoryName"},
    {header: "Total", value:"Total"},
  ];

  columnsCategoryValas = [
    {header : "Category", value: "CategoryName"},
    {header :"Currency", value: "CurrencyCode"},
    {header: "Total", value:"Total"},
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.data = [];
    this.isEmpty = true;
  }

  titles = ["Lokal", "Lokal Valas", "Import"];

  activeTitle = "Lokal";
  isValas = false;
  isImport = false;
  unitSummary = [];
  currencySummary = [];
  categorySummary = [];

  bind() {}

  changeTable(title) {
    // console.log(title);
    this.isSearch = false;
    if (title !== this.activeTitle) {
      this.activeTitle = title;
      this.unitSummary = [];
      this.currencySummary = [];
      this.categorySummary = [];
      this.data = [];
      this.isEmpty = true;
      this.division = null;
      this.category = null;
      this.accountingUnit = null;
      this.dateTo = null;
      this.isSearch = false;

      switch (title) {
        case "Lokal":
          this.isValas = false;
          this.isImport = false;
          break;
        case "Lokal Valas":
          this.isValas = true;
          this.isImport = false;
          break;
        case "Import":
          this.isValas = false;
          this.isImport = true;
          break;
        default:
          isValas = false;
          isImport = false;
          break;
      }

      // this.tableList.refresh();
    }
  }

  async search() {
    // this.isSearch = true;
    // this.tableList.refresh();
    let unitSummary = [];
    let currencySummary = [];
    let categorySummary = [];

    let arg = {
      categoryId: this.category ? this.category._id : 0,
      accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
      divisionId: this.division ? this.division.Id : 0,
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      isValas: this.isValas,
      isImport: this.isImport,
    };

    this.data = await this.service.search(arg).then((result) => {
      console.log(result);
      //<!--Todo--!>
      if (result && result.AccountingUnitSummaries.length > 0)
        for (let data of result.AccountingUnitSummaries)
          unitSummary.push({
            // Unit: item.Unit,
            Unit: unitSummary.some((x) => x.Unit === data.AccountingUnitName)
              ? ""
              : data.AccountingUnitName,
            CurrencyCode: data.CurrencyCode,
            Total: numeral(data.SubTotal).format("0,000.00"),
          });

      if (result && result.CurrencySummaries.length > 0)
        result.CurrencySummaries.map((data) =>
          currencySummary.push({
            CurrencyCode: data.CurrencyCode,
            Total: numeral(data.SubTotal).format("0,000.00"),
          })
        );

        if (result && result.CategorySummaries.length > 0)
        result.CategorySummaries.map((data) =>
          categorySummary.push({            
            CategoryName: categorySummary.some((x) => x.CategoryName === data.CategoryName)?
            ""
            :data.CategoryName,
            //CategoryName: data.CategoryName,
            CurrencyCode :data.CurrencyCode,
            Total: numeral(data.SubTotal).format("0,000.00"),
          })
        );

      let viewDataSet = [];
      let categoryDataSet = [];
      let key = 0;
      let dataCount = result.Reports.length;
      for (let data of result.Reports) {
        viewDataSet.push({
          UPODate: data.UPODate
            ? moment.utc(data.UPODate).local().format("DD MMM YYYY")
            : "-",
          UPONo: data.UPONo,
          URNNo: data.URNNo,
          InvoiceNo: data.InvoiceNo,
          SupplierName: data.SupplierName,
          CategoryName: data.CategoryName,
          AccountingUnitName: data.AccountingUnitName,
          DueDate: data.DueDate
            ? moment.utc(data.DueDate).local().format("DD MMM YYYY")
            : "-",
          CurrencyCode: data.CurrencyCode,
          Total: numeral(data.Total).format("0,000.00"),
        });

        let indexCategoryDataSet = categoryDataSet.findIndex(
          (x) => x.CurrencyCode === data.CurrencyCode
        );
        let nextData = result.Reports.slice(key + 1, key + 2)[0];

        if (
          (nextData && nextData.CategoryId != data.CategoryId) ||
          key == dataCount - 1
        ) {
          if (indexCategoryDataSet >= 0)
            categoryDataSet[indexCategoryDataSet].Total += data.Total;
          else
            categoryDataSet.push({
              TotalCategoryByCurrency: "JUMLAH",
              CurrencyCode: data.CurrencyCode,
              Total: data.Total,
            });

          for (let dataTobePush of categoryDataSet) {
            dataTobePush.Total = numeral(dataTobePush.Total).format("0,000.00");

            viewDataSet.push(dataTobePush);
          }

          categoryDataSet = [];
        } else {
          if (indexCategoryDataSet >= 0)
            categoryDataSet[indexCategoryDataSet].Total += data.Total;
          else
            categoryDataSet.push({
              TotalCategoryByCurrency: "JUMLAH",
              CurrencyCode: data.CurrencyCode,
              Total: data.Total,
            });
        }
        key++;
      }

      this.isEmpty = dataCount > 0 ? false : true;
      this.unitSummary = unitSummary;
      this.categorySummary = categorySummary;
      this.currencySummary = currencySummary;
      // console.log(this.isEmpty);
      return viewDataSet;
    });
    // console.log(this.data);
  }

  reset() {
    this.isEmpty = true;
    this.division = null;
    this.category = null;
    this.accountingUnit = null;
    this.dateTo = null;
    this.isSearch = false;
    this.data = [];
    this.unitSummary = [];
    this.categorySummary = [];
    this.currencySummary = [];
    // this.tableList.refresh();
  }

  getExcel() {
    let arg = {
      categoryId: this.category ? this.category._id : 0,
      accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
      divisionId: this.division ? this.division.Id : 0,
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      isValas: this.isValas,
      isImport: this.isImport,
    };

    return this.service.generateExcel(arg).catch((e) => {
      alert(e.replace(e, "Error: ", ""));
    });
  }

  getPdf() {
    let arg = {
      categoryId: this.category ? this.category._id : 0,
      accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
      divisionId: this.division ? this.division.Id : 0,
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      isValas: this.isValas,
      isImport: this.isImport,
    };

    return this.service.generatePdf(arg).catch((e) => {
      alert(e.replace(e, "Error: ", ""));
    });
  }

  get categoryLoader() {
    return CategoryLoader;
  }

  categoryView = (CategoryLoader) => {
    return `${CategoryLoader.code} - ${CategoryLoader.name}`;
  };

  get divisionLoader() {
    return DivisionLoader;
  }

  // get unitLoader() {
  //     return UnitLoader;
  // }

  // get accountingCategoryLoader() {
  //     return AccountingCategoryLoader;
  // }

  // accountingCategoryView = (AccountingCategoryLoader) => {
  //     return `${AccountingCategoryLoader.Code} - ${AccountingCategoryLoader.Name}`
  // }

  get accountingUnitLoader() {
    return AccountingUnitLoader;
  }
  accountingUnittView = (accountingUnit) => {
    return `${accountingUnit.Code} - ${accountingUnit.Name}`;
  };

  // loader = (info) => {
  //     let order = {};

  //     let arg = {
  //         categoryId: this.category ? this.category.Id : 0,
  //         accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
  //         divisionId: this.division ? this.division.Id : 0,
  //         dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
  //         isValas: this.isValas,
  //         isImport: this.isImport
  //     };

  //     this.unitSummary = this.unitSummary.splice(0, this.unitSummary.length);

  //     if (this.isSearch)
  //         return this.service.search(arg)
  //             .then(result => {
  //                     if (result && result.AccountingUnitSummaries.length > 0) {
  //                         this.unitSummary = result.AccountingUnitSummaries.map(
  //                             (item) => ({
  //                                 Unit: item.Unit,
  //                                 CurrencyCode: item.CurrencyCode,
  //                                 Total: numeral(item.SubTotal).format("0,000.00"),
  //                             })
  //                         );

  //                         return {
  //                             total: result.Reports.length,
  //                             data: result.Reports
  //                         }
  //                     });
  //                 else
  //                     return {
  //                         total: 0,
  //                         data: []
  //                     }
  //             }
  // }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
