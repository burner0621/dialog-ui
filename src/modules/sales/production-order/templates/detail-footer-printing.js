import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }

  get itemSum() {
    var qty = this.context.items
      .map((item) => item.data.Quantity);
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get uom() {
    var uom;
    if(this.context.items.length>0){
      if(this.context.items[0].data.Uom.Unit){
          return this.context.items[0].data.Uom.Unit;
      }
      else{
        uom="MTR";
        return uom;
      }
    }
    else{
      return uom;
    }
    
  }
}
