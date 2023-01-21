 
import {bindable} from 'aurelia-framework'


export class InternalTransferOrderDetail {
  activate(context) {
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