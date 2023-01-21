import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
var colorLoader = require('../../../../loader/color-type-loader');

export class DetailItem {
  @bindable ColorType;
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    if (!this.data.Color) {
      this.data.Color = {};
    }
    if (this.data.Color) {
      this.ColorType = this.data.Color;
    }
    console.log(this.data);
  }

  controlOption = {
    control: {
      length: 12
    }
  }
  ColorTypeChanged(ColorType) {
    this.data.Color = this.ColorType.Name;;
    console.log(this.ColorType);
    if (this.data.Color) {
      this.data.Color = this.ColorType.Name;
    }
  }

  get loader() {
    return colorLoader;
  }
}
