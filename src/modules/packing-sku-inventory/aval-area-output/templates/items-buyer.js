import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

@inject(BindingEngine, Service)
export class Items {
  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  avalTypes = ["", "Aval Printex", "Aval Batik Motif Kecil", "Aval Batik Motif Besar", "Aval Printing (10-49 cm)",
    "Aval Kain Kotor", "Aval Tali Kotor", "Aval Sambungan", "Aval Kain Head Cut", "Aval Solid",
    "Aval A (Lap Besar)", "Aval B (Lap Kecil)", "Aval Solid TR", "Aval Batik TW (karantina)"];

  qtyOutUnit = ["KRG", "KG"];

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.options = context.context.options;
    this.isEdit = this.options.isEdit;
    //   this.OrderIdFilter = {
    //     "OrderId": context.context.options.OrderId
    //   };

    this.readOnly = context.options.readOnly;

    if (this.data.avalInputId || this.data.id) {
      this.data.AvalItemId = this.data.avalItemId;
      this.data.AvalType = this.data.avalType;
      this.data.AvalCartNo = this.data.avalCartNo;
      this.data.AvalUomUnit = this.data.avalUomUnit;
      this.data.AvalOutSatuan = this.data.avalOutSatuan;
      this.data.AvalQuantity = this.data.avalQuantity;
      this.data.AvalQuantityKg = this.data.avalQuantityKg;
      this.selectedAvalType = this.data.avalType;
      this.data.AvalOutQuantity = this.data.avalOutQuantity;
    } else {
      var selectedAvalType = {};
      selectedAvalType.AvalType = this.data.AvalType;
      selectedAvalType.AvalUomUnit = this.data.AvalUomUnit;
      selectedAvalType.AvalOutQuantity = this.data.AvalOutQuantity;
      selectedAvalType.AvalOutSatuan = this.data.AvalOutSatuan;
      selectedAvalType.AvalQuantity = this.data.AvalQuantity;
      selectedAvalType.AvalQuantityKg = this.data.AvalQuantityKg;


      this.selectedAvalType = this.data.AvalType;

    }
  }
  @bindable selectedAvalType
  selectedAvalTypeChanged(n, o) {
    this.service.getAvalInfoByType(n).then(result => {
      if (result.length > 0) {
        this.data.AvalUomUnit = result[0].avalUomUnit;
        this.data.AvalQuantityKg = result[0].avalQuantityKg;
        this.data.AvalType = result[0].avalType;
        this.data.AvalQuantity = result[0].avalQuantity;
      }
    });
  }
}
