import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { ServicePackingInventory } from "./../service";
import { DataForm } from "./../data-form";
let DeliveryNoteLoader = require("../../../../loader/material-delivery-note-weaving-loader");

@inject(ServicePackingInventory, BindingSignaler, BindingEngine, DataForm)
export class WeavingDetail {
  @bindable data;
  @bindable error;
  @bindable typeFaktur;
  @bindable SalesInvoiceItems;

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

  activate(item) {
    this.item = item;
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.Category = item.context.options.Category;
    this.BuyerId = item.context.options.BuyerId;
    this.HasSalesInvoice = item.context.options.HasSalesInvoice;

    this.PaymentType = item.context.options.PaymentType;
    this.shippingOutTableOptions.PaymentType = this.PaymentType;

    if (this.dataForm.data.SalesInvoiceType) {
      this.typeFaktur = this.dataForm.data.SalesInvoiceType;
    }

    if (this.data) {
      this.selectedDeliveryNote = {};
      this.selectedDeliveryNote.id = this.data.BonId;
      this.selectedDeliveryNote.code = this.data.BonNo;
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
    onAdd: function () {
      this.SalesInvoiceItems.bind();
      this.data.SalesInvoiceItems = this.data.SalesInvoiceItems || [];
      this.data.SalesInvoiceItems.push({});
    }.bind(this),
    onRemove: function () {
      if (this.SalesInvoiceItems) {
        this.SalesInvoiceItems.bind();
      }
    }.bind(this),
  };

  @bindable selectedDeliveryNote;
  async selectedDeliveryNoteChanged(newValue, oldValue) {
    if (newValue) {
      this.data.BonId = this.selectedDeliveryNote.id;
      this.data.BonNo = this.selectedDeliveryNote.code;
    } else {
      this.data.BonId = null;
      this.data.BonNo = null;
      this.data.SalesInvoiceItems = [];
    }
  }

  get deliveryNoteLoader() {
    return DeliveryNoteLoader;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }
}
