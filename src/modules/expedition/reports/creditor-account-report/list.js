import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/supplier-loader");

@inject(Service)
export class List {
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

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  supplierView = (supplier) => {
    return supplier.name;
  };

  async search() {
    this.payment = 0;
    this.purchase = 0;
    this.bankExpenditure = 0;

    if (this.info.supplier && this.info.supplier.name)
      this.info.name = this.info.supplier.name;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }
    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.name,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.data = await this.service.search(params).then((result) => {
        if (result.data.length == 0) this.isEmpty = true;
        else this.isEmpty = false;

        var newDatas = [];
        let subTotalPurchase = 0;
        let subTotalPayment = 0;
        for (var item of result.data) {
          if (item.Date && item.Remark == null) {
            subTotalPurchase += item.PurchaseAmount;
            this.purchase += item.PurchaseAmount;
            subTotalPayment += item.PaymentAmount;
            this.payment += item.PaymentAmount;
            // if (item.Mutation > 0) {
            //   subTotalPurchase += item.Mutation;
            //   this.purchase += item.Mutation;
            // } else {
            //   subTotalPayment += item.Mutation;
            //   this.payment += item.Mutation;
            // }

            var newData = {
              Date: item.Date ? moment(item.Date).format("DD-MMM-YYYY") : null,
              Products: item.Products,
              UnitReceiptNoteNo: item.UnitReceiptNoteNo,
              BankExpenditureNoteNo: item.BankExpenditureNoteNo,
              MemoNo: item.UnitPaymentOrderNo,
              InvoiceNo: item.InvoiceNo,
              CorrectionNo: item.UnitPaymentCorrectionNoteNo,
              PaymentDuration: item.PaymentDuration ? item.PaymentDuration : 0,
              DPP: item.DPPAmount ? numeral(item.DPPAmount).format("0,000.00") : 0,
              DPPCurrency: item.DPPAmountCurrency
                ? numeral(item.DPPAmountCurrency).format("0,000.00")
                : 0,
              PPN: item.VATAmount ? numeral(item.VATAmount).format("0,000.00") : 0,
              Total: item.Mutation ? numeral(item.Mutation).format("0,000.00") : 0,
              Purchase: item.PurchaseAmount
                ? numeral(item.PurchaseAmount).format(
                  "0,000.00"
                )
                : 0,
              Payment: item.PaymentAmount
                ? numeral(item.PaymentAmount).format(
                  "0,000.00"
                )
                : 0,
              FinalBalance: item.FinalBalance
              ? numeral(item.FinalBalance).format(
                "0,000.00"
              )
              : 0,
              // numeral(this.purchase + this.payment).format(
              //   "0,000.00"
              // ),
            };
          // } else if (!item.Date && item.Remark == "TOTAL") {
          //   // continue;
          //   var newData = {
          //     Date: null,
          //     InvoiceNo: item.InvoiceNo,
          //     DPP: null,
          //     Purchase: numeral(subTotalPurchase).format("0,000.00"),
          //     Payment: numeral(subTotalPayment).format("0,000.00"),
          //     FinalBalance: numeral(item.FinalBalance).format(
          //       "0,000.00"
          //     ),
          //   };

          //   subTotalPurchase = 0;
          //   subTotalPayment = 0;
          // } else if (!item.Date && item.Remark == "SALDO AWAL") {
          //   // continue;
          //   var newData = {
          //     Date: null,
          //     InvoiceNo: item.Remark,
          //     DPP: null,
          //     FinalBalance: numeral(item.FinalBalance).format(
          //       "0,000.00"
          //     ),
          //   };

          //   subTotalPurchase = 0;
          //   subTotalPayment = 0;
          // } 
          } else {
            var newData = {
              Previous: item.Remark,
              DPP: null,
              FinalBalance:
                item.FinalBalance != null
                  ? numeral(item.FinalBalance).format("0,000.00")
                  : null,
            };

            subTotalPurchase = 0;
            subTotalPayment = 0;
          }

          if (item.Currency) this.currency = item.Currency;
          newDatas.push(newData);
        }
        this.closingBalance = numeral(result.finalBalance).format("0,000.00");
        this.payment = numeral(this.payment).format("0,000.00");
        this.purchase = numeral(this.purchase).format("0,000.00");
        // this.mutation = numeral(result.finalBalance).format('0,00');

        return newDatas;
      });

      console.log(this.data);
      this.data = this.data.filter((element) => !(element.FinalBalance == null && element.Previous == null) || element.Date);
      console.log(this.data);
    }
  }

  excel() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.supplierName,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.service.getXls(params);
    }
    // this.getExcelData();
  }

  pdf() {
    if (this.info.supplier && this.info.supplier.name)
      this.info.supplierName = this.info.supplier.name;

    let validationError = false;

    if (this.info && (!this.info.supplier || this.info.supplier.name == null)) {
      this.error.supplier = "Supplier harus diisi";
      validationError = true;
    }

    if (!validationError) {
      this.error = {};
      // this.flag = true;
      // this.tableList.refresh();

      let params = {
        supplierName: this.info.supplierName,
        month: this.info.month.value,
        year: this.info.year,
      };

      this.service.getPdf(params);
    }
    // this.getExcelData();
  }

  reset() {
    this.error = {};
    this.isEmpty = true;
    // this.flag = false;
    this.info.supplier = undefined;
    this.info.supplierName = "";
    this.currency = "";
    this.closingBalance = 0;
    this.purchase = 0;
    this.payment = 0;
    this.data = [];
    // this.tableList.refresh();
    this.info.year = moment().format("YYYY");
    this.info.month = { text: "January", value: 1 };
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
