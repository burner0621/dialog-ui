import {
  inject,
  bindable,
  BindingEngine,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");
var OrderLoader = require("../../../loader/weaving-order-by-number-loader");
var SizingBeamProductLoader = require("../../../loader/weaving-sizing-beam-by-order-loader");
@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;
  @bindable OrderDocument;
  @bindable PreparationTime;
  @bindable BeamsWarping;

  beamColumns = [{
    value: "BeamNumber",
    header: "Nomor Beam Warping"
  }, {
    value: "YarnStrands",
    header: "Helai Benang Beam Warping"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};
  }

  beamFilter = {
  };

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  get machines() {
    return MachineLoader;
  }

  get units() {
    return UnitLoader;
  }

  // get constructions() {
  //   return ConstructionLoader;
  // }

  get orders() {
    return OrderLoader;
  }

  get sizingBeamProducts() {
    return SizingBeamProductLoader;
  }

  OrderDocumentChanged(newValue) {
    if (newValue) {
      this.beamFilter.OrderId = newValue.Id;
      
      if (newValue.ConstructionNumber) {
        this.error.ConstructionNumber = "";
        this.ConstructionNumber = newValue.ConstructionNumber;
      } else {
        this.ConstructionNumber = "";
        this.error.ConstructionNumber = " Nomor Konstruksi Tidak Ditemukan ";
      }

      if (newValue.Unit) {
        this.error.WeavingUnit = "";
        this.WeavingUnitDocument = newValue.Unit;
      } else {
        this.WeavingUnit = "";
        this.error.WeavingUnitDocument = " Unit Weaving Tidak Ditemukan ";
      }
    }
  }
  PreparationTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.ShiftDocumentId = this.Shift.Id;
      })
      .catch(e => {
        this.Shift = {};
        this.data.ShiftDocumentId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }

  saveCallback(event) {
    var preparationData = {};
    if (this.MachineDocument) {
      preparationData.MachineDocumentId = this.MachineDocument.Id;
    }
    if (this.OrderDocument) {
      preparationData.OrderDocumentId = this.OrderDocument.Id;
    }
    if (this.SizingBeamDocument) {
      preparationData.SizingBeamId = this.SizingBeamDocument.SizingBeamId;
    }
    if (this.PreparationDate) {
      var PreparationDateContainer = this.PreparationDate;
      preparationData.PreparationDate = moment(PreparationDateContainer).utcOffset("+07:00").format();
    }

    if (this.PreparationTime) {
      preparationData.PreparationTime = this.PreparationTime;
    }
    if (this.Shift) {
      preparationData.ShiftDocumentId = this.Shift.Id;
    }
    
    this.service
      .create(preparationData)
      .then(result => {
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
