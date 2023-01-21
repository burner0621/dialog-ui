import { inject, bindable, computedFrom } from 'aurelia-framework'
let DOSalesLoader = require("../../../../loader/do-stock-dyeingprinting-loader");

export class ProductionOrderItem {
  @bindable product;

  // isAval = false;
  // remarks = [];
  packingItems = [];
  packUnit = ["ROLL", "PIECE", "POTONGAN"];
  remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
  activate(context) {
    this.context = context;
    this.data = context.data;
    console.log(this.context);
    this.error = context.error;

    //this.items = this.context.context.items;
    // console.log(this.error);
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.isEdit = this.contextOptions.isEdit;
    this.destinationArea = this.contextOptions.destinationArea;
    this.isTransit = this.destinationArea == "TRANSIT";
    //this.qtyPiece = this.data.QuantityPiece;
   // this.qty = this.Quantity;
    // if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
    //   this.selectedDeliveryOrderSales = {};

    //   this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
    //   this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
    //   this.selectedDeliveryOrderSales.DestinationBuyerName = this.data.destinationBuyerName;
      
    // }
    if (this.data.id == null){
      this.data.isremovable = true;
    }
    // if (this.data.packagingQty) {
    //   this.qtyPacking = this.data.packagingQty;
    // }

    // // if (this.data.qty) {
    // //   this.qty = this.data.qty;
    // // }

    // if (this.data.quantity) {
    //   this.qty = this.data.quantity;
    // }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  // get doSalesLoader() {
  //   return DOSalesLoader;
  // }

 // doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  // @bindable selectedDeliveryOrderSales;
  // selectedDeliveryOrderSalesChanged(newValue, oldValue) {
  //   if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
  //     this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
  //     this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
  //     this.data.destinationBuyerName = this.selectedDeliveryOrderSales.DestinationBuyerName;
  //     console.log(this.selectedDeliveryOrderSales);
  //   }
  // }
  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  // @bindable qtyPacking;
  // qtyPackingChanged(n, o) {
  //   if (this.qtyPacking) {
  //     this.data.packagingQty = this.qtyPacking;
  //     this.data.balance = this.data.packagingQty * this.data.quantity;
  //   }
  // }

  // @bindable qty;
  // qtyChanged(n, o) {
  //   if (this.qty) {
  //     this.data.qty = this.qty;
  //     this.data.quantity = this.qty;
  //     this.data.balance = this.data.packagingQty * this.data.quantity;
  //   }
  // }
  // copycallback(item){
  //   console.log(item);
  //   var itemIndex = this.items.indexOf(item);
  //   // console.log(item);
  //   var objCopy = Object.assign({}, item);
  //   delete objCopy.id;
  //   delete objCopy.Id;
  //   this.context.context.items.splice(itemIndex + 1, 0, objCopy);

  //   if(this.errors && this.errors.length > 0) {
  //     var error = Object.assign({}, this.errors[itemIndex]);
  //     this.errors.splice(itemIndex + 1, 0, error);
  //   }
  // }
}