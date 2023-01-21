import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";

var UnitLoader = require("../../../loader/unit-loader");
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedUnit;
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

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  selectedUnitChanged(newValue) {
    var _selectedUnit = newValue;
    if (_selectedUnit.Id) {
      this.data.MachineUnit= _selectedUnit.Name;
    }
  }

  get units() {
    return UnitLoader;
  }
  
}
