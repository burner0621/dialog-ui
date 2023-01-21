import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
// const SupplierLoader = require('../../../../loader/supplier-loader');
const AccountingBookLoader = require("../../../../loader/accounting-book-loader");

@inject(Service)
export class List {
  itemYears = [];

  yearOptions = [];

  monthOptions = [
    { text: "Januari", value: 1 },
    { text: "Februari", value: 2 },
    { text: "Maret", value: 3 },
    { text: "April", value: 4 },
    { text: "Mei", value: 5 },
    { text: "Juni", value: 6 },
    { text: "Juli", value: 7 },
    { text: "Agustus", value: 8 },
    { text: "September", value: 9 },
    { text: "Oktober", value: 10 },
    { text: "November", value: 11 },
    { text: "Desember", value: 12 },
  ];

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];

    this.isEmpty = true;
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.isValas = false;
  }

  async bind() {
    this.info.month = this.monthOptions[new Date().getMonth()];
    this.info.year = new Date().getFullYear();
    for (var i = this.info.year; i > 2010; i--) {
      this.yearOptions.push(i);
    }
  }

  async search() {
    this.totalCredit = 0;
    this.totalDebit = 0;

    let arg = {
        year: this.info.year,
        month: this.info.month.value
    };
    
    if (this.info.AccountingBook){
      arg.accountingBookId = this.info.AccountingBook.Id;
      
      if(this.info.AccountingBook.Type.toLowerCase() == 'pembelian lokal'){
        arg.valas = this.isValas;
      }
    }

    this.data = await this.service.search(arg).then((result) => {
      if (result.data.length == 0) this.isEmpty = true;
      else this.isEmpty = false;

      return result.data.map(x => {
          this.totalCredit += Number.parseInt(x.CreditNominal);
          this.totalDebit += Number.parseInt(x.DebitNominal);
        
          x.MemoGarmentPurchasing.MemoDate = x.MemoGarmentPurchasing.MemoDate ? moment(x.MemoGarmentPurchasing.MemoDate).format('DD MMM YYYY') : "-";
          x.DebitNominal = x.DebitNominal ? numeral(x.DebitNominal).format('0,0.0000') : '0';
          x.CreditNominal = x.CreditNominal ? numeral(x.CreditNominal).format('0,0.0000') : '0';
          x.MemoGarmentPurchasing.Remarks = x.MemoGarmentPurchasing.Remarks ? x.MemoGarmentPurchasing.Remarks : '-'; 
          return x;
      });
    });

    this.totalCredit = numeral(this.totalCredit).format('0,0.0000');
    this.totalDebit = numeral(this.totalDebit).format('0,0.0000');
  }

  excel() {
    let arg = {
        year: this.info.year,
        month: this.info.month.value
    };
    
    if (this.info.AccountingBook){
      arg.accountingBookId = this.info.AccountingBook.Id;
      arg.accountingBookType = this.info.AccountingBook.Type;
      
      if(this.info.AccountingBook.Type.toLowerCase() == 'pembelian lokal'){
        arg.valas = this.isValas;
      }
    }

    this.service.getXls(arg);
  }

  pdf() {
    let arg = {
        year: this.info.year,
        month: this.info.month.value
    };
    
    if (this.info.AccountingBook) {
      arg.accountingBookId = this.info.AccountingBook.Id;
      arg.accountingBookType = this.info.AccountingBook.Type;
      
      if(this.info.AccountingBook.Type.toLowerCase() == 'pembelian lokal'){
        arg.valas = this.isValas;
      }
    }

    this.service.getPdf(arg);
  }

  reset() {
    this.error = {};
    this.info.year = new Date().getFullYear();
    this.info.month = this.monthOptions[new Date().getMonth()].value;
    this.info.AccountingBook = undefined;
    this.isEmpty = true;
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.data = [];
  }

  get accountingBookLoader() {
    return AccountingBookLoader;
  }

  accountingBookView = (accountingBook) => {
    return `${accountingBook.Code} - ${accountingBook.Type}`;
  };

  onClickValas(e) {
    this.isValas = e.target.checked
  }
}
