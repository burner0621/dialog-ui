import { bindable } from "aurelia-framework";
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class LocalItem {


  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (this.data.ProductionOrder) {
      this.selectedProductionOrder = this.data.ProductionOrder;
    }
  }


  get productionOrderLoader() {
    return ProductionOrderLoader;
  }

  @bindable selectedProductionOrder;
  selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedProductionOrder) {

      this.data.ProductionOrder = this.selectedProductionOrder;
      for (var detailItem of this.selectedProductionOrder.Details) {

        this.data.ColorRequest = detailItem.ColorRequest;
        this.data.ColorTemplate = detailItem.ColorTemplate;
        this.data.ConstructionName = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth} / ${detailItem.ColorRequest}`

      }

    } else {
      this.data.ProductionOrder = null;
      this.data.ColorRequest = null;
      this.data.ColorTemplate = null;
      this.data.ConstructionName = null;
    }

  }
}
