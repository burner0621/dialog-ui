import { bindable } from "aurelia-framework";

export class DoReturnDetailItem {
  @bindable data;
  @bindable error;

  shipmentQuery = {};
  async activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
  }
}
