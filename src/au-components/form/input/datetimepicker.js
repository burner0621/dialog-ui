import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework"; 
 
@customElement("au-datetimepicker") 
export class DateTimepicker{
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options; 
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
 
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  bind() { 
    this.format = this.format || "DD-MMM-YYYY HH:mm";
  }
}
