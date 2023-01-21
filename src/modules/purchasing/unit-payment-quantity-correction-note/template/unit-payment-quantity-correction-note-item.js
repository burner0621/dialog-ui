import {bindable} from 'aurelia-framework'

export class UnitPaymentQuantityCorrectionNoteItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 

    if(this.data.quantity){
      this.data.quantity=this.data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }
    // if(this.data.pricePerDealUnitAfter){
    //   this.data.pricePerDealUnitAfter=this.data.pricePerDealUnitAfter.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    // }

    if(this.data.priceTotalAfter){
      this.data.priceTotalAfter=this.data.priceTotalAfter.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    }

  }
    controlOptions = {
    control: {
      length: 12
    }
  };
  quantityChanged(e) {
    this.data.priceTotalAfter = parseFloat(this.data.pricePerDealUnitAfter) * e.target.value;
  }
  
}