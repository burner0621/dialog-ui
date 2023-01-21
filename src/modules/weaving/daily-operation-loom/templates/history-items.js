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
  export class HistoryItems {
  
    constructor(service, bindingEngine) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    async activate(context) {
      this.data = context.data;
  
      this.error = context.error || {};
  
      if (this.data.DateTimeMachine) {
        var DateMachine = moment(this.data.DateTimeMachine).format('DD/MM/YYYY');
        var TimeMachine = moment(this.data.DateTimeMachine).format('LT');
  
        this.data.DateMachine = DateMachine;
        this.data.TimeMachine = TimeMachine;
      }
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  