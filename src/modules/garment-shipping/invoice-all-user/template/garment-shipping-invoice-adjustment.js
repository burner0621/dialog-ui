import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var AddChargesLoader = require('../../../../loader/garment-additional-charges-loader');
export class GarmentShippingInvoiceAdjustments {
 @bindable addCharges;
  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(dialog, service, serviceCore) {
      this.dialog = dialog;
      this.service = service;
  
  }

  get addChargesLoader() {
    return AddChargesLoader;
  }

  activate(context) {
    this.context = context;
    this.saveAll=false;
    this.data = context.data;
    this.error = context.error;
    this.options = this.context.context.options;
    this.readOnly = this.options.isView;
    if(this.data.additionalChargesId){
      this.addCharges={
        Id:this.data.additionalChargesId,
        Name:this.data.adjustmentDescription
      }
    }
  }
  chargesView = (charge) => {
    return `${charge.Name}`;
}
  addChargesChanged(newValue){
    if(newValue){
      this.data.additionalChargesId=newValue.Id;
      this.data.adjustmentDescription=newValue.Name;
    }
  }
}