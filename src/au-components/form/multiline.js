import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
var STATE = require("./_state");

@customElement("au-multiline")
export class Multiline {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable options;

  @bindable editorState = STATE.VIEW;
  @bindable editorValue;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) keydown;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) stateChanged;

  _defaultOptions = {
    selectOnFocus: true
  } 

  // multiline properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) rows;

  bind() {
    this.placeholder = this.placeholder || "enter value";
    this._options = Object.assign(this._defaultOptions, this._options);
    this.rows = !this.rows || this.rows < 1 ? 3 : this.rows;
  } 

  onBlur(event) {
    this.editorState = STATE.VIEW;
  }

  onFocus(event) {
    this.editorState = STATE.EDIT;
    this.control = event.target;
  }

  editorStateChanged(newValue) {
    if (this.stateChanged)
      this.stateChanged(this);

    if (this.control && this.editorState === STATE.EDIT && this._options.selectOnFocus) {
      this.control.select();
    }
  }
} 
