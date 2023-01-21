import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
var WarpingBeamByOrderLoader = require("../../../../loader/weaving-warping-beam-by-order-loader");

@inject(BindingEngine, Service)
export class BeamsWarpingPost {

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get beams() {
    return WarpingBeamByOrderLoader;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.BeamDocument = this.data.BeamDocument;console.log(this.data.BeamDocument);

    this.options = context.context.options;
    this.OrderIdFilter = {
      "OrderId": context.context.options.OrderId
    };
    
    this.readOnly = context.options.readOnly;
  }
}
