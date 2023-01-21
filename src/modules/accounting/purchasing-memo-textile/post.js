import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";

var COALoader = require('../../../loader/coa-loader');

@inject(Service, Router)
export class Post {
  // @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  monthOptions = [];
  yearOptions = [];

  constructor(service, router) {
    this.service = service;
    this.router = router;
  }

  @bindable selectedMonth;
  @bindable selectedYear;
  async bind(context) {
    this.context = context;
    this.data = this.context.data || {};
    this.data.transactions = [];
    this.error = this.context.error || {};

    let monthResult = await this.service.getMonths();
    this.monthOptions = monthResult.data;
    this.selectedMonth = this.monthOptions[(new Date()).getMonth()];

    this.selectedYear = (new Date()).getFullYear();
    for (var i = this.selectedYear; i > 2010; i--) {
      this.yearOptions.push(i);
    }
  }

  selectedMonthChanged(newValue, oldValue) {
    // console.log(newValue);
    // console.log(this.selectedMonth);
  }

  selectedYearChanged(newValue, oldValue) {
    // console.log(newValue);
    // console.log(this.selectedYear);
  }

  selectAll = false;
  selectAllClicked(event) {
    if (this.selectAll)
      for (var transaction of this.data.transactions) {
        transaction.isSelected = true;
      }
    else
      for (var transaction of this.data.transactions) {
        transaction.isSelected = false;
      }
  }

  selectedRowClicked(event, journalTransactionId) {
    // console.log(journalTransactionId);
    // if (event.target.checked)
    let targetValue = event.target.checked;

    if (!targetValue)
      this.selectAll = false;

    for (var transaction of this.data.transactions) {
      if (transaction.header.Id == journalTransactionId)
        transaction.isSelected = targetValue;
    }
  }

  cancelCallback(event) {
    this.list();
  }

  list() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  validate() {
    this.error = {};
    if (!this.data.transactions.find((transaction) => transaction.isSelected)) {
      this.error.noneSelected = "Tidak ada transaksi yang dipilih";
      return true
    }

    let anyError = false;
    for (var transaction of this.data.transactions) {
      let splittedCOA = transaction.COA.Code.split(".");
      transaction.error = {};
      if (splittedCOA[0] == "9999" && transaction.isSelected) {
        transaction.error = {
          invalidCOA: "COA penampung harus diubah"
        };
        anyError = true;
      }

      if (!transaction.COA.Name) {
        transaction.error = {
          invalidCOAName: "Nama COA perlu diperbaiki"
        };
        anyError = true;
      }
    }

    return anyError;
  }

  @bindable selectedColspan = 9;
  saveCallback(event) {
    // console.log(this.data);

    if (!this.validate()) {
      let transactionsToPost = [];

      //set header
      for (var transaction of this.data.transactions) {
        if (transaction.isSelected) {
          if (!transactionsToPost.find((transactionToPost) => transactionToPost.Id == transaction.header.Id)) {
            let transactionToPost = transaction.header;
            // delete
            // transaction.header
            transactionsToPost.push(transactionToPost);
          }

        }
      }

      // set items
      let postPromises = [];
      for (var transactionToPost of transactionsToPost) {
        transactionToPost.Items = this.data.transactions.filter((transaction) => transaction.header.Id == transactionToPost.Id);
        // delete transactionToPost.header
        // postPromises.push(this.service.postingUpdateCOA(transactionToPost));
      }

      for (var transactionToPost of transactionsToPost) {
        for (var item of transactionToPost.Items) {
          delete item.header
        }
        postPromises.push(this.service.postingUpdateCOA(transactionToPost));
      }

      Promise.all(postPromises)
        .then(result => {
          alert("Data berhasil dibuat");
          this.router.navigateToRoute(
            "post",
            {},
            { replace: true, trigger: true }
          );
        })
        .catch(e => {
          this.error = e;
        });
    }
  }

  async search() {
    var result = await this.service.getUnpostedTransactions(this.selectedMonth.MonthNumber, this.selectedYear);

    this.data.transactions = [];
    for (var datum of result.data) {
      let rowspanNumber = datum.Items.length;
      datum.dateView = moment(datum.Date).format("DD-MMM-YYYY");
      for (let i = 0; i < datum.Items.length; i++) {
        let item = datum.Items[i];
        if (i == 0) {
          item.isHeader = true;
          item.rowspanNumber = rowspanNumber;
        }


        let splittedCOA = item.COA.Code.split(".");
        if (splittedCOA[0] != "9999") {
          item.isReadOnly = true;
        }

        item.header = datum;
        item.isSelected = false;

        this.data.transactions.push(item);
      }
    }
  }

  get coaLoader() {
    return COALoader;
  }

  reset() {
    this.error = {};
    this.data = {};
    this.data.transactions = [];
    this.selectedYear = (new Date()).getFullYear();
    this.selectedMonth = this.monthOptions[(new Date()).getMonth()];
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}

