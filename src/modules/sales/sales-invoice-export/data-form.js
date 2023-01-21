import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

var BuyersLoader = require("../../../loader/buyers-loader");
var CurrencyLoader = require("../../../loader/currency-loader");
var UnitLoader = require("../../../loader/unit-loader");

@containerless()
@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable SalesInvoiceDate;
  @bindable DueDate;
  @bindable VatType;
  @bindable Tempo;
  @bindable Sales;
  @bindable selectedPaymentType;

  constructor(service, serviceCore, bindingSignaler, bindingEngine) {
    this.service = service;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;
    if (this.data.SalesInvoiceCategory) {
      this.data.SalesInvoiceCategory = this.data.SalesInvoiceCategory;
    } else {
      this.data.SalesInvoiceCategory = this.context.router.currentInstruction.queryParams.activeRole;
    }

    this.VatType = this.data.VatType;
    this.TotalPayment = this.data.TotalPayment;
    this.Sales = this.data.Sales;
    this.data.TotalPayment = this.getTotalPayment;

    if (this.data.Currency && this.data.Currency.Id) {
      this.selectedCurrency = await this.serviceCore.getCurrencyById(
        this.data.Currency.Id
      );
    }

    if (this.data.Buyer && this.data.Buyer.Id) {
      this.selectedBuyer = this.data.Buyer;
    }

    if (this.data.Unit && this.data.Unit.Id) {
      this.selectedUnit = await this.serviceCore.getUnitById(this.data.Unit.Id);
    }

    if (this.data.Buyer && this.data.Buyer.NPWP) {
      this.selectedBuyer.NPWP = this.data.Buyer.NPWP;
    }
    if (this.data.Buyer && this.data.Buyer.NIK) {
      this.selectedBuyer.NIK = this.data.Buyer.NIK;
    }
    if (this.data.SalesInvoiceDate) {
      this.SalesInvoiceDate = this.data.SalesInvoiceDate;
    }
    if (this.data.DueDate) {
      this.DueDate = this.data.DueDate;
    }
    if (this.data.TotalPayment) {
      this.TotalPayment = this.data.TotalPayment;
      this.data.TotalPayment = this.getTotalPayment;
    }

    var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
    var dueTime = new Date(this.data.DueDate).getTime();

    if (salesInvoiceTime && dueTime) {
      this.Tempo = (dueTime - salesInvoiceTime) / (1000 * 60 * 60 * 24);
    }

    if (this.data.Sales) {
      this.Sales = this.data.Sales;
    }

    if (this.data.PaymentType) {
      this.selectedPaymentType = this.data.PaymentType;
    }
  }

  selectedPaymentTypeChanged(newValue, oldValue) {
    if (this.selectedPaymentType) {
      this.data.PaymentType = this.selectedPaymentType;
      this.itemOptions.PaymentType = this.data.PaymentType;
    }
  }

  SalesInvoiceDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.Tempo) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.Tempo = this.Tempo;
      var milisecondTemp = 1000 * 60 * 60 * 24 * this.data.Tempo;

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueDate = new Date();
      dueDate.setTime(salesInvoiceTime + milisecondTemp);
      this.data.DueDate = new Date(dueDate);
      this.DueDate = new Date(dueDate);
    }
  }

  DueDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.DueDate) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;
    }
  }

  TempoChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.Tempo) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.Tempo = this.Tempo;
      var milisecondTemp = 1000 * 60 * 60 * 24 * this.data.Tempo;

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueDate = new Date();
      dueDate.setTime(salesInvoiceTime + milisecondTemp);
      this.data.DueDate = new Date(dueDate);
      this.DueDate = new Date(dueDate);
    }
  }

  salesInvoiceDetailsInfo = {
    columns: ["No. Bon Pengiriman", "Contract No",
      "Deskripsi", "Berat Kotor", "Berat Bersih", "Satuan Berat", "Ukuran Total", "Satuan Total"
    ],
    onAdd: function () {
      this.context.SalesInvoiceDetailsCollection.bind();
      this.data.SalesInvoiceExportDetails = this.data.SalesInvoiceExportDetails || [];
      this.data.SalesInvoiceExportDetails.push({});
    }.bind(this),
    onRemove: function () {
      this.context.SalesInvoiceDetailsCollection.bind();
    }.bind(this),
  };
  itemOptions = {};

  exportTypeOptions = ["", "L/C", "T.T"];
  authorizedOptions = ["", "ADRIANA DAMAYANTI", "AMUMPUNI"];
  termOfPaymentOptions = ["", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DPU", "DAP", "DDP"];
  finishingPrintingOptions = ["", "Dyeing/Finishing", "Printing"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedCurrency;
  selectedCurrencyChanged(newValue, oldValue) {
    if (this.selectedCurrency && this.selectedCurrency.Id) {
      this.data.Currency = {};
      this.data.Currency.Id = this.selectedCurrency.Id;
      this.data.Currency.Code = this.selectedCurrency.Code;
      this.data.Currency.Rate = this.selectedCurrency.Rate;
      this.data.Currency.Symbol = this.selectedCurrency.Symbol;
    } else {
      this.data.Currency.Id = null;
      this.data.Currency.Code = null;
      this.data.Currency.Rate = null;
      this.data.Currency.Symbol = null;
    }
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer.Id) {
      this.data.Buyer = {};
      this.data.Buyer.Id = this.selectedBuyer.Id;
      this.data.Buyer.Name = this.selectedBuyer.Name;
      this.data.Buyer.Code = this.selectedBuyer.Code;
      this.data.Buyer.Address = this.selectedBuyer.Address;
      this.data.Buyer.NPWP = this.selectedBuyer.NPWP;
      this.data.Buyer.NIK = this.selectedBuyer.NIK;
      this.itemOptions.BuyerId = this.data.Buyer.Id;
      this.itemOptions.Category = this.data.SalesInvoiceCategory;
      this.itemOptions.HasSalesInvoice = false;
    } else {
      this.data.Buyer.Id = null;
      this.data.Buyer.Name = null;
      this.data.Buyer.Code = null;
      this.data.Buyer.Address = null;
      this.data.Buyer.NPWP = null;
      this.data.Buyer.NIK = null;
      this.itemOptions.BuyerId = null;
      this.itemOptions.Category = null;
      this.itemOptions.HasSalesInvoice = false;
      this.data.SalesInvoiceExportDetails = [];
    }
  }

  @bindable selectedUnit;
  selectedUnitChanged(newValue, oldValue) {
    if (this.selectedUnit && this.selectedUnit.Id) {
      this.data.Unit = {};
      this.data.Unit.Id = this.selectedUnit.Id;
      this.data.Unit.Code = this.selectedUnit.Code;
      this.data.Unit.Name = this.selectedUnit.Name;
    } else {
      this.data.Unit.Id = null;
      this.data.Unit.Code = null;
      this.data.Unit.Name = null;
    }
  }

  get currencyLoader() {
    return CurrencyLoader;
  }
  get buyersLoader() {
    return BuyersLoader;
  }
  get unitLoader() {
    return UnitLoader;
  }
}
