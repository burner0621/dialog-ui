import {bindable} from 'aurelia-framework'

export class listDO {

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.format = "0,000";
  }
}