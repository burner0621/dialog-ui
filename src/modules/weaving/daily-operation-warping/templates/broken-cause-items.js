import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  var BrokenCausesLoader = require("../../../../loader/weaving-warping-broken-cause-loader");
  
  @inject(BindingEngine, Service)
  export class BrokenCauseItems {
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }

    get brokenCauses() {
      return BrokenCausesLoader;
    }
  
    async activate(context) {
      this.data = context.data;
      this.error = context.error;

      this.WarpingBrokenCauses = this.data.WarpingBrokenCauses;
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  