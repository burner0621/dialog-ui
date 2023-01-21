import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }
  get currency() {
    if (this.context.items.length > 0) {
      if (this.context.items[0].data.fulfillments instanceof Array) {
        if (this.context.items[0].data.fulfillments.length > 0) {
            return this.context.items[0].data.currency.Code;
        } else {
          return ""
        }
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  get totalOrder() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => {
                if(fulfillment.isSave==true)
                 return parseFloat(fulfillment.dealQuantity);
                else return 0
              });
            return qty
              .reduce((prev, curr, index) => { 
                console.log(prev)
                return prev +  parseFloat(curr) }, 0);
          }
          else {
            return 0
          }
        });
      return total
        .reduce((prev, curr, index) => { return prev +  parseFloat(curr) }, 0);
    }
    else {
      return 0
    }
  }

  get totalDelivered() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => {
                if(fulfillment.isSave==true)
                  return parseFloat(fulfillment.doQuantity)
                else return 0
              });
            return qty
              .reduce((prev, curr, index) => { return prev + parseFloat(curr) }, 0);
          }
          else {
            return 0
          }
        });
      return total
        .reduce((prev, curr, index) => { return prev +  parseFloat(curr) }, 0);
    }
    else {
      return 0
    }
  }

  get grandTotalPrice() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => {
                if(fulfillment.isSave==true)
                 return parseFloat(((fulfillment.doQuantity) * (fulfillment.pricePerDealUnit)))
                else return 0
              });
            return qty
              .reduce((prev, curr, index) => { return prev +  parseFloat(curr) }, 0);
          }
          else {
            return 0
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
