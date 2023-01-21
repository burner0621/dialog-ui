import { inject, bindable, computedFrom } from "aurelia-framework";

var SupplierLoader = require("../../../loader/supplier-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable supplier;
  existingSupplier = null;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.id) {
      this.supplier = this.data.name;
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  supplierChanged(newValue) {
    if (newValue._id) {
      this.data.name = newValue.name;
      this.data.coreSupplierId = newValue._id;
    }
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}
