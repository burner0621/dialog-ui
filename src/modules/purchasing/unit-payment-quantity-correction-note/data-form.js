import { inject, bindable, computedFrom } from 'aurelia-framework'
import {Service} from './service';
var SupplierLoader = require('../../../loader/supplier-loader');
var UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader')
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable unitPaymentOrder;
    @bindable useVat;
    @bindable useIncomeTax;
    @bindable quantity;

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element; 
        this.service = service;

        this.controlOptions = {
            label: {
                    length: 4,
                    align: "right"
                },
                control: {
                    length: 5
                }
        }
        
        this.UpoItem = {
            itemsColumns: [
                { header: "No. PO Eksternal", value: "ePONo" },
                { header: "No. PR", value: "pRNo" },
                { header: "Barang", value: "product" },
                { header: "Jumlah SPB", value: "deliveredQuantity" },
                { header: "Jumlah Koreksi", value: "quantity" },
                { header: "Satuan", value: "uom" },
                { header: "Harga Satuan", value: "pricePerDealUnitAfter" },
                { header: "Harga Total", value: "priceTotalAfter" }
            ],
            onRemove: function() {
                this.bind();
            }
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.flgSpb = false;
        this.flag = true;
        this.useVat = false;
        this.useIncomeTax = false;
        this.useVatString = false;
        this.useIncomeTaxString = false;
        this.uV = "Tidak";
        this.uIT = "Tidak";
        
        if (this.useVat=false)
        {
            this.data.vatTaxCorrectionNo=null;
            this.data.vatTaxCorrectionDate=null;
        }
        if (this.useIncomeTax=false)
        {
            this.data.vatTaxCorrectionNo=null;
            this.data.vatTaxCorrectionDate=null;
        }

        if (!this.data.uPCNo){
            this.useVatCheck = false;
            this.useIncomeTaxCheck = false;
            this.useVatString = false;
            this.useIncomeTaxString = false;
        }
        else{
            this.useVatString = true;
            this.useIncomeTaxString = true;
            if(this.data.useVat==true){
                this.uV = "Ya";
            }
            if(this.data.useIncomeTax==true){
                this.uIT = "Ya";
            }
            
            this.unitPaymentOrder = this.data.uPONo;
            this.useVat = this.data.useVat;
            this.useIncomeTax= this.data.useIncomeTax;

            var supplierCode=this.data.supplier.code;
            var supplierName=this.data.supplier.name;
            this.data.supplier.toString = function () {
                return [supplierCode, supplierName]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            for (var unitPaymentOrder of this.data.items) {
                var productCode=unitPaymentOrder.product.code;
                var productName=unitPaymentOrder.product.name;
                unitPaymentOrder.product.toString = function () {
                    return [productCode, productName]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
            }
        }
    }

    
    

    get supplierLoader() {
        return SupplierLoader;
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

    async useVatChanged(){
        if(this.useVat==false){
            this.data.vatTaxCorrectionNo=null;
            this.data.vatTaxCorrectionDate=null;
            this.data.useVat=false;
        } else {
            this.data.useVat=true;
        }
    }
    async useIncomeTaxChanged(){
        if(this.useIncomeTax==false){
            this.data.incomeTaxCorrectionNo=null;
            this.data.incomeTaxCorrectionDate=null;
            this.data.useIncomeTax=false;
        } else {
            this.data.useIncomeTax=true;
        }
    }

    async unitPaymentOrderChanged(newValue) {
        this.flgSpb=true;
        var selectedPaymentOrder=newValue;
        if (selectedPaymentOrder && !this.readOnly) {
            this.useVat=newValue.useVat;
            if (newValue.useVat != true){
                this.useVatString = true;
            }
            this.useIncomeTax=newValue.useIncomeTax;
            if (newValue.useIncomeTax != true){
                this.useIncomeTaxString = true;
            }
            this.data.uPOId = newValue._id;
            this.data.uPONo = newValue.no;
            this.data.division = newValue.division;
            this.data.category = newValue.category;
            this.data.currency = newValue.currency;
            this.useVatCheck = newValue.useVat;
            this.useIncomeTaxCheck = newValue.useIncomeTax;
            this.data.useVat = newValue.useVat ;
            this.data.useIncomeTax = newValue.useIncomeTax;
            this.data.supplier = newValue.supplier;
            this.data.supplier.toString = function () {
                return [newValue.supplier.code, newValue.supplier.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.dueDate = newValue.dueDate;
            this.data.correctionType = "Jumlah";
            var _items = [];
            if (selectedPaymentOrder.items) {
                for (var unitPaymentOrder of selectedPaymentOrder.items) {

                    unitPaymentOrder.unitReceiptNote.items.map((unitReceiptNoteItem) => {
                        var unitQuantityCorrectionNoteItem = {};
                        unitQuantityCorrectionNoteItem.ePONo = unitReceiptNoteItem.EPONo;
                        unitQuantityCorrectionNoteItem.pRNo = unitReceiptNoteItem.PRNo;
                        unitQuantityCorrectionNoteItem.pRId = unitReceiptNoteItem.PRId;
                        unitQuantityCorrectionNoteItem.uPODetailId = unitReceiptNoteItem.Id; 
                        unitQuantityCorrectionNoteItem.pRDetailId = unitReceiptNoteItem.PRItemId;
                        unitQuantityCorrectionNoteItem.product = unitReceiptNoteItem.product;
                        unitQuantityCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                        unitQuantityCorrectionNoteItem.product.toString = function () {
                            return [unitReceiptNoteItem.product.code, unitReceiptNoteItem.product.name]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" - ");
                        }
                        unitQuantityCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                        unitQuantityCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                        unitQuantityCorrectionNoteItem.pricePerDealUnitBefore = unitReceiptNoteItem.PricePerDealUnitCorrection || unitReceiptNoteItem.pricePerDealUnit;

                        unitQuantityCorrectionNoteItem.currency = newValue.currency;
                        unitQuantityCorrectionNoteItem.currencyRate = newValue.currency.rate;
                        unitQuantityCorrectionNoteItem.uRNNo = unitPaymentOrder.unitReceiptNote.no;
                        unitQuantityCorrectionNoteItem.priceTotalBefore = unitReceiptNoteItem.PriceTotalCorrection || unitReceiptNoteItem.PriceTotal;
                        
                        unitQuantityCorrectionNoteItem.deliveredQuantity = unitReceiptNoteItem.deliveredQuantity;
                        unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.QuantityCorrection || unitReceiptNoteItem.deliveredQuantity;
                        unitQuantityCorrectionNoteItem.quantityCheck = unitReceiptNoteItem.QuantityCorrection || unitReceiptNoteItem.deliveredQuantity;
                        unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.PricePerDealUnitCorrection || unitReceiptNoteItem.pricePerDealUnit;
                        unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.PriceTotalCorrection || unitReceiptNoteItem.PriceTotal;
                        
                        _items.push(unitQuantityCorrectionNoteItem);
                    })
                }
                this.data.items = _items;
            }

        }
        else if(!selectedPaymentOrder){
            this.data.items = [];
            this.data.supplier = null;
            this.useVatString = false;
            this.useIncomeTaxString = false;
            this.data.dueDate = null;
            this.flgSpb=false;
            this.data.uPOId=null;
            this.useVatCheck=false;
            this.useIncomeTaxCheck=false;
            this.data.useVat=false;
            this.data.useIncomeTax=false;
        }

    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
} 