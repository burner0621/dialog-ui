import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  import moment from 'moment';
  
  @inject(Service, BindingEngine)
  export class BeamsUsedItems {
  
    constructor(service, bindingEngine) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    async activate(context) {
      this.data = context.data;
  
      this.error = context.error || {};
  
      // if (this.data.LatestDateTimeProcessed) {
      //   var LastDateProcessed = moment(this.data.LatestDateTimeProcessed).format('DD/MM/YYYY');
      //   var LastTimeProcessed = moment(this.data.LatestDateTimeProcessed).format('LT');
  
      //   this.data.LastDateProcessed = LastDateProcessed;
      //   this.data.LastTimeProcessed = LastTimeProcessed;
      // }
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  