import { inject, bindable, computedFrom } from "aurelia-framework";

var SupplierLoader = require("../../../loader/weaving-supplier-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  // @bindable Name;
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

    // if (this.data.Id) {
    //   this.Name = this.data.Name;
    // }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}
