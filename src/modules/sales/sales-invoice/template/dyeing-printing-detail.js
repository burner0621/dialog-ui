import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { ServicePackingInventory } from "./../service";
import { DataForm } from "./../data-form";
let ShippingOutSalesLoader = require("../../../../loader/output-shipping-sales-loader");

@inject(ServicePackingInventory, BindingSignaler, BindingEngine, DataForm)
export class DyeingPrintingDetail {
  @bindable data;
  @bindable error;
  @bindable typeFaktur;

  shippingOutTableOptions = {};

  constructor(
    servicePackingInventory,
    bindingSignaler,
    bindingEngine,
    dataForm
  ) {
    this.servicePackingInventory = servicePackingInventory;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
    this.dataForm = dataForm;
  }
  shippingQuery = {};
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.Category = item.context.options.Category;
    this.BuyerId = item.context.options.BuyerId;
    this.HasSalesInvoice = item.context.options.HasSalesInvoice;

    this.PaymentType = item.context.options.PaymentType;
    this.shippingOutTableOptions.PaymentType = this.PaymentType;

    this.shippingQuery = {
      BuyerId: this.BuyerId,
      HasSalesInvoice: this.HasSalesInvoice,
    };

    if (this.data) {
      this.selectedShippingOut = {};
      this.selectedShippingOut.id = this.data.ShippingOutId;
      this.selectedShippingOut.bonNo = this.data.BonNo;
    }

    if (this.dataForm.data.SalesInvoiceType) {
      this.typeFaktur = this.dataForm.data.SalesInvoiceType;
    }
  }

  salesInvoiceItemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Satuan Packing",
      "Jumlah",
      "Satuan",
      "Nilai Konversi",
      "Harga Satuan",
      "Total Harga",
    ],
  };

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedShippingOut;
  async selectedShippingOutChanged(newValue, oldValue) {
    if (newValue) {
      this.data.ShippingOutId = this.selectedShippingOut.id;
      this.data.BonNo = this.selectedShippingOut.bonNo;

      if (!this.data.Id) {
        this.data.SalesInvoiceItems = [];
        var shippingOut = this.selectedShippingOut.shippingProductionOrders;
        for (var item of shippingOut) {
          if (item.uomUnit == "MTR") {
            var convertValue = parseInt(item.qty * (10936 / 10000));
            var convertUnit = "YARD";
          } else if (item.uomUnit == "YARD") {
            var convertValue = parseInt(item.qty / (10936 / 10000));
            var convertUnit = "MTR";
          } else {
            var convertValue = 0;
            var convertUnit = null;
          }
          var siData = {
            ProductId: item.id,
            ProductName: item.construction + " / " + item.color,
            QuantityPacking: item.qtyPacking,
            PackingUom: item.packing,
            QuantityItem: item.qty,
            ItemUom: item.uomUnit,
            ConvertValue: convertValue,
            ConvertUnit: convertUnit,
          };
          this.data.SalesInvoiceItems.push(siData);
        }
      }
    } else {
      this.data.ShippingOutId = null;
      this.data.BonNo = null;
      this.data.SalesInvoiceItems = [];
    }
  }

  get shippingOutSalesLoader() {
    return ShippingOutSalesLoader;
  }
}
