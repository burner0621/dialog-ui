import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailItem {
  @bindable isPrinting;

  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.isPrinting = item.context.options.UnitName ?
     item.context.options.UnitName.toUpperCase() === "PRINTING" : false;
    // this.data.ScreenCost = item.context.options.ScreenCost;
    console.log(this.data)
  }

  controlOption = {
    control: {
      length: 12
    }
  }
}
