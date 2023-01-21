import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine, Service)
export class ItemsWeft {
  @bindable Yarn;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.Yarn = {};
    this.formatData = "0,000.0000";
  }

  get yarnsWeft() {
    return YarnLoader;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    // this.Quantity = this.data.Quantity;
    // this.Information = this.data.Information;
    this.Yarn.Name = this.data.YarnName;
    // this.Yarn.Code = this.data.Code;
    // this.Yarn.Quantity = this.data.Quantity;
    // this.Yarn.Information = this.data.Information;
    // this.Yarn.Type = this.data.Type;
    if (this.data.Yarn) {
      var retrieveValue = this.data.Yarn;
      this.data.YarnId = retrieveValue.Id;
      this.Yarn = retrieveValue;
      this.data.Code = retrieveValue.Code;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Pakan, affected when Benang Pakan change
  async YarnChanged(newValue) {
    if (newValue) {
      this.data.Yarn = newValue;

      this.data.YarnId = newValue.Id ? newValue.Id : "";
      this.data.Code = newValue.Code ? newValue.Code : "";
      this.data.YarnName = newValue.Name ? newValue.Name : "";
      this.data.Quantity = 0;
      this.data.Information = "";
      this.data.Type = "Weft";
      if (this.options.Id) {
        this.data.FabricConstructionDocumentId = this.options.Id;
      }else{
        this.data.FabricConstructionDocumentId = "";
      }
    }
  }
}
