import { transient, bindable, bindingMode, noView, inject, computedFrom, customElement, containerless } from "aurelia-framework";

@inject(Element)
@containerless()
@customElement("au-layout")
export class _Layout {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    this.element = element;
  }

  bind(context) {

  }

  @computedFrom("error")
  get hasError() {
    return (this.error || "").toString().length > 0;
  }

  @computedFrom("label", "options.label.length", "options.label.align", "options.control.length")
  get _label() {
    var defaultLength = (this.label || "").toString().length > 0 ? 3 : 0;
    var _options = Object.assign({}, (this.options || { label: {} }).label || {});
    _options.length = _options.length || defaultLength;
    _options.align = (_options.align || "right").toLowerCase() === "right" ? "right" : "left";

    // console.log(`${this.label} : ${JSON.stringify(_options)}`)
    // console.log(JSON.stringify(this.options));
    return _options;
  }

  @computedFrom("_label.length")
  get hasLabel() {
    var hasLabel = this._label.length > 0;

    // console.log(JSON.stringify(this._label));
    return hasLabel;
  }

  @computedFrom("hasLabel")
  get _control() {
    var defaultLength = this.hasLabel ? 12 - this._label.length : 12;
    var _options = Object.assign({}, (this.options || { control: {} }).control || {});
    _options.length = _options.length || defaultLength;
    // console.log(`${this.label} : ${JSON.stringify(_options)} : ${defaultLength} : ${this.hasLabel}`)
    return _options;
  }

  @computedFrom("hasLabel", "hasError", "_label.length", "_label.align", "_control.length")
  get _style() {
    var style = {
      group: "form-group",
      label: "",
      control: `col-sm-${this._control.length}`
    };

    if (this.hasError)
      style.group += ` has-error`;
    if (this.hasLabel)
      style.label = `col-sm-${this._label.length} text-${this._label.align} au-layout control-label`;

    style.control = `col-sm-${this._control.length}`;
    // console.log(`${this.label} : ${JSON.stringify(this._label)} : ${JSON.stringify(style)} : ${this.hasLabel}`)
    return style;
  }
}
