import { inject, bindable, computedFrom } from 'aurelia-framework'

export class ProductionOrderItem {
  @bindable product;

  packingItems = [];
  packUnit = ["ROLL", "PIECE", "POTONGAN"];
  remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
  activate(context) {
    this.context = context;
    this.data = context.data;

    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.isEdit = this.contextOptions.isEdit;
    this.isTransit = this.destinationArea == "TRANSIT";

    if (this.isEdit) {
      this.data.IsSave = true;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  @bindable qtyPacking;
  qtyPackingChanged(n, o) {
    if (this.qtyPacking) {
      this.data.packagingQty = this.qtyPacking;
      this.data.balance = this.data.packagingQty * this.data.quantity;
    }
  }

  @bindable qty;
  qtyChanged(n, o) {
    if (this.qty) {
      this.data.qty = this.qty;
      this.data.quantity = this.qty;
      this.data.balance = this.data.packagingQty * this.data.quantity;
    }
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }
}