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
    this.data = context.data;
    this.error = context.error;

    if(this.data.Code){
      this.Code = this.data;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  get rings() {
    return RingLoader;
  }

  CodeChanged(newValue) {
    if (newValue) {
      var yarnNumber = newValue.Number.split("/");
      this.data.Id = newValue.Id;
      this.data.Code = newValue.Code;
      
      this.data.Number = yarnNumber[0];
      this.data.AdditionalNumber = yarnNumber[1];
      this.data.FullNumber = newValue.Number;
    }
  }
}
