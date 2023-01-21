import { bindable, computedFrom } from 'aurelia-framework';

export class Item {
  constructor() {
    this.error = {};
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    
  }

}
