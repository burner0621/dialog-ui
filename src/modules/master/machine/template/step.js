import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var StepLoader = require('../../../../loader/step-loader');

export class Step {

  @bindable step;

  activate(context) {
    this.data = context.data;
    this.step = this.data ? this.data : {};
    this.error = context.error;
    this.options = context.options;
  }

  autocompleteOption = {
    control: {
      length: 12
    }
  }

  stepChanged(newValue) {
    if (newValue) {
      this.data = Object.assign(this.data, newValue);
      this.data.StepId = newValue.Id;
      this.data.Id = 0;
      console.log(this.data)
      // this.data.stepId = newValue.Id;
    }
    else {
      this.data = {};
    }
  }


  get stepLoader() {
    return StepLoader;
  }
}
