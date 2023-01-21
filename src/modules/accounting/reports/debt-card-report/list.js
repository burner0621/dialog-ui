import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import moment from 'moment';

var suppLoader = require('../../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../../loader/currency-loader');
@inject(Service)
export class List {
  itemYears = [];
  itempaymentMethod = ['','DAN LIRIS', 'T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.flag = false;
    this.today = new Date();
    this.error = {};
    this.itemMonths = [
      { text: 'January', value: 1 },
      { text: 'February', value: 2 },
      { text: 'March', value: 3 },
      { text: 'April', value: 4 },
      { text: 'May', value: 5 },
      { text: 'June', value: 6 },
      { text: 'July', value: 7 },
      { text: 'August', value: 8 },
      { text: 'September', value: 9 },
      { text: 'October', value: 10 },
      { text: 'November', value: 11 },
      { text: 'Desember', value: 12 }
    ];

    this.currentYear = moment().format('YYYY');

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }
  bind(context) {
    this.context = context;
    console.log(context);
  }
  searching() {
    let validationError = false;

    if (!this.supplier || this.supplier.name == null) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!this.currency || this.currency.Code == null) {
      this.error.currency = "Mata Uang harus diisi";
      validationError = true;
    }

    let args = {
      month: this.info.month.value,
      year: this.info.year,
      supplierCode: this.supplier ? this.supplier.code : "",
      suppliername: this.supplier ? this.supplier.name : "",
      currencyCode: this.currency ? this.currency.Code : "",
      paymentMethod: this.pymntMethod ? this.pymntMethod : ""
    }
    if (!validationError) {
      this.error = {};
      this.service.search(args)
        .then(result => {
          for (var _data of result) {
            _data.TotalDebit = _data.TotalDebit == null ? 0 : _data.TotalDebit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.TotalIDRDebit = _data.TotalIDRDebit == null ? 0 : _data.TotalIDRDebit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.TotalKredit = _data.TotalKredit == null ? 0 :_data.TotalKredit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.TotalIDRKredit = _data.TotalIDRKredit == null ? 0 :_data.TotalIDRKredit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.TotalEndingBalance = _data.TotalEndingBalance == null ? 0 :_data.TotalEndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.TotalIDREndingBalance = _data.TotalIDREndingBalance == null ? 0 :_data.TotalIDREndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            _data.DateDebit = _data.DateDebit == null || moment(_data.DateDebit).format("DD MMM YYYY") == "01 Jan 1970" ? "" : moment(_data.DateDebit).format("DD MMM YYYY");
            _data.DateKredit = _data.DateKredit == null || moment(_data.DateKredit).format("DD MMM YYYY") == "01 Jan 1970" ? "" : moment(_data.DateKredit).format("DD MMM YYYY");
            _data.TotalDebit = _data.TotalDebit == 0 ? "" : _data.TotalDebit
            _data.TotalIDRDebit = _data.TotalIDRDebit == 0 ? "" : _data.TotalIDRDebit
            _data.TotalKredit = _data.TotalKredit == 0 ? "" : _data.TotalKredit
            _data.TotalIDRKredit = _data.TotalIDRKredit == 0 ? "" : _data.TotalIDRKredit
            _data.TotalEndingBalance = _data.TotalEndingBalance == 0 ? "" : _data.TotalEndingBalance
            _data.TotalIDREndingBalance = _data.TotalIDREndingBalance == 0 ? "" : _data.TotalIDREndingBalance
          }
        
          this.data = result
        })
      }
  }

  get supplierLoader() {
    return suppLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  supplierView = (supplier) => {
    if (!supplier.code)
      return `${supplier.Code} - ${supplier.Name}`
    else
      return `${supplier.code} - ${supplier.name}`
  }
  currencyView = (currency) => {
    if (!currency.code)
      return `${currency.Code}`
    else
      return `${supplier.code}`
  }

  ExportToExcel() {
    let validationError = false;

    if (!this.supplier || this.supplier.name == null) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }


    if (!validationError) {
      let args = {
        month: this.info.month.value,
        year: this.info.year,
        supplierCode: this.supplier ? this.supplier.code : "",
        suppliername: this.supplier ? this.supplier.name : "",
        currencyCode: this.currency ? this.currency.Code : "",
        currencyName: this.currency ? this.currency.Description : "",
        paymentMethod: this.pymntMethod ? this.pymntMethod : ""
      };

      this.service.generateExcel(args)
        .catch(e => {
          alert(e.replace(e, "Error:", ""));
        });
    }
  }

  reset() {
    this.currency = null,
    this.supplier = null,
    this.info.year = moment().format("YYYY");
    this.info.month = { text: 'January', value: 1 };
  }



}
