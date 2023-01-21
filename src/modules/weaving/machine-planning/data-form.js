import { inject, bindable, computedFrom } from "aurelia-framework";
var unitLoader = require("../../../loader/unit-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var machineLoader = require("../../../loader/weaving-machine-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Machine;
  @bindable WeavingUnit;
  @bindable UserMaintenance;
  @bindable UserOperator;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  bloks = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ];

  constructor() { }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    
    if (this.data.Machine) {
      this.Machine = this.data.Machine;
    }

    if (this.data.WeavingUnit) {
      this.WeavingUnit = this.data.WeavingUnit;
    }

    if (this.data.UserMaintenance) {
      this.UserMaintenance = this.data.UserMaintenance;
    }

    if (this.data.UserOperator) {
      this.UserOperator = this.data.UserOperator;
    }
    
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get units() {
    return unitLoader;
  }

  get machines() {
    return machineLoader;
  }

  get users() {
    return OperatorLoader;
  }

  MachineChanged(newValue) {
    if (newValue) {
      
      this.data.MachineId = newValue.Id;
      this.data.Location = newValue.Location;
    }
  }

  WeavingUnitChanged(newValue) {
    if (newValue) {
      
      this.data.UnitDepartementId = newValue.Id;
    }
  }

  UserMaintenanceChanged(newValue) {
    
    if (newValue) {

      this.data.UserMaintenanceId = newValue.Id;
    }
  }

  UserOperatorChanged(newValue) {

    if (newValue) {

      this.data.UserOperatorId = newValue.Id;
    }
  }
}