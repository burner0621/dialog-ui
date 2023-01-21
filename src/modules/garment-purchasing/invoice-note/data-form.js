import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');
var IncomeTaxLoader = require('../../../loader/vat-loader');
var VatLoader = require('../../../loader/vat-tax-loader');

@inject(BindingEngine, Element, Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable supplier;
    @bindable currency;
    @bindable incomeTax;
    @bindable vatTax;
    @bindable options = { readOnly: false };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsInfo = {
        columns: [
            // { header: " ", value: "__check" },
            { header: "Nomor Surat Jalan", value: "no" },
            { header: "Tanggal Surat Jalan" },
            { header: "Tanggal Barang Datang" },
            { header: "Total Amount" }]
        , onAdd: function () {
            // this.context.ItemsCollection.bind();
            this.data.items.push({});
        }.bind(this),
 
    };

    itemsInfoReadOnly = {
        columnsReadOnly: [
            { header: "Nomor Surat Jalan" },
            { header: "Tanggal Surat Jalan" },
            { header: "Tanggal Barang Datang" },
            { header: "Total Amount" }]
    }

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.options.readOnly = this.readOnly;
        console.log(context);
        if(this.data.Id)
        {
            this.readO=true;
            //this.incomeTax={Id:this.data.incomeTaxId,name:this.data.incomeTaxName,rate:this.data.incomeTaxRate};
        }
        if(this.data.supplier){
            this.options.supplierCode = this.data.supplier.Code;      
        }

        this.options.useVat=this.data.useVat;
        this.options.useIncomeTax=this.data.useIncomeTax;

        if(this.data.useIncomeTax === true)
        {
            this.options.incomeTaxName=this.data.incomeTaxName;
            this.options.incomeTaxId=this.data.incomeTaxId;
        }

        if(this.data.useVat === true) {
            this.options.vatRate=this.data.vatRate;
            this.options.vatId=this.data.vatId;
        }

        if(this.data.currency){
            this.options.currencyCode = this.data.currency.Code;
        } 
    }
    
    // async supplierChanged(newValue) {
    //     var selectedSupplier = newValue;
    //     if (selectedSupplier) {
    //         if (selectedSupplier._id) {
    //             this.data.supplier = selectedSupplier;
    //             this.data.supplierId = selectedSupplier._id;
    //             var result = await this.service.getDeliveryOrder({ supplierId: this.data.supplierId });
    //             var _deliveryOrders = result.data || []
    //             debugger
    //             var dataItems = _deliveryOrders.map((deliveryOrder) => {
    //                 var items = deliveryOrder.items.map(doItem => {
    //                     var fulfillment = doItem.fulfillments.map(doFulfillment => {
    //                         return {
    //                             purchaseOrderExternalId: doItem.purchaseOrderExternalId,
    //                             purchaseOrderExternalNo: doItem.purchaseOrderExternalNo,
    //                             purchaseOrderId: doFulfillment.purchaseOrderId,
    //                             purchaseOrderNo: doFulfillment.purchaseOrderNo,
    //                             purchaseRequestId: doFulfillment.purchaseRequestId,
    //                             purchaseRequestNo: doFulfillment.purchaseRequestNo,
    //                             purchaseRequestRefNo:doFulfillment.purchaseRequestRefNo,
    //                             roNo: doFulfillment.roNo,
    //                             productId: doFulfillment.productId,
    //                             product: doFulfillment.product,
    //                             purchaseOrderQuantity: doFulfillment.purchaseOrderQuantity,
    //                             purchaseOrderUom: doFulfillment.purchaseOrderUom,
    //                             deliveredQuantity: doFulfillment.deliveredQuantity,
    //                             pricePerDealUnit: doFulfillment.pricePerDealUnit,
    //                             paymentMethod: doItem.paymentMethod,
    //                             paymentType: doItem.paymentType,
    //                             paymentDueDays: doItem.paymentDueDays,
    //                         }
    //                     });
    //                     fulfillment = [].concat.apply([], fulfillment);
    //                     return fulfillment;
    //                 });
    //                 items = [].concat.apply([], items);

    //                 var doItem = {};
    //                 doItem.deliveryOrderId = deliveryOrder._id;
    //                 doItem.deliveryOrderNo = deliveryOrder.no;
    //                 doItem.deliveryOrderDate = deliveryOrder.date;
    //                 doItem.deliveryOrderSupplierDoDate = deliveryOrder.supplierDoDate;
    //                 doItem.items = items;
    //                 return doItem;
    //             });
    //             dataItems = [].concat.apply([], dataItems);
    //             this.data.items = dataItems;

    //         }
    //         else {
    //             this.data.supplier = {};
    //             this.data.supplierId = null;
    //             this.data.items = [];
    //         }
    //     } else {
    //         this.data.supplier = {};
    //         this.data.supplierId = null;
    //         this.data.items = [];
    //     }
    //     this.resetErrorItems();
    // }

    currencyChanged(newValue,oldValue) {
        var selectedCurrency = newValue;
        if (selectedCurrency) {
            if (selectedCurrency.Id) {
                this.data.currency = selectedCurrency;
                this.options.currencyCode = selectedCurrency.code;
            }
            else {
                this.data.currency = null;
            }
        }
        else {
            this.data.currency = null;
        }
        if(newValue!=oldValue)
            this.data.items.splice(0);
        this.resetErrorItems();
    }

    incomeTaxChanged(newValue,oldValue) {
        var selectedIncomeTax = newValue;
        if (selectedIncomeTax) {
            if (selectedIncomeTax.Id) {
                
                this.data.incomeTax = selectedIncomeTax;
                this.data.incomeTaxId = selectedIncomeTax.Id;
                this.data.incomeTaxRate = selectedIncomeTax.rate;
                this.data.incomeTaxName = selectedIncomeTax.name;
                this.options.incomeTaxId = selectedIncomeTax.Id;
                this.options.incomeTaxName = selectedIncomeTax.name;
            }
            else {
                this.data.incomeTax = null;
            }
        }
        else {
            this.data.incomeTax = null;
        }
        if(newValue!=oldValue)
             this.data.items.splice(0);
        this.resetErrorItems();
    }

    vatTaxChanged(newValue,oldValue) {
        var selectedVat = newValue;
        
        if (selectedVat) {
            if (selectedVat.Id) {
                
                //this.data.vat = selectedVat;
                this.data.vatId = selectedVat.Id;
                this.data.vatRate = selectedVat.Rate;
                this.options.vatId = selectedVat.Id;
                this.options.vatRate = selectedVat.Rate;

            }
            else {
                this.data.vat = null;
            }
        }
        else {
            this.data.vat = null;
        }
        if(newValue!=oldValue)
             this.data.items.splice(0);
        this.resetErrorItems();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (supplier) => {
        if(this.data.Id)
        {
            return `${supplier.Code} - ${supplier.Name}`
        }else
        {
            return `${supplier.code} - ${supplier.name}`
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    currencyView = (currency) => {
        if(this.data.Id)
        {
            return currency.Code
        }else
        {
            return currency.code
        }
    }

    get vatLoader() {
        return VatLoader;
    }

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    vatView = (vat) => {
        var rate = vat.rate ? vat.rate : vat.Rate;
        return `${rate}`;
    }

    incomeTaxView = (incomeTax) => {
        return `${incomeTax.name} - ${incomeTax.rate}`;
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

    useVatChanged(e) {
        var selectedUseVat = e.srcElement.checked || false;
        this.data.vatNo = "";
        this.data.vatDate = "";
        this.data.vatId = 0;
        this.data.vatRate = 0;
        //this.context.vatTaxVM.editorValue = "";
        
        this.options.useVat = selectedUseVat;
        if (!this.data.useVat) {
            this.data.isPayVat = false;
        }
        if (this.context.error.useVat) {
            this.context.error.useVat = "";
        }
        this.data.items.splice(0);
    }

    useIncomeTaxChanged(e) {
        var selectedUseIncomeTax = e.srcElement.checked || false;
        this.data.incomeTaxNo = "";
        this.data.incomeTaxDate = "";
        this.data.incomeTaxName ="";
        this.data.incomeTaxId = 0;
        this.data.incomeTaxRate = 0;
        //this.incomeTax={};

        this.options.useIncomeTax=selectedUseIncomeTax;
        if (!this.data.useIncomeTax) {
            this.data.isPayTax = false
        }
        if (this.context.error.useIncomeTax) {
            this.context.error.useIncomeTax = "";
        }
        this.data.items.splice(0);
            // this.data.incomeTax={};
            // this.data.incomeTaxNo="";
            // this.data.incomeTaxName="";
            // this.data.incomeTaxId = 0;
            // this.data.incomeTaxRate=0;
            // this.options.incomeTaxId = null;
        
    }

    isPayTaxChanged(e){
        var selectedisPayTax = e.srcElement.checked || false;
        this.options.isPayTax = selectedisPayTax;
    }

    isPayVatChanged(e){
        var selectedisPayVat = e.srcElement.checked || false;
        this.options.isPayVat = selectedisPayVat;
    }
      
    async supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier.Id) {
                this.data.supplier = selectedSupplier;
                this.data.supplierId = selectedSupplier.Id;
                this.options.supplierId = selectedSupplier.Id;
                this.options.useVat=false;
                this.options.useIncomeTax=false;
            }
            if (oldValue) {
                this.data.supplier = {};
                this.data.supplierId = null;
                this.data.items.splice(0);
            }
        } else {
            this.data.supplier = {};
            this.data.supplierId = null;
            this.data.items.splice(0);
        }
        if(newValue!=oldValue)
            this.data.items.splice(0);
        this.resetErrorItems(); 
    }

    @computedFrom("data.items.length")
    get isActivitiesEqualTotal() {
        return this.totalItem == this.data.items.length;
    }
} 
