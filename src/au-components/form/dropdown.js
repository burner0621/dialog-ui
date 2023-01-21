import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";

// @containerless()
@customElement("au-dropdown")
@inject(Element)
export class Dropdown {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable options;

  // dropdown properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) key;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) text;

  bind() {
    // console.log("dropdown.bind")
    // console.log(this.options)
  }
  
  constructor(element) {
    this.component = element;
  }

  @computedFrom("key", "text")
  get _selector() {
    var selector = { key: "key", text: "text" };
    if (this.key)
      selector.key = this.key;

    if (this.text)
      selector.text = this.text;
    return selector;
  }

  _matcher = (option, current) => {
    var result = false;
    if (!option || !current)
      return result;

    result = this._getSuggestionKey(option) === this._getSuggestionKey(current);//[this._selector.key] === current[this._selector.key];
    return result;
  }

  _getSuggestionText(suggestion) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.text) {
      return suggestion[this.text];
    }
    else
      return suggestion.toString();
  }

  _getSuggestionKey(suggestion) {
    if (!suggestion)
      return null;
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.key) {
      return suggestion[this.key];
    }
    else
      return suggestion;
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
