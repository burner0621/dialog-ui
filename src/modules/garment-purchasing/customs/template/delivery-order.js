import {bindable} from 'aurelia-framework'

export class DeliveryOrder {
  activate(context) {
    this.data = context.data;
    this.options = context.options; 
    this.context = context;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
  
  valueChange(dataDeliveryOrder){
      var selectedData = dataDeliveryOrder.srcElement.checked || false;
      if(selectedData){
        this.context.context.options += this.data.price;
      }else{
        this.context.context.options -= this.data.price;
      }
  }
}