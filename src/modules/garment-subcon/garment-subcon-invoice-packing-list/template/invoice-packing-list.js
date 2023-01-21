import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
import { concat } from '../../../../routes/general';

export class DetailFooter {

  activate(context) {
    this.context = context;
    this.options = context.options;
    this.isEdit = this.options.isEdit;
    this.type = this.options.type;
    console.log(this.context);
   
  }


  get itemSumNW() {
    var qty = this.context.items
      .map((item) => item.data.TotalNW);
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get itemSumGW() {
    var qty = this.context.items
      .map((item) => item.data.TotalGW);
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

//   get itemQty() {
//     var qty = this.context.items
//       .map((item) => item.data.qtyOut);
//     return qty
//       .reduce((prev, curr, index) => { return prev + curr }, 0);
//   }
}
