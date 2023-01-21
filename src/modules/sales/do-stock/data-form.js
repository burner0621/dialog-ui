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
  @bindable packingUom;
  @bindable lengthUom;
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
    this.data.DOStockCategory = "STOCK";
    this.error = this.context.error;

    if (this.data.Disp) {
      this.disp = this.data.Disp;
    }

    if (this.data.Buyer) {
      this.buyer = this.data.Buyer;
    }

    if (this.data.LengthUom) {
      this.detailOptions.LengthUom = this.data.LengthUom;
      this.lengthUom = this.data.LengthUom;
    }

    if (this.data.PackingUom) {
      this.detailOptions.PackingUom = this.data.PackingUom;
      this.packingUom = this.data.PackingUom;
    }

    if (this.data.Type) {
      this.type = this.data.Type;
    }
  }

  columns = ["No. SPP", "Material Konstruksi", "Jenis/Code", "Jumlah Packing","Panjang"];
  addItemCallback = (e) => {
    this.data.DOStockItems =
      this.data.DOStockItems || [];
    this.data.DOStockItems.push({});
  };


  doStockOptions = ["", "US", "UP", "UK", "RK", "USS", "UKS", "UPS", "JS", "JB", "SP", "SD", "KKP", "KKF"];;

  packingUomOptions = ["", "Roll", "PCS", "PT", "Carton"];

  lengthUomOptions = ["", "YDS", "MTR"];

  @bindable type;
  typeChanged(n, o) {
    if (this.type) {
      this.data.Type = this.type;
      if (this.data.Type == "KKP" || this.data.Type == "KKF") {
        this.data.DOStockType = "Ekspor";
      } else {
        this.data.DOStockType = "Lokal";
      }
    } else {
      this.data.Type = null
      this.data.DOStockType = null;
    }
  }

  dispChanged(newValue, OldValue) {
    this.data.Disp = this.disp;
  }

  lengthUomChanged(newValue, oldValue) {
    if (this.lengthUom) {
      this.detailOptions.LengthUom = this.lengthUom;
      this.data.LengthUom = this.lengthUom;
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
