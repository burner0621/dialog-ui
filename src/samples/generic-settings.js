import { bindable, bindingMode, computedFrom} from "aurelia-framework";

export class GenericSettings { 
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error; 
 
  settingOptions = {
    label: {
      length: 4,
      align: "right"
    },
    control: {
      length: 8
    }
  }
  alignments = ["right", "left"];

  @computedFrom("options.label.length")
  get controlMaxLength() {
    return 12 - this.options.label.length;
  }

  @computedFrom("options.control.length")
  get labelMaxLength() {
    return 12 - this.options.control.length;
  }
}
