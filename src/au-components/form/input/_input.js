import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";
var STATE = require("../_state");

@containerless()
@customElement("au-input")
@inject(Element)
export class _Input {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) inputOptions;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) disabled;

  @bindable editorState = STATE.VIEW;
  @bindable type;
  element;
  invoke = false;

  constructor(component) {
    this.component = component;
  }

  _defaultOptions = {
    selectOnFocus: true
  }

  bind() {
    this.placeholder = this.placeholder || "enter value";
    this._options = Object.assign(this._defaultOptions, this._options);
  }

  onBlur(event) {
    this.editorState = STATE.VIEW;
  }

  onFocus(event) {
    this.editorState = STATE.EDIT;
  }

  editorStateChanged(newValue, oldValue) {
    dispatchCustomEvent("statechange", this.component, this);
  }

  @computedFrom("editorState", "_options.selectOnFocus")
  get select() {
    return this.editorState === STATE.EDIT && this._options.selectOnFocus
  }
}
