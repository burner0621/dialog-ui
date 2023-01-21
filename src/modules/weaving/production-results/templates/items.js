import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var RingLoader = require("../../../../loader/weaving-ring-loader");

@inject(BindingEngine, Service)
export class Items {
  @bindable Code;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    // this.data = context.data;
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
    this.error = context.error;

    // if(this.data.Code){
    // console.log("onItemsCollections Context : ", this.data);
    // var newValue = this.data;
    // this.Code = this.data;
    // }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
