import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

export class Type {
  @bindable type;
  
  typeOptions = [];

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.typeOptions = context.context.options.typeItems;

    if (this.data.Type) {
      this.type = this.data.Type;
    }
  }

  typeChanged(n, o) {
    if (this.type) {
      this.data.Type = this.type;
    }
  }
  

  // stepChanged(newValue){
  //   if (newValue){
  //     this.data.step = newValue;
  //     this.data.stepId = newValue._id;
  //   }
  //   else{
  //     this.data.step = {};
  //     this.data.stepId = {};
  //   }
  // }


  // get stepLoader() {
  //   return StepLoader;
  // }
}
