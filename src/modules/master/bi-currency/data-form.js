import { inject, bindable, computedFrom } from 'aurelia-framework';

const CurrencyLoader = require('../../../loader/currency-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = {};

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    let yearNow = new Date().getFullYear();

    for (var i = yearNow - 5; i < yearNow + 5; i++) {
      this.yearOptions.push(i);
    }

    if (this.data.Month)
      this.selectedMonth = this.monthOptions.find((element) => element.value == this.data.Month);


    console.log(this.selectedMonth)



  }

  yearOptions = [];
  monthOptions = [{
    label: "Januari",
    value: 1
  }, {
    label: "Februari",
    value: 2
  }, {
    label: "Maret",
    value: 3
  }, {
    label: "April",
    value: 4
  }, {
    label: "Mei",
    value: 5
  }, {
    label: "Juni",
    value: 6
  }, {
    label: "Juli",
    value: 7
  }, {
    label: "Agustus",
    value: 8
  }, {
    label: "September",
    value: 9
  }, {
    label: "Oktober",
    value: 10
  }, {
    label: "November",
    value: 11
  }, {
    label: "Desember",
    value: 12
  }]

  @bindable selectedMonth;
  selectedMonthChanged(newValue, oldValue) {
    if (newValue)
      this.data.Month = newValue.value;
    else this.data.Month = 0;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

} 
