import {bindable} from 'aurelia-framework'
export class UnitReceiptNoteItem {
  @bindable pricePerDealUnitAfter
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    this.pricePerUnitCorrectionReadOnly = this.context.context.options;
    this.totalPrice=this.data.priceTotalAfter;
    this.pricePerDealUnitAfter=this.data.pricePerDealUnitAfter;
    this.qtyTemp=0;
    if(this.data.quantity){
      this.qtyTemp=this.data.quantity;
     // this.data.quantity=this.data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }
    if(this.pricePerDealUnitAfter){
      this.pricePerDealUnitAfter=this.pricePerDealUnitAfter.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    }
    if(this.data.priceTotalAfter){
      this.data.priceTotalAfter=this.data.priceTotalAfter.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    }
    if(this.totalPrice){
      this.totalPrice=this.totalPrice.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    }

  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  // get totalPrice(){
  //   this.data.priceTotalAfter=this.data.quantity * this.data.pricePerDealUnitAfter;
  //   return this.data.priceTotalAfter
  // }

  pricePerDealUnitAfterChanged(newValue){
    if(!this.readOnly){
      this.data.priceTotalAfter=this.qtyTemp * newValue;
      this.totalPrice=this.data.priceTotalAfter;
      this.data.pricePerDealUnitAfter=newValue;
    }
    
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}