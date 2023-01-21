import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";

@containerless()
@inject(Service, BindingEngine)
export class Preview {

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}