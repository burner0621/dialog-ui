import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";

// @containerless()
@customElement("au-timepicker") 
export class Timepicker {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // timepicker properties 
}
