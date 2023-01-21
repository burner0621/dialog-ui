import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }

  get itemSum() {
    var result = [];
    this.context.items.reduce(function (res, value) {
      if (!res[value.data.uom]) {
        res[value.data.uom] = {
          orderQuantity: 0,
          uom: value.data.uom
        };
        result.push(res[value.data.uom])
      }
      res[value.data.uom].orderQuantity += value.data.orderQuantity
      return res;
    }, {});
    return result;
  }
}
