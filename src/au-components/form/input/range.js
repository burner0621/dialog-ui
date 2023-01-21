import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import numeral from 'numeral';
var STATE = require("../_state");

@customElement("au-range") 
export class Range {
  // input properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;

  // range properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) step;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  @computedFrom("min", "max", "step")
  get inputOptions() { 
    return {
      "min": this.min,
      "max": this.max,
      "step": this.step,
      "class": "form-control text-right"
    }
  }

  bind() {
    this.value = this.value || 0;
    this.editorValue = this.value || 0;
    this.format = this.format || "0,000.00";
  } 
} 
