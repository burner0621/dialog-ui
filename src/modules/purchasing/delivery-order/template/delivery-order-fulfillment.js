import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable deliveredQuantity;
  activate(context) {
    this.context = context;
    // console.log(context.data);
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isEdit = this.context.context.options.isEdit || false;

    // if (this.isEdit) {
    //   var poItem = this.data.purchaseOrder.items.find(item => item.product._id.toString() === this.data.productId.toString())
    //   var qty = poItem.fulfillments
    //     .map((fulfillment) => fulfillment.deliveryOrderDeliveredQuantity)
    //     .reduce((prev, curr, index) => {
    //       if (index === (poItem.fulfillments.length - 1)) {
    //         return prev + 0
    //       } else {
    //         return prev + curr
    //       }
    //     }, 0);

    //   var correctionQty = poItem.fulfillments
    //     .map(itemFulfillmentsPO => {
    //       if (itemFulfillmentsPO.correction) {
    //         var cQty = itemFulfillmentsPO.correction
    //           .map(c => {
    //             if (c.correctionRemark) {
    //               if (c.correctionRemark === "Koreksi Jumlah") {
    //                 return c.correctionQuantity;
    //               } else {
    //                 return 0;
    //               }
    //             } else {
    //               return 0;
    //             }
    //           })
    //           .reduce((prev, curr, index) => {
    //             return prev + curr;
    //           }, 0);
    //         return cQty;
    //       } else {
    //         return 0;
    //       }
    //     })
    //     .reduce((prev, curr, index) => {
    //       return prev + curr;
    //     }, 0);

    //   this.data.remainingQuantity = poItem.dealQuantity - qty - correctionQty;
    // }

    if (this.data) {
      this.deliveredQuantity = this.data.deliveredQuantity;
      this.data.purchaseOrderQuantity=this.data.purchaseOrderQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    } else {
      this.deliveredQuantity = 0;
    }
    
    this.deliveredQuantity=this.deliveredQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    this.warning();
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.code} - ${product.name}`
  }

  deliveredQuantityChanged(newValue) {
    if (typeof newValue === "number") {
      this.data.deliveredQuantity = newValue
      this.warning();
    } else {
      if (this.isWarning) {
        this.isWarning = false;
      }
      if (newValue === null) {
        this.deliveredQuantity = 0
      } else {
        this.deliveredQuantity = this.data.deliveredQuantity;
      }
    }
  }

  warning(){
    if (!this.options.readOnly) {
      // if (this.data.remainingQuantity < this.data.deliveredQuantity) {
      if (this.data.purchaseOrderQuantity < this.data.deliveredQuantity) {
        this.isWarning = true
      }
      else {
        this.isWarning = false;
      }
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}