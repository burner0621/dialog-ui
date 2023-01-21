import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var OrderLoader = require("../../../loader/weaving-order-by-number-loader");
var MaterialLoader = require("../../../loader/weaving-material-type-loader");
// var Operator = require("../../../loader/weaving-operator-loader");

@inject(Service, Router, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable PreparationOrder;
  @bindable PreparationFabricConstruction;
  @bindable PreparationWeavingUnit;
  @bindable BeamProductResult;
  @bindable AmountOfCones;
  @bindable ColourOfCone;
  // @bindable PreparationOperator;
  @bindable PreparationDate;
  @bindable PreparationTime;
  @bindable PreparationShift;

  constructor(service, router, bindingEngine) {
    this.service = service;
    this.router = router;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  // Loaders
  get orders() {
    return OrderLoader;
  }

  get materialTypes() {
    return MaterialLoader;
  }

  // get operators() {
  //   return Operator;
  // }

  // Bindable Method
  PreparationOrderChanged(newValue) {
    if (newValue) {
      this.PreparationOrder = newValue;
      this.data.PreparationOrder = newValue.Id;
    }

    if (newValue.ConstructionNumber) {
      this.error.PreparationFabricConstruction = "";
      this.PreparationFabricConstruction = newValue.ConstructionNumber;

      var ConstructionNumberSplitted = newValue.ConstructionNumber.split(" ");
      var WarpCode = ConstructionNumberSplitted[ConstructionNumberSplitted.length - 2];
      this.data.PreparationMaterialType = WarpCode;
    } else {

      this.PreparationFabricConstruction = "";
      this.error.PreparationFabricConstruction = " Nomor Konstruksi Tidak Ditemukan ";
    }

    if (newValue.Unit) {

      this.error.PreparationWeavingUnit = "";
      this.PreparationWeavingUnit = newValue.Unit;
    } else {

      this.PreparationWeavingUnit = "";
      this.error.PreparationWeavingUnit = " Unit Weaving Tidak Ditemukan ";
    }
  }

  BeamProductResultChanged(newValue) {
    this.data.BeamProductResult = newValue;
  }

  AmountOfConesChanged(newValue) {
    this.data.AmountOfCones = newValue;
  }

  ColourOfConeChanged(newValue) {
    this.data.ColourOfCone = newValue;
  }

  // PreparationOperatorChanged(newValue) {
  //   this.data.PreparationOperator = newValue.Id;
  // }

  PreparationDateChanged(newValue) {
    this.data.PreparationDate = moment(newValue).utcOffset("+07:00").format();
  }

  PreparationTimeChanged(newValue) {
    this.data.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.PreparationShift = "";
        this.PreparationShift = {};
        this.PreparationShift = result;
        this.data.PreparationShift = this.PreparationShift.Id;
      })
      .catch(e => {
        this.PreparationShift = {};
        this.error.PreparationShift = " Shift tidak ditemukan ";
      });
  }
}
