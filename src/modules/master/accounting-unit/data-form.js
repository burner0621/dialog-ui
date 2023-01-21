import { inject, bindable, computedFrom } from "aurelia-framework";
var DivisionLoader = require("../../../loader/division-loader-new");

export class DataForm {
  @bindable title;
  @bindable readOnly = false;
  @bindable data = { import: true };
  @bindable error = {};
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  constructor() {}
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
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

  get divisionLoader() {
    return DivisionLoader;
  }

  divisionChanged(e) {
    this.data.DivisionId =
      this.data.DivisionId !== this.context.data.DivisionName.Id
        ? this.context.data.DivisionName.Id
        : this.data.DivisionId;

    this.data.DivisionCode =
      this.data.DivisionCode !== this.context.data.DivisionName.Code
        ? this.context.data.DivisionName.Code
        : this.data.DivisionCode;

    this.data.DivisionName =
      this.data.DivisionName !== this.context.data.DivisionName.Name
        ? this.context.data.DivisionName.Name
        : this.data.DivisionName;
  }

  activate() {}

  attached() {}
}
