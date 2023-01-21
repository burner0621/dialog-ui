import { inject, bindable } from "aurelia-framework";
import { Service } from "../service";

var ChartOfAccountLoader = require('../../../../loader/chart-of-account-loader');

@inject(Service)
export class DetailItems {

  activate(context) {
    console.log(context);
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  controlOptions = {
    control: {
      length: 12,
    },
  };

  get chartOfAccountLoader() {
    return ChartOfAccountLoader;
  }
}
