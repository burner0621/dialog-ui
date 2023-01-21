import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import moment from 'moment';

@inject(BindingEngine, Service)
export class LoomItems {

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    if(this.data.PreparationDate){
      var OperationDate = moment(this.data.PreparationDate).format('DD/MM/YYYY');
      this.data.OperationDate = OperationDate;
    }

    this.options = context.context.options;

    this.readOnly = context.options.readOnly;
  }
}
