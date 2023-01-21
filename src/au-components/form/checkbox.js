import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";

// @containerless()
@customElement("au-checkbox")
@inject(Element)
export class Checkbox {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) disabled;
  @bindable options; 

  bind() {
    // console.log("dropdown.bind")
    // console.log(this.options)
  }
  
  constructor(element) {
    this.component = element;
  } 

  // changeCallback(event) {
  //   console.log(`changeCallback: ${JSON.stringify(this.value)}`);
  //   console.log(event)
  //   if (event.isTrusted)
  //     event.stopPropagation();
  // }

  valueChanged(e) {
    // console.log("valueChanged");
    // var event = new Event("change");
    // if (this.component)
    //   this.component.dispatchEvent(event);
  }
}
