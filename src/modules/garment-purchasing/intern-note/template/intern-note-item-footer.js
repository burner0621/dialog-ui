import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
import { TextTemplateLoader } from '../../../../../node_modules/aurelia-loader-webpack/dist/aurelia-loader-webpack';

export class DetailFooter {
  activate(context) {
    this.context = context;
  }
  

  get grandTotalPrice() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {

          console.log(item.data.garmentInvoice.totalAmount2);
          if(isNaN(item.data.garmentInvoice.totalAmount2) ){
 
            return 0
          }
          else{
            return parseFloat(item.data.garmentInvoice.totalAmount2)
          }
        });
        
      return total
        .reduce((prev, curr, index) => {
          return prev + parseFloat(curr)
        }, 0);
    }
    else {
      return 0
    }
  }

  get grandTotalPrice2() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if(isNaN(item.data.garmentInvoice.totalAmount2) ){
 
            return 0
          }
          else{
            return parseFloat(item.data.garmentInvoice.totalAmount2)
          }
        });
        
      return total
        .reduce((prev, curr, index) => {
          return prev + parseFloat(curr)
        }, 0);
    }
    else {
      return 0
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
