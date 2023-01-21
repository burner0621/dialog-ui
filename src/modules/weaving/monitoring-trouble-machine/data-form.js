import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';

var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require('../../../loader/weaving-machine-loader');
var OperatorNameLoader = require("../../../loader/weaving-operator-by-name-loader");
var OrderbyNumberLoader = require("../../../loader/weaving-order-number-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedMachineDocument;
  @bindable selectedOrderNumber;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  customOptions = {
    label: {
      length: 4,
      align: "left"
    },
    control: {
      length: 6
    }
  }

  customDescriptionOptions = {
    label: {
      length: 4,
      align: "left"
    },
    control: {
      length: 7
    }
  }

  processOptions = ['Warping','Sizing', 'Reaching', 'Tying', 'Loom'];

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
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

  selectedOrderNumberChanged(newValue) {
    var _selectedOrderNumber = newValue;
    if (_selectedOrderNumber.Id) {
      this.data.OrderNumber = _selectedOrderNumber;
      this.data.Unit = newValue.Unit;
      this.data.ConstructionNumber = newValue.ConstructionNumber;
    }
  }

  selectedMachineDocumentChanged(newValue) {
    var _selectedMachineDocument = newValue;
    if (_selectedMachineDocument.Id) {
      this.data.MachineNumber = _selectedMachineDocument;
      this.data.MachineLocation = newValue.Location;
      this.data.MachineTypeName = newValue.MachineType;
    }
  }
   
  get units() {
    return UnitLoader;
  }

  get operators() {
    return OperatorNameLoader;
  }

  get machines() {
    return MachineLoader;
  }

  get orders() { 
    return OrderbyNumberLoader;
  }
}
