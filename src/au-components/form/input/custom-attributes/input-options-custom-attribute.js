import {dynamicOptions, inject} from 'aurelia-framework';

@dynamicOptions
@inject(Element)
export class InputOptionsCustomAttribute {
  constructor(element){
    this.element = element;
  }

  propertyChanged(name, newOptions, oldOptions){    
    var options = newOptions || {};     
    for(var option of Object.getOwnPropertyNames(options))
    {
      var optionValue = options[option];
      this.element[option] = optionValue;
      this.element.setAttribute(option, optionValue); 
    }
  }
}
