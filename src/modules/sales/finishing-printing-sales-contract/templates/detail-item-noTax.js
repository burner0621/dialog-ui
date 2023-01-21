import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailItem {
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
  }

  controlOption = {
    control: {
      length: 12
    }
  }
}
