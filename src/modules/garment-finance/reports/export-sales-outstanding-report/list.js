import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import { Service } from "./service";

const BuyerLoader = require('../../../../loader/garment-buyers-loader');
@inject(Service)
export class List {
  columns = [
    [
      { field: "Index", title: "No", rowspan: 2 },
      { field: "TruckingDate", title: "Tanggal", rowspan: 2 },

      { field: "InvoiceNo", title: "No. Invoice", rowspan: 2 },

      {
        field: "Amount", title: "Amount", rowspan: 2, align: "right", formatter: function (value, data, index) {
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
    this.buyer = "";
    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }



  loader = (info) => {


    let params = {

      month: this.info.month.value,
      year: this.info.year,
      buyer: this.buyer.Code
    };


    return this.flag
      ? this.service.search(params).then((result) => {
        for (var _data of result.data) {
          _data.TruckingDate = _data.TruckingDate ? moment.utc(_data.TruckingDate).local().format('DD MMM YYYY') : "";
          if (_data.Index === 0) {
            _data.Index = "";
          }
        }
        return {
          total: result.data.length,
          data: result.data
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
      month: this.info.month.value,
      year: this.info.year,
      buyer: this.buyer.Code
    };

    this.service.getXls(params);

  }

  reset() {
    this.flag = false;

    this.data = [];
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };

  }
  get buyerLoader() {
    return BuyerLoader;
  }
  buyerView = (buyer) => {
    return `${buyer.Code} - ${buyer.Name}`;
  }
}
