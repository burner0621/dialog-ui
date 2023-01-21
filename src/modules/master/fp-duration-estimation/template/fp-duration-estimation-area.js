import {bindable} from 'aurelia-framework'

export class PurchaseRequestItem {
  listAreaName = ["PPIC", "PREPARING", "PRE TREATMENT", "DYEING", "PRINTING", "FINISHING", "QC"];
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