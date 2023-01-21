import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/garment-supplier-loader");

@inject(Service)
export class List {
  columns = [
    [
      {field: "index", title: "No", rowspan: 2 },
       { field: "buyerCode", title: "Kode", rowspan: 2 },
      
      { field: "buyerName", title: "Nama Buyer", rowspan: 2 },
      
      {
        field: "endBalance", title: "Saldo Akhir", rowspan: 2, align: "right", formatter: function (value, data, index) {
          return numeral(value).format("0,000.00");
        }
      }
       
         ],
    [
     
    ]
  ];

  itemYears = [];
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
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
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

    this.info.month = { text: "January", value: 1 };
    this.info.year = this.currentYear;
    this.type = "";

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  

  loader = (info) => {

    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;

    let params = {
      
      month: this.info.month.value,
      year: this.info.year,
      type: "" 
    };


    return this.flag
      ? this.service.search(params).then((result) => {

          console.log(result.data.Result);
        return {
          total: result.data.Result.length,
          data: result.data.Result
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
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;

    let params = {
      month: this.info.month.value,
      year: this.info.year,
       type: "end"   
    };

    this.service.getXls(params);

  }

  reset() {
    this.flag = false;
   
    this.data = [];
    this.tableList.refresh();
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };
  }
}
