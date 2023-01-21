import {bindable} from 'aurelia-framework'

export class listQC {

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  } 
}