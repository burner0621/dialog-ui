import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework"; 
 
@customElement("au-datepicker") 
export class Datepicker{
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options; 
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
 
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  bind() { 
    this.format = this.format || "DD-MMM-YYYY";
  }

  @computedFrom("min", "max")
  get inputOptions() {
    return {
      "min": this.min,
      "max": this.max
    }
  }
}
