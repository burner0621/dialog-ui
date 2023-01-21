import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

var BuyersLoader = require("../../../loader/buyers-loader");

@containerless()
@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(service, serviceCore, bindingSignaler, bindingEngine) {
    this.service = service;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.ReturnFrom && this.data.ReturnFrom.Id) {
      this.selectedReturnFrom = await this.serviceCore.getBuyerById(
        this.data.ReturnFrom.Id
      );
    }
  }

  doReturnDetailsInfo = {
    columns: ["Ex. Faktur Penjualan"],
    onAdd: function () {
      this.data.DOReturnDetails = this.data.DOReturnDetails || [];
      this.data.DOReturnDetails.push({});
    }.bind(this),
    onRemove: function () {
      this.context.DOReturnDetailsCollection.bind();
    }.bind(this),
  };
  itemOptions = {};

  doReturnTypeOptions = ["", "FR", "PR"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedReturnFrom;
  selectedReturnFromChanged(newValue, oldValue) {
    if (newValue) {
      this.data.ReturnFrom = {};
      this.data.ReturnFrom.Id = this.selectedReturnFrom.Id;
      this.data.ReturnFrom.Name = this.selectedReturnFrom.Name;
    } else {
      this.data.ReturnFrom.Id = null;
      this.data.ReturnFrom.Name = null;
    }
  }

  get buyersLoader() {
    return BuyersLoader;
  }
}
