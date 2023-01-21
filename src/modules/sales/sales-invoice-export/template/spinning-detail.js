import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { ServicePackingInventory } from "./../service";
import { DataForm } from "./../data-form";
let DeliveryNoteLoader = require("../../../../loader/material-delivery-note-spinning-loader");

@inject(ServicePackingInventory, BindingSignaler, BindingEngine, DataForm)
export class SpinningDetail {
  @bindable data;
  @bindable error;
  @bindable typeFaktur;
  @bindable SalesInvoiceExportItems;

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
      this.selectedDeliveryNote.bonCode = this.data.BonNo;
    }
  }
  weightUomOptions = ["", "KG", "BALE"];
  totalUomOptions = ["", "CBM", "Etc"];

  salesInvoiceItemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Satuan Packing",
      "Jumlah",
      "Satuan",
      "Harga Satuan",
      "Total Harga",
    ],
    onAdd: function () {
      this.SalesInvoiceExportItems.bind();
      this.data.SalesInvoiceExportItems = this.data.SalesInvoiceExportItems || [];
      this.data.SalesInvoiceExportItems.push({});
    }.bind(this),
    onRemove: function () {
      if (this.SalesInvoiceExportItems) {
        this.SalesInvoiceExportItems.bind();
      }
    }.bind(this),
  };

  @bindable selectedDeliveryNote;
  async selectedDeliveryNoteChanged(newValue, oldValue) {
    console.log(this.selectedDeliveryNote)
    if (newValue) {
      this.data.BonId = this.selectedDeliveryNote.id;
      this.data.BonNo = this.selectedDeliveryNote.bonCode;
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
