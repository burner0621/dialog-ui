import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var AccountLoader = require("../../../loader/account-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  groups = ["", "A", "B", "C", "D", "E", "F", "G"];

  assignments = ["", "Preparation", "AJL"];

  types = [];

  preparationTypes = ["", "Warping", "Sizing", "Reaching", "Tying"];

  ajlTypes = ["", "Operator", "Maintenance"];

  constructor() {}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get accounts() {
    return AccountLoader;
  }

  get units() {
    return UnitLoader;
  }
}
