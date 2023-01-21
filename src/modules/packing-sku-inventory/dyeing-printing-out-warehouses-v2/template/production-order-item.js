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
    //console.log(this.data);
    this.data.productPackingCodeList = this.getProductPackingCodeList(this.data);
    this.error = context.error;
    this.isShowing = false;
    //this.items = this.context.context.items;
    // console.log(this.error);
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.isEdit = this.contextOptions.isEdit;
    this.destinationArea = this.contextOptions.destinationArea;
    this.isTransit = this.destinationArea == "TRANSIT";
    this.listOptions = {
      isEdit: this.isEdit,
      destinationArea: this.destinationArea
    };
    if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
      this.selectedDeliveryOrderSales = {};

      this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
      this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
      this.selectedDeliveryOrderSales.DestinationBuyerName = this.data.destinationBuyerName;
      this.selectedDeliveryOrderSales.DOSalesType  = this.data.deliveryOrderSalesType;

    }
    if (this.data.id == null) {
      this.data.isremovable = true;
    }
    //view detail
    if (this.options.readOnly && this.isEdit || this.isEdit) {
      this.qtyPacking = this.data.packagingQty;
    }
    //console.log(this.qtyPacking);
    // if (this.data.qty) {
    //   this.qty = this.data.qty;
    // }

    if (this.data.quantity) {
      this.qty = this.data.quantity;
    }

    this.data.qtyOut = this.qtyPacking * this.qty;
    //console.log(this.data.qtyOut);

    this.barcodeColumns = [
      "Kode Packing"
    ];
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  get doSalesLoader() {
    return DOSalesLoader;
  }

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  @bindable selectedDeliveryOrderSales;
  selectedDeliveryOrderSalesChanged(newValue, oldValue) {
    if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
      this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
      this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
      this.data.destinationBuyerName = this.selectedDeliveryOrderSales.DestinationBuyerName;
      this.data.deliveryOrderSalesType = this.selectedDeliveryOrderSales.DOSalesType;
      console.log(this.selectedDeliveryOrderSales);
    }
  }
  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  @bindable qtyPacking;
  qtyPackingChanged(n, o) {
    if (this.qtyPacking) {
      this.data.packagingQty = this.qtyPacking;
      this.data.balance = this.data.packagingQty * this.data.quantity;
      this.data.qtyOut = this.data.packagingQty * this.data.quantity;
    }
  }

  @bindable qty;
  qtyChanged(n, o) {
    if (this.qty) {
      this.data.qty = this.qty;
      this.data.quantity = this.qty;
      this.data.balance = this.data.packagingQty * this.data.quantity;
      this.data.qtyOut = this.data.packagingQty * this.data.quantity;
    }
    console.log(this.qty);
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  getProductPackingCodeList(data) {

    const productPackingCodeRemains = data.productPackingCodeRemains != null ? data.productPackingCodeRemains : data.productPackingCode;

    if(productPackingCodeRemains !== null && productPackingCodeRemains !== ""){
      return productPackingCodeRemains.split(',').map(d => {
        return {
          packingCode: d
        }
      });
    }
    return [];
  }

  someCallbackFunction() {
    this.qtyPacking = this.data.productPackingCodeList.filter(d => d.IsSave).length;

    //console.log(this.qtyPacking);
  };

  @bindable qtyPacking
  qtyPackingChanged(newValue, olderValue) {
        // if (this.dataForm.context.isCreate) {
            console.log(newValue);
            console.log(olderValue);
        if (newValue != olderValue) {
            this.data.qtyOut = this.qty * newValue;

            //console.log(this.qtyPacking);

            this.data.packagingQty = this.qtyPacking;

            //console.log(this.data.packagingQty);

          
            // if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {

            //     var sum = this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)
            //         .reduce((a, b) => +a + +b.qtyOut, 0);
            //     for (var item of this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)) {
            //         item.balanceRemains = item.previousBalance - sum;

            //     }
            // }
        }
    }

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