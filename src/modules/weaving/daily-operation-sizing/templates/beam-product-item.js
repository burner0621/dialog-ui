import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import moment from 'moment';
var OperatorLoader = require("../../../../loader/weaving-operator-loader");
var BeamLoader = require("../../../../loader/weaving-beam-loader");

@inject(Service, BindingEngine)
export class BeamProductItem {
  // @bindable ProduceBeamsTime;
  // @bindable ProduceBeamsShift;

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  // actions = ["", "Finish", "Produce New Beam"];

  async activate(context) {
    this.data = context.data;
    this.data.Details = {};
    this.data.Details.PreparationTime = "";
    this.data.Details.ShiftId = "";

    this.error = context.error || {};

    if (this.data.LatestDateTimeBeamProduct) {
      var DateMachine = moment(this.data.LatestDateTimeBeamProduct).format('DD/MM/YYYY');
      var TimeMachine = moment(this.data.LatestDateTimeBeamProduct).format('LT');

      this.data.BeamProductDate = DateMachine;
      this.data.BeamProductTime = TimeMachine;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // get operators() {
  //   return OperatorLoader;
  // }

  // get beams() {
  //   return BeamLoader;
  // }

  // async ProduceBeamsTimeChanged(newValue) {
  //   this.data.Details.PreparationTime = newValue;

  //   if (newValue) {
  //     let timeResult = await this.service.getShiftByTime(newValue)
  //       .then(result => {
  //         return result;
  //       })
  //       .catch(e => {
  //         return null;
  //       });

  //     if (timeResult) {
  //       this.error.ProduceBeamsShift = undefined;
  //       this.ProduceBeamsShift = timeResult.Name;
  //       this.data.Details.ShiftId = timeResult.Id;
  //     } else {
  //       this.ProduceBeamsShift = {};
  //       this.data.Details.ShiftId = this.ProduceBeamsShift.Id;
  //       this.error.ProduceBeamsShift = " Shift tidak ditemukan ";
  //     }
  //   }
  // }
}
