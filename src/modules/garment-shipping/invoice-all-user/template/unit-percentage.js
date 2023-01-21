export class GarmentShippingInvoiceUnits {

  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(dialog, service, serviceCore) {
    this.dialog = dialog;
    this.service = service;

  }

  activate(context) {
    this.context = context;
    this.saveAll = false;
    this.data = context.data;
    this.error = context.error;
    this.options = this.context.context.options;
    this.readOnly = this.options.isView;
    this.items=this.context.context.options.itemData;
  }

  get amountPercentage(){
    this.data.amountPercentage=0;
    if(this.items){
      var totAmount=0;
      var amount=0;
      for(var item of this.items){
        totAmount+=item.price * item.quantity;
        if(item.unit){
          if(item.unit.code==this.data.unit.code){
            amount+=item.price * item.quantity;
          }
        }
        
      }
      if(amount > 0 && totAmount > 0) {
        this.data.amountPercentage=amount / totAmount * 100;
      }
    }
    return this.data.amountPercentage;
  }

  get quantityPercentage(){
    this.data.quantityPercentage=0;
    if(this.items){
      var totQty=0;
      var qty=0;
      for(var item of this.items){
        totQty+=item.quantity;
        if(item.unit){
          if(item.unit.code==this.data.unit.code){
            qty+=item.quantity;
          }
        }
        
      }
      this.data.quantityPercentage=qty / totQty * 100;
    }
    return this.data.quantityPercentage;
  }
}