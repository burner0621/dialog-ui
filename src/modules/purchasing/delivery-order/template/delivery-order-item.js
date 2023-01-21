import {bindable} from 'aurelia-framework'
var PurchaseOrderExternalLoader = require('../../../../loader/purchase-order-external-unused-loader');

export class DeliveryOrderItem {
  @bindable selectedPurchaseOrderExternal;

  itemsColumns = [
    { header: "Nomor PR", value: "purchaseOrder" },
    { header: "Barang", value: "product" },
    { header: "Dipesan", value: "purchaseOrderQuantity" },
    { header: "Satuan", value: "purchaseOrderUom" },
    { header: "Diterima", value: "deliveredQuantity" },
    { header: "Catatan", value: "remark" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.filter = this.context.context.options.supplierCode ? { "SupplierCode": this.context.context.options.supplierCode } : {};
    this.isEdit = this.context.context.options.isEdit || false;
    this.isShowing = false;
    if (this.data) {
      this.selectedPurchaseOrderExternal = this.data.purchaseOrderExternal;
      if (this.data.fulfillments) {
        this.isShowing = true;
      }
    }
  }

  get purchaseOrderExternalLoader() {
    return PurchaseOrderExternalLoader;
  }

  selectedPurchaseOrderExternalChanged(newValue) {
    if (newValue === null) {
      this.data.fulfillments = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue._id) {
      // this.data.purchaseOrderExternal = newValue;
      // this.data.purchaseOrderExternalId = newValue._id;
      // var doFulfillments = this.data.fulfillments || [];
      // var poExternal = this.data.purchaseOrderExternal || {};
      // var poCollection = poExternal.items || [];
      // var fulfillments = [];
      // for (var purchaseOrder of poCollection) {
      //   for (var poItem of purchaseOrder.items) {
      //     var correctionQty = [];
      //     poItem.fulfillments.map((fulfillment) => {
      //       if (fulfillment.correction) {
      //         fulfillment.correction.map((correction) => {
      //           if (correction.correctionRemark == "Koreksi Jumlah") {
      //             correctionQty.push(correction.correctionQuantity < 0 ? correction.correctionQuantity * -1 : correction.correctionQuantity)
      //           }
      //         })
      //       }
      //     })

      //     var isQuantityCorrection = correctionQty.length > 0;

      //     if ((poItem.dealQuantity - poItem.realizationQuantity) > 0) {
      //       var deliveredQuantity = (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poItem.dealQuantity - poItem.realizationQuantity);
      //       var remainingQuantity = poItem.dealQuantity - poItem.realizationQuantity;
      //       if (isQuantityCorrection) {
      //         deliveredQuantity += correctionQty.reduce((prev, curr) => prev + curr);
      //         remainingQuantity += correctionQty.reduce((prev, curr) => prev + curr);
      //       }
      //       var fulfillment = {
      //         purchaseOrderId: purchaseOrder._id,
      //         purchaseOrder: purchaseOrder,
      //         productId: poItem.product._id,
      //         product: poItem.product,
      //         purchaseOrderQuantity: poItem.dealQuantity,
      //         purchaseOrderUom: poItem.dealUom,
      //         remainingQuantity: remainingQuantity,
      //         deliveredQuantity: deliveredQuantity,
      //         remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
      //       };
      //       fulfillments.push(fulfillment);
      //     }
      //     else if (isQuantityCorrection) {
      //       var fulfillment = {
      //         purchaseOrderId: purchaseOrder._id,
      //         purchaseOrder: purchaseOrder,
      //         productId: poItem.product._id,
      //         product: poItem.product,
      //         purchaseOrderQuantity: poItem.dealQuantity,
      //         purchaseOrderUom: poItem.dealUom,
      //         remainingQuantity: poItem.dealQuantity + correctionQty[correctionQty.length - 1],
      //         deliveredQuantity: (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poItem.dealQuantity - poItem.realizationQuantity) + correctionQty.reduce((prev, curr) => prev + curr),
      //         remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
      //       };
      //       fulfillments.push(fulfillment);
      //     }
      //   }
      // }
      // this.data.fulfillments = doFulfillments.length > 0 ? doFulfillments : fulfillments;
      // console.log(this.data.fulfillments);
      // this.error = {};
      // this.isShowing = true;


      this.data.purchaseOrderExternal = newValue;
      this.data.fulfillments = [];
      for (var item of newValue.items) {
        for (var detail of item.details) {
          var fulfillment = {
            EPODetailId: detail._id,
            POItemId: detail.poItemId,
            purchaseOrder: { purchaseRequest: { _id: item.prId, no: item.prNo, unit: item.unit } },
            PRItemId: detail.prItemId,
            product: detail.product,
            purchaseOrderQuantity: detail.dealQuantity,
            purchaseOrderUom: detail.dealUom,
            deliveredQuantity: detail.dealQuantity - detail.doQuantity,
            // remark: detail.productRemark
          };
          this.data.fulfillments.push(fulfillment);
        }
      }
      this.error = {};
      this.isShowing = true;
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderExternalView = (purchaseOrderExternal) => {
    return purchaseOrderExternal.no
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}