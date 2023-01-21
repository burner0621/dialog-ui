import { dynamicOptions, inject } from 'aurelia-framework';

@inject(Element)
export class SelectOnFocusCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue, oldValue) {
    // console.log(`state:${newValue}, input.value: ${this.element.value}`)
    var select = newValue;
    if (select)
      this.element.select();
    // console.log("select-on-focus");
  }
}
