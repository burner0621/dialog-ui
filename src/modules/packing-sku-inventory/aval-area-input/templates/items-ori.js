import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";
var UomLoader = require("../../../../loader/uom-loader");

@inject(BindingEngine, Service)
export class Items {

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  avalTypes = [
    "SAMBUNGAN",
    "AVAL A",
    "AVAL B",
    "PANCINGAN",
    "TALI KOTOR",
    "KAIN KOTOR"
  ];

  get uoms() {
    return UomLoader;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.options = context.context.options;
    //   this.OrderIdFilter = {
    //     "OrderId": context.context.options.OrderId
    //   };

    this.readOnly = context.options.readOnly;

    if(this.data.id){
      this.data.AvalType = this.data.avalType;
      this.data.AvalCartNo = this.data.avalCartNo;
      this.data.AvalUomUnit = this.data.avalUomUnit;
      this.data.AvalQuantity = this.data.avalQuantity;
      this.data.AvalQuantityKg = this.data.avalQuantityKg;
    }
  }
}
