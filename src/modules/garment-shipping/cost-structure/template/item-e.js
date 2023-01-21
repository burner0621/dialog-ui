import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

@inject(Service)
export class itemsE {
  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.saveAll = false;
    this.data = context.data;
    this.error = context.error;
    this.options = this.context.context.options;
    this.readOnly = this.options.isView;
    this.isEdit = this.options.isEdit;
  }

  get countValue() {
    var countVal = this.data.percentage * this.context.context.options.headerData.amount;
    this.data.value = countVal;
    return countVal;
  }

}