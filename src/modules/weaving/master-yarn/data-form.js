import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable MaterialTypeId;
  @bindable YarnNumberId;
  @bindable OptionalName;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Id) {
      var detectWhitespace = this.data.Name.split(" ");
      this.MaterialTypeId = this.data.MaterialTypeId.Code;
      this.YarnNumberId = this.data.YarnNumberId.Code;
      this.data.Name = detectWhitespace[0] ? detectWhitespace[0] : " ";
      this.OptionalName = detectWhitespace[1] ? detectWhitespace[1] : " ";
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  // Change on Kode Bahan, affected when MaterialTypeId change
  MaterialTypeIdChanged(newValue) {
    if (newValue.Name) {
      this.data.Name = "";
      this.data.MaterialTypeId = {};
      this.data.MaterialTypeId = newValue;
      this.data.MaterialTypeId.Id = newValue.Id;
      this.data.MaterialTypeId.Name = newValue.Name;
      this.data.MaterialTypeId.Code = newValue.Code;

      if (this.data.YarnNumberId) {
        this.data.Name =
          newValue.Name + this.data.YarnNumberId.Number ?
          newValue.Name + this.data.YarnNumberId.Number :
          "";

        this.data.Code = this.data.MaterialTypeId.Code + this.data.YarnNumberId.Code;
      } else {
        this.data.Name = newValue.Name;
      }
    }
  }

  OptionalNameChanged(newValue) {
    var whitespaceRegex = new RegExp("\\s");
    if (this.data.MaterialTypeId && this.data.YarnNumberId) {
      if (whitespaceRegex.test(newValue)) {
        this.error.OptionalName = "Kode Tambahan Tidak Boleh Mengandung Spasi";
      } else {
        var yarnMaterial = this.data.MaterialTypeId.Name;
        var yarnNumber = this.data.YarnNumberId.Number;
        this.data.Name = yarnMaterial + yarnNumber;
        this.data.Name = this.data.Name + " " + newValue;
      }
    } else {
      this.data.Name = "";
      this.data.Name = newValue;
    }
  }

  // Change on Kode Ring, affected when YarnNumberId change
  YarnNumberIdChanged(newValue) {
    if (newValue.Number) {
      this.data.Name = "";
      this.data.YarnNumberId = {};
      this.data.YarnNumberId = newValue;
      this.data.YarnNumberId.Id = newValue.Id;
      this.data.YarnNumberId.Number = newValue.Number;
      this.data.YarnNumberId.Code = newValue.Code;

      if (this.data.MaterialTypeId) {
        this.data.Name = this.data.MaterialTypeId.Name ?
          this.data.MaterialTypeId.Name + newValue.Number :
          newValue.Number;

        this.data.Code = this.data.MaterialTypeId.Code + this.data.YarnNumberId.Code;
      } else {
        this.data.Name = newValue.Number;
      }
    }
  }

  get materialLoader() {
    return MaterialTypeLoader;
  }

  get ringLoader() {
    return RingLoader;
  }
}
