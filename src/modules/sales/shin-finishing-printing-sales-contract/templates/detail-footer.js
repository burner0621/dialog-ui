import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  scSum = 0;
  activate(context) {
    this.context = context;
  }

  get itemSum() {
    var qty = this.context.items
      .map((item) => item.data.Price);
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }
  get currency() {
    var currency = [];
    if (this.context.items.length > 0) {
      currency = this.context.items
        .map((item) => item.data.Currency.Code);
      return currency
        .reduce((prev, curr, index) => { return curr });
    }
    else {
      return currency;
    }

  }
}
