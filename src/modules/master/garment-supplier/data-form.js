import { inject, bindable, computedFrom } from 'aurelia-framework';
var TaxLoader = require('../../../loader/income-tax-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedTax;
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
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  selectedtaxChanged(newValue) {
    var _selectedIncomeTax = newValue || {};
    if (_selectedIncomeTax.Id) {
        this.data.IncomeTaxes = _selectedIncomeTax ? _selectedIncomeTax : null;
    }
    else {
        this.data.IncomeTaxes = {};
    }
    this.resetErrorItems();
}

usetaxChanged(e) {
    this.selectedTax = "";
    this.data.IncomeTaxes = null;
}

get taxLoader() {
    return TaxLoader;
}

taxView = (tax) => {
    return `${tax.name} - ${tax.rate}`
}
} 
