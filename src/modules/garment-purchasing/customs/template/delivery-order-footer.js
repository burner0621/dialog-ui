import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DeliveryOrderFooter {
  activate(context) {
    this.context = context;
   
    var isView = true;
    for(var a of this.context.items){
      if(!a.data.isView)
       isView = false;
    }
    if(isView)
      this.colspan = 5;
    else
      this.colspan = 4;
  }

  get itemQuantity() {
      var quantity = 0;
      for(var a of this.context.items){
          if(a.data.selected)
            quantity += Number(a.data.quantity);
      }
      return quantity;
    // var qty = this.context.items
    //   .map((item) => item.data.quantity);
    // return qty
    //   .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get itemSum() {
    var quantity = 0;
    for(var a of this.context.items){
      
        if(a.data.selected)
          quantity += Number(a.data.price);
    }
    return quantity;
}
}