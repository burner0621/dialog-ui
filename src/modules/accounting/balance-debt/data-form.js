import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
import moment from 'moment';

@containerless()
@inject(BindingEngine, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable supplier;
  @bindable Year;
  @bindable currency;
  @bindable selectedmonth;
  @bindable options = {};
  itemYears = [];
  itemCode = ['','BB','BP']
  itemMonths = [
      { text: 'January', value: 1 },
      { text: 'February', value: 2 },
      { text: 'March', value: 3 },
      { text: 'April', value: 4 },
      { text: 'May', value: 5 },
      { text: 'June', value: 6 },
      { text: 'July', value: 7 },
      { text: 'August', value: 8 },
      { text: 'September', value: 9 },
      { text: 'October', value: 10 },
      { text: 'November', value: 11 },
      { text: 'Desember', value: 12 }
  ];
  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 3
    }
  }
  itemsInfoReadOnly = {
    columnsReadOnly: [
      { header: "No BP" }
    ]    
  }

  itemsInfo = {
    columns: [
      { header: "No BP", value: "deliveryOrder.billNo" },
      { header: "Nota Intern"},
      { header: "Tipe Pembayaran" },
      { header: "Valas" },
      { header: "IDR" },
    ],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.items.push({});
    }.bind(this)

  };
  

  constructor(bindingEngine, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.currentYear = moment().format('YYYY');

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
    
  }
  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.options = this.options ? this.options : {};
    //console.log(this.options);
    if (this.data.supplier) {
      this.options.supplierId = this.data.supplier.Id;
    }
    if (this.data.currency) {
      this.options.currencyCode = this.data.currency.Code;
    }
    // var hasItems = true;
    // if (this.data.items.length == 0)
    //   hasItems = false;
    console.log(context);
    // if (this.data.totalQuantity)
    //     this.data.totalQuantity=this.data.totalQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    // if (this.data.totalAmount)
    //     this.data.totalAmount=this.data.totalAmount.toLocaleString('en-EN', { minimumFractionDigits: 2 });
  }
  @computedFrom("data.supplier")
  get supplierType() {
    if (this.context.hasCreate) {
      if (!this.data.supplier.import)
        return (this.data.supplier.Import || false) ? "Import" : "Lokal";
      else
        return (this.data.supplier.import || false) ? "Import" : "Lokal";
    } else {
      return (this.data.shipmentNo || '') ? "Import" : "Lokal";
    }

  }
  @computedFrom("data.supplier")
  get isImport() {
    if (this.data.supplier) {
      return (this.data.supplier.import || false);
    } else {
      return false
    }
  }
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }
  
  // @computedFrom("data.currency")
  // get filter() {
  //   if (this.context.hasCreate) {
  //     console.log(this.data.supplierId);
  //     var filter = {
  //       supplierId: this.data.supplierId || this.data.supplier.Id,
  //       isEdit: this.isEdit,
  //       hasView: this.context.hasView,
  //       hasEdit: this.context.hasEdit,
  //       hasCreate: this.context.hasCreate,
  //       currencyCode: this.data.currencyCode || this.data.currency.Code
  //     }
  //   } else {
  //     console.log(this.data.supplierId);
  //     var filter = {
  //       supplierId: this.data.supplierId || this.data.supplier.Id,
  //       // paymentType: this.data.paymentType,
  //       // paymentMethod: this.data.paymentMethod,
  //       // isUseVat: this.data.useVat,
  //       // isIncomeTax: this.data.useIncomeTax,
  //       // incomeTaxName: this.data.incomeTax.Name || undefined,
  //       // incomeTaxRate: this.data.incomeTax.Rate || undefined,
  //       currencyCode: this.data.currencyCode || this.data.currency.Code,
  //       year: this.data.Year,
  //       isEdit: this.isEdit,
  //       hasView: this.context.hasView,
  //       hasEdit: this.context.hasEdit,
  //       hasCreate: this.context.hasCreate
  //     }
  //   }
  //   return filter;
  // }
  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      if (selectedSupplier.Id) {
        this.data.supplier = selectedSupplier;
        this.data.supplierId = selectedSupplier.Id;
        this.options.supplierId = selectedSupplier.Id;
      }
    } else {
      this.data.supplier = {};
      this.data.items = [];
      this.data.supplierId = undefined;
    }
    this.data.items = [];
    this.context.error.items = [];
  }
  currencyChanged(newValue, oldValue) {
    var selectedCurrency = newValue;
    if (selectedCurrency) {
        this.data.currency = selectedCurrency;
        this.options.supplierId = this.data.supplier.Id;
        this.options.currencyCode = selectedCurrency.Code;
        this.options.Year = this.data.Year
    } else {
      this.currency = null;
      this.data.items = [];
      this.supplier = null;
      // this.data.currencyCode = undefined;
    }
    this.data.items = [];
    this.context.error.items = [];
  }
  YearChanged(newValue, oldValue){
    if(newValue){
      this.data.Year = newValue;
      this.options.Year = newValue;
    }
  }
  get supplierLoader() {
    return SupplierLoader;
  }
  get currencyLoader() {
    return CurrencyLoader;
  }

  supplierView = (supplier) => {
    if (!supplier.code)
      return `${supplier.Code} - ${supplier.Name}`
    else
      return `${supplier.code} - ${supplier.name}`
  }

  currencyView = (currency) => {
    if (!currency.code)
      return `${currency.Code}`
    else
      return `${supplier.code}`
  }

  itemMonthsChanged(e) {
    var selectedMonths = e.srcElement;
    console.log(selectedMonths);
    if (selectedMonths) {
      this.data.Month = "";
    }
  }

  selectedmonthChanged(newValue, oldValue){
    if(newValue){
      this.data.month = newValue.value;
    }
  }

  resetErrorItems() {
    if (this.error) {
      if (this.error.items) {
        this.error.items = [];
      }
    }
  }
}
