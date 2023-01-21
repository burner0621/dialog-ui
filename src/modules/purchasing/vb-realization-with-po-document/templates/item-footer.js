import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import numeral from 'numeral';

export class ItemFooter {
  activate(context) {
    this.context = context;
    console.log(this.context);
  }

  getTotal() {
    return 0;
  }
}
