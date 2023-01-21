import { bindable } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var PurchaseOrderLoader = require('../../../../loader/vb-request-po-external-loader');
//purchase-order-unposted-loader
const resource = 'master/products/byId';

export class PurchaseOrderItem {
    @bindable selectedPurchaseOrder;

    itemsColumns = [
        // { header: "Barang", value: "product" },
        // { header: "Jumlah", value: "defaultQuantity" },
        // { header: "Satuan", value: "defaultUom" },
        // { header: "Jumlah", value: "dealQuantity" },
        // { header: "Satuan", value: "dealUom" },
        // { header: "Konversi", value: "conversion" },
        // { header: "Harga", value: "priceBeforeTax" },
        // { header: "Include Ppn?", value: "includePpn" },
        // { header: "Keterangan", value: "remark" },
        "Barang",
        "Jumlah Default",
        "Satuan Default",
        "Jumlah Deal",
        "Satuan Deal",
        "Konversi",
        "Harga",
        "Include PPn?",
        "Unit",
        "Pasal PPh",
        "PPh Oleh"
    ]

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        // this.useVat = this.context.context.options.useVat || false;
        this.isShowing = false;
        // this._items = [];
        // if (this.data) {
        //   this.selectedPurchaseOrder = this.data;
        //   if (this.data.Details) {
        //     this.data.Items = this.data.Details;
        //     this.isShowing = true;
        //   }
        //   if (this.data.Items) {
        //     this.isShowing = true;
        //   }

        this.selectedPurchaseOrderExternal = this.data.PurchaseOrderExternal;

        // }
        // this.filter={
        //   "UnitName":this.context.context.options.unitCode,
        //   "IsPosted":false
        // };
        // console.log(this.context);

        let currencyCode = "";
        if (this.context.context.options.CurrencyCode)
            currencyCode = this.context.context.options.CurrencyCode;

        let division = "";
        if (this.context.context.options.Unit) {
            if (this.context.context.options.Unit.Division)
            // division = this.context.context.options.Unit.Division.Name;
                division = (this.context.context.options.TypePurchasing) ? this.context.context.options.TypePurchasing : this.context.context.options.Unit.Division.Name;
        }

        console.log(division);
        this.filter = {
            "currencyCode": currencyCode,
            "division": division
        };
    }

    get purchaseOrderLoader() {
        return PurchaseOrderLoader;
    }

    async selectedPurchaseOrderChanged(newValue) {
        this._items = [];
        if (newValue)
            if (newValue._id) {
                // newValue.IncomeTax = newValue.IncomeTax || newValue.incomeTax;
                // newValue.IncomeTaxBy = newValue.IncomeTaxBy || newValue.incomeTaxBy;
                Object.assign(this.data, newValue);
                if (this.data.items) {

                    for (var productList of this.data.items) {
                        for (var proddetail of productList.details) {
                            var itemData = {
                                useVat: this.data.useVat,
                                product: proddetail.product,
                                defaultQuantity: proddetail.defaultQuantity,
                                dealQuantity: proddetail.dealQuantity,
                                conversion: proddetail.conversion,
                                priceBeforeTax: proddetail.priceBeforeTax,
                                productRemark: proddetail.productRemark,
                                dealUom: proddetail.dealUom,
                                includePpn: proddetail.includePpn
                            };
                            this._items.push(itemData);
                        }

                    }

                } else {
                    for (var productList of this.data.Items) {

                        for (var proddetail of productList.Details) {
                            var itemData = {
                                useVat: this.data.useVat,
                                product: proddetail.product,
                                defaultQuantity: proddetail.defaultQuantity,
                                conversion: proddetail.conversion,
                                priceBeforeTax: proddetail.priceBeforeTax,
                                productRemark: proddetail.productRemark,
                                dealUom: proddetail.dealUom,
                                includePpn: proddetail.includePpn
                            };
                            this._items.push(itemData);
                        }

                    }
                }



                // var productList = this.data.items.map((item) => { return item.product._id });
                // console.log(productList);
                // productList = [].concat.apply([], productList);
                // productList = productList.filter(function (elem, index, self) {
                //   return index == self.indexOf(elem);
                // })
                // var config = Container.instance.get(Config);
                // var endpoint = config.getEndpoint("core");
                // for(var a of this.data.items){
                //   a.defaultUom=a.product.uom;
                //   a.defaultQuantity=a.quantity;
                // }
                // await endpoint.find(resource, { productList})
                //   .then((result) => {
                //     for (var product of result.data) {

                //       var item = this.data.items.find((_item) => _item.product._id.toString() === product.Id.toString())
                //       if (item) {
                //         item.product.price = product.Price;
                //         item.productPrice=product.Price;
                //         if(item.quantity>0){
                //           this._items.push(item);
                //         }
                //       }
                //     }
                //   });
                this.isShowing = true;

                this.data.details = this._items;
            }
    }

    // @bindable selectedPurchaseOrderExternal;
    // selectedPurchaseOrderExternalChanged(newValue, oldValue) {
    //   if (newValue) {
    //     this.data.PurchaseOrderExternal = newValue;
    //     let items = [];
    //     this.data.PurchaseOrderExternal.items.forEach((item) => {
    //       return item.details.forEach((detail) => {
    //         items.push({
    //           Product: detail.product,
    //           DefaultQuantity: detail.defaultQuantity,
    //           DealQuantity: detail.dealQuantity,
    //           DealUOM: detail.dealUom,
    //           Conversion: detail.conversion,
    //           Price: detail.pricePerDealUnit,
    //           UseVat: item.useVat
    //         })
    //       })
    //     });

    //     this.data.PurchaseOrderExternal.Details = items;
    //   } else {
    //     delete this.data.PurchaseOrderExternal;
    //   }
    // }

    get getTotalPaid() {
        var result = 0;
        if (this.data.Items) {
            for (var productList of this.data.Items) {
                result += productList.priceBeforeTax * productList.dealQuantity;
            }
        } else {
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
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    purchaseOrderView = (purchaseOrder) => {
        return purchaseOrder.No
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