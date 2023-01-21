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

  creditSum = 0;
  get getCreditSum() {
    var qty = this.context.items
      .map((item) => item.data.Credit);
    var result = qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
    this.creditSum = result;
    return result;
  }

  get isDebitSmaller() {
    return this.debitSum < this.creditSum;
  }

  get isCreditSmaller() {
    return this.creditSum < this.debitSum;
  }

  formatNumber(number) {
    var result = numeral(number).format("0,0.0000");
    return result;
  }

  get getDifference() {
    if (this.debitSum < this.creditSum) {
      return `(${this.formatNumber(this.debitSum - this.creditSum)})`;
    } else if (this.creditSum < this.debitSum) {
      return `(${this.formatNumber(this.creditSum - this.debitSum)})`;
    } else {
      return '';
    }
  }
}
