import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import numeral from 'numeral';

export class ItemFooter {
  activate(context) {
    this.context = context;
  }

  debitSum = 0;
  get getDebitSum() {
    var qty = this.context.items
      .map((item) => item.data.Debit);

    var result = qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
    this.debitSum = result;
    return result;
  }

  formatNumber(number) {
    var result = numeral(number).format("0,0.0000");
    return result;
  }
}
