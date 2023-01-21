import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  async activate(context) {
    this.context = context;
    console.log(context);
  }
  get currency() {
    if (this.context.items.length > 0) {
      return this.context.options.currencyCode
    } else {
      return ""
    }
  }

  get totalValas() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.valas){
            var c = parseFloat(item.data.valas)
            console.log(c)
          return c
          } else return 0
        });
      console.log(total);
      return total
        .reduce((prev, curr, index) => { 
          console.log(prev)
          return prev + parseFloat(curr) }, 0);
    }
    else {
      return 0
    }
  }

  get totalIDR() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.IDR) {
            var c = parseFloat(item.data.IDR)
            console.log(c)
            return c
          } else return 0
        });
      console.log(total);
      return total
        .reduce((prev, curr, index) => {
          console.log(prev)
          return prev + parseFloat(curr)
        }, 0);
    }
    else {
      return 0
    }
  }

  // get grandTotalPrice() {
  //   if (this.context.items.length > 0) {
  //     var total = this.context.items
  //       .map((item) => {
  //         if (item.data.fulfillments instanceof Array) {
  //           var qty = item.data.fulfillments
  //             .map((fulfillment) => {
  //               if (fulfillment.isSave == true)
  //                 return parseFloat(((fulfillment.doQuantity) * (fulfillment.pricePerDealUnit)))
  //               else return 0
  //             });
  //           return qty
  //             .reduce((prev, curr, index) => { return prev + parseFloat(curr) }, 0);
  //         }
  //         else {
  //           return 0
  //         }
  //       });
  //     return total
  //       .reduce((prev, curr, index) => {
  //         return prev + parseFloat(curr)
  //       }, 0);
  //   }
  //   else {
  //     return 0
  //   }
  // }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
