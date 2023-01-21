import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

import BuyerLoader from "../../../loader/buyers-loader";

@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  @bindable disp;
  @bindable packingUom = "KARUNG";
  @bindable weightUom = "KG";
  @bindable buyer;

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

  detailOptions = {};

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.data.DOAvalType = "Lokal";
    this.data.DOAvalCategory = "AVAL";
    this.error = this.context.error;

    if (this.data.Disp) {
      this.disp = this.data.Disp;
    }

    if (this.data.Buyer) {
      this.buyer = this.data.Buyer;
    }

    if (this.data.WeightUom) {
      this.detailOptions.WeightUom = this.data.WeightUom;
      this.weightUom = this.data.WeightUom;
    } else {
      this.detailOptions.WeightUom = this.weightUom;
      this.data.WeightUom = "KG";
    }

    if (this.data.PackingUom) {
      this.detailOptions.PackingUom = this.data.PackingUom;
      this.packingUom = this.data.PackingUom;
    } else {
      this.detailOptions.PackingUom = this.packingUom;
      this.data.PackingUom = "KARUNG";
    }

  }

  columns = ["Jenis Aval", "Jumlah Packing", "Berat"];
  addItemCallback = (e) => {
    this.data.DOAvalItems =
      this.data.DOAvalItems || [];
    this.data.DOAvalItems.push({});
  };


  doAvalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB", "SP", "SD"];;

  packingUomOptions = ["KARUNG"];

  weightUomOptions = ["KG"];


  dispChanged(newValue, OldValue) {
    this.data.Disp = this.disp;
  }

  weightUomChanged(newValue, oldValue) {
    if (this.weightUom) {
      this.detailOptions.WeightUom = this.weightUom;
      this.data.WeightUom = this.weightUom;
    }
  }

  buyerChanged(n, o) {
    if (this.buyer) {
      this.data.Buyer = this.buyer;
    } else {
      this.data.Buyer = null;
    }
  }

  packingUomChanged(newValue, oldValue) {
    if (this.packingUom) {
      this.detailOptions.PackingUom = this.packingUom;
      this.data.PackingUom = this.packingUom;
    }
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  get buyerLoader() {
    return BuyerLoader;
  }

}
