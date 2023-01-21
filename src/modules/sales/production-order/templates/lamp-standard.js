import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var lampLoader = require('../../../../loader/lamp-standard-loader');

export class LampStandard {

  @bindable LampStandards;

  activate(context) {
    this.data = context.data;
    this.LampStandards = this.data;
    this.error = context.error;
    this.options = context.options;
  }

  autocompleteOption = {
    control: {
      length: 12
    }
  }

  LampStandardsChanged(newValue) {
    if (this.LampStandards) {
      this.data.LampStandardId = this.LampStandards.Id;
      this.data.Name = this.LampStandards.Name;
      this.data.Code = this.LampStandards.Code;
      this.data.Description = this.LampStandards.Description;
    }
    else {
      this.data = {};
      this.data = null;
      // this.data.lampStandardId = {};
    }
  }

  get loader() {
    return lampLoader;
  }
}
