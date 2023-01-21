import { bindable } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var PurchaseOrderLoader = require('../../../../loader/purchase-order-external-loader');
//purchase-order-unposted-loader
const resource = 'master/products/byId';

export class NewPurchaseOrderItem {
  // @bindable selectedPurchaseOrder;

  itemsColumns = [
    { header: "Barang", value: "product" },
    { header: "Jumlah", value: "defaultQuantity" },
    { header: "Satuan", value: "defaultUom" },
    { header: "Jumlah", value: "dealQuantity" },
    { header: "Satuan", value: "dealUom" },
    { header: "Konversi", value: "conversion" },
    { header: "Harga", value: "priceBeforeTax" },
    { header: "Include Ppn?", value: "includePpn" },
    { header: "Keterangan", value: "remark" }
  ]

  activate(context) {
    console.log(context);
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    // this.useVat = this.context.context.options.useVat || false;
    this.isShowing = false;
    // if (this.data) {
    //   this.selectedPurchaseOrder = this.data;
    //   if (this.data.Details) {
    //     this.data.Items = this.data.Details;
    //     this.isShowing = true;
    //   }
    //   if (this.data.Items) {
    //     this.isShowing = true;
    //   }

    // }

    this.selectedPurchaseOrder = this.data.PurchaseOrderExternal;
    // this.filter={
    //   "UnitName":this.context.context.options.unitCode,
    //   "IsPosted":false
    // };
    this.filter = {
      "POCashType": "VB",
      "isPosted": true,
      "IsCreateOnVBRequest": false,
      "CurrencyCode": this.context.context.options.CurrencyCode
    };
  }

  get purchaseOrderLoader() {
    return PurchaseOrderLoader;
  }

  @bindable selectedPurchaseOrder;
  selectedPurchaseOrderChanged(newValue) {

    if (newValue) {
      this.isShowing = true;
      this.data.PurchaseOrderExternal = newValue;
      let items = [];
      for (var item of this.data.PurchaseOrderExternal.items) {
        console.log(item)
        for (var detail of item.details) {
          items.push(detail);
        }
      }

      this.data.PurchaseOrderExternal.items = items;
      // this.data.PurchaseOrderExternal.items = this.data.PurchaseOrderExternal.items.map((item) => {
      //   console.log(item);
      //   return
      // })
    } else {
      delete this.data.PurchaseOrderExternal;
    }


    // this._items = [];
    // if (newValue)
    //   if (newValue._id) {
    //     Object.assign(this.data, newValue);
    //     if (this.data.items) {

    //       for (var productList of this.data.items) {
    //         for (var proddetail of productList.details) {
    //           var itemData = {
    //             useVat: this.data.useVat,
    //             product: proddetail.product,
    //             defaultQuantity: proddetail.defaultQuantity,
    //             conversion: proddetail.conversion,
    //             priceBeforeTax: proddetail.priceBeforeTax,
    //             productRemark: proddetail.productRemark,
    //             dealUom: proddetail.dealUom,
    //             includePpn: proddetail.includePpn
    //           };
    //           this._items.push(itemData);
    //         }

    //       }

    //     }
    //     else {
    //       for (var productList of this.data.Items) {

    //         for (var proddetail of productList.Details) {
    //           var itemData = {
    //             useVat: this.data.useVat,
    //             product: proddetail.product,
    //             defaultQuantity: proddetail.defaultQuantity,
    //             conversion: proddetail.conversion,
    //             priceBeforeTax: proddetail.priceBeforeTax,
    //             productRemark: proddetail.productRemark,
    //             dealUom: proddetail.dealUom,
    //             includePpn: proddetail.includePpn
    //           };
    //           this._items.push(itemData);
    //         }

    //       }
    //     }



    //     // var productList = this.data.items.map((item) => { return item.product._id });
    //     // console.log(productList);
    //     // productList = [].concat.apply([], productList);
    //     // productList = productList.filter(function (elem, index, self) {
    //     //   return index == self.indexOf(elem);
    //     // })
    //     // var config = Container.instance.get(Config);
    //     // var endpoint = config.getEndpoint("core");
    //     // for(var a of this.data.items){
    //     //   a.defaultUom=a.product.uom;
    //     //   a.defaultQuantity=a.quantity;
    //     // }
    //     // await endpoint.find(resource, { productList})
    //     //   .then((result) => {
    //     //     for (var product of result.data) {

    //     //       var item = this.data.items.find((_item) => _item.product._id.toString() === product.Id.toString())
    //     //       if (item) {
    //     //         item.product.price = product.Price;
    //     //         item.productPrice=product.Price;
    //     //         if(item.quantity>0){
    //     //           this._items.push(item);
    //     //         }
    //     //       }
    //     //     }
    //     //   });
    //     this.isShowing = true;

    //     this.data.details = this._items;
    //   }
  }

  get getTotalPaid() {
    var result = 0;
    if (this.data.Items) {
      for (var productList of this.data.Items) {
        result += productList.priceBeforeTax * productList.dealQuantity;
      }
    }

    else {
      if (this.data.items) {
        for (var productList of this.data.items) {
          for (var proddetail of productList.details) {
            result += proddetail.priceBeforeTax * proddetail.defaultQuantity;
          }
        }
      }

    }
    this.data.TotalPaid = result;
    return result.toLocaleString('en-EN', { minimumFractionDigits: 2 });
  }

  toggle() {
    this.isShowing = !this.isShowing;
  }

  purchaseOrderView = (purchaseOrder) => {
    return purchaseOrder.no
  }

  unitView = (purchaseOrder) => {
    return purchaseOrder.prNo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
