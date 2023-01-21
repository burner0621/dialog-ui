import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var UnitLoader = require("../../../loader/unit-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}

  // OperationalMachineOptions = {

  // };

  columns = [
    {
      value: "MachineNumber",
      header: "No. Mesin"
    },
    {
      value: "Production",
      header: "Produksi"
    },
    {
      value: "SCMPX",
      header: "S/CMPX"
    },
    { value: "EFF", header: "EFF" },
    { value: "RPM", header: "RPM" },
    { value: "T", header: "T" },
    {
      value: "F",
      header: "F"
    },
    { value: "W", header: "W" },
    {
      value: "L",
      header: "L"
    },
    {
      value: "H",
      header: "H"
    }
  ];

  get units() {
    return UnitLoader;
  }

  bind(context) {
    this.context = context;
    // this.data = this.context.data;
    this.data = {
      Id: 1,
      MachineNumber: "1/2",
      Production: "165",
      SCMPX: "124",
      EFF: "673",
      RPM: "525",
      T: "26",
      F: "6",
      W: "5",
      L: "2",
      H: "8"
    };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Items Collections Clicked
  get addProductionResults() {
    return event => {
      this.data.Items.push({});
    };
  }
}
