import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServicePackingInventory } from "./../service";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

@inject(Service, ServicePackingInventory, BindingEngine, BindingSignaler)
export class DoReturnDetail {
  @bindable data;
  @bindable error;
  @bindable ItemCollections;

  detailItemOptions = {};
  itemOptions = {};

  constructor(
    service,
    servicePackingInventory,
    bindingEngine,
    bindingSignaler
  ) {
    this.service = service;
    this.servicePackingInventory = servicePackingInventory;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.selectedSalesInvoice = this.data.SalesInvoice || null;
  }

  returnDetailsInfo = {
    columns: ["Ex. DO Penjualan"],
  };

  doReturnItemsInfo = {
    columns: [
      "Ex. Bon Pengiriman Barang Jadi",
      "Konstruksi",
      "Jenis/Kode",
      "Pcs/Roll/Pt",
      "Mtr/Yds",
    ],
    onRemove: function () {
      if (this.ItemCollections) {
        this.ItemCollections.bind();
      }
      // this.context.ReturnItemsCollection.bind();
    }.bind(this),
  };

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedSalesInvoice;
  async selectedSalesInvoiceChanged(newValue, oldValue) {
    if (newValue) {
      this.data.SalesInvoice = this.selectedSalesInvoice;

      var salesInvoice = await this.service.getSalesInvoiceById(newValue.Id);

      var temp_detailItem = [];
      var temp_doReturnItem = [];

      for (var detail of salesInvoice.SalesInvoiceDetails) {
        var so = await this.servicePackingInventory.getByShippingOutputId(
          detail.ShippingOutId
        );
        if (!this.data.Id) {
          var detailItemData = {
            DOSalesId: so.deliveryOrder.id,
            DOSalesNo: so.deliveryOrder.no,
          };

          temp_detailItem.push(detailItemData);

          for (var item of detail.SalesInvoiceItems) {
            var itemData = {
              ShippingOutId: detail.ShippingOutId,
              BonNo: detail.BonNo,
              ProductId: item.ProductId,
              ProductCode: item.ProductCode,
              ProductName: item.ProductName,
              QuantityPacking: item.QuantityPacking,
              QuantityItem: item.QuantityItem,
              PackingUom: item.PackingUom,
              ItemUom: item.ItemUom,
            };
            temp_doReturnItem.push(itemData);
          }
        }
      }
      this.data.DOReturnDetailItems = temp_detailItem;
      this.data.DOReturnItems = temp_doReturnItem;
    } else {
      this.data.DOReturnDetailItems = [];
      this.data.DOReturnItems = [];
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }
}
