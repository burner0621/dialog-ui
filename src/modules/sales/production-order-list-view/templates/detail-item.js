import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var colorLoader = require('../../../../loader/color-type-loader');

export class DetailItem {

  @bindable ColorType;

  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.ColorType = this.data.ColorType;
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  // setColorTypeId(newValue) {
  //   if (newValue) {
  //     this.data.ColorType = newValue;
  //     // this.data.colorTypeId = newValue.Id;
  //   }
  //   else {
  //     this.data.ColorType = {};
  //     // this.data.colorTypeId = {};
  //     this.data.ColorType = null;
  //   }
  // }

  ColorTypeChanged() {
    if (this.ColorType) {
      this.data.ColorType = this.ColorType;
    } else {
      this.data.ColorType = {};
      // this.data.colorTypeId = {};
      this.data.ColorType = null;
    }
  }

  get loader() {
    return colorLoader;
  }
}
