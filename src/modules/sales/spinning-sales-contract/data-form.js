import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var ProductLoader = require('../../../loader/product-loader');
var MaterialLoader = require('../../../loader/material-loader');
var TermOfPaymentLoader = require('../../../loader/term-of-payment-loader');
var AgentLoader = require('../../../loader/agent-loader');
var VatTaxLoader = require('../../../loader/vat-tax-loader');
var ProductTypeLoader = require ('../../../loader/product-types-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;
    @bindable isCreate;
    @bindable isEdit;
    @bindable isView;
    @bindable selectedVatTax;
    @bindable Buyer;
    @bindable TermOfPayment;
    @bindable Material;
    @bindable MaterialConstruction;
    @bindable Comodity;
    @bindable Quality;
    @bindable AccountBank;
    @bindable Agent;

    termOfPaymentFilter = {};

    // tagsFilter = { tags: { "$regex": "material", "$options": "i" } };
    tagsFilter = {};
    incomeTaxOptions = ['Tanpa PPn', 'Include PPn', 'Exclude PPn'];

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
      }
      materialQuery = {
        "Tags": "MATERIAL"
    }

    bind(context) {

        console.log(context);
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isCreate = this.context.isCreate;
        
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.data.UomUnit="Bale";
        this.data.Day = 0;

        if (this.data.Id) {
            this.Buyer = this.data.Buyer;
            this.Agent = this.data.Agent;
            this.Comodity = this.data.Comodity;
            this.TermOfPayment = this.data.TermOfPayment;
            this.Quality = this.data.Quality;
            this.selectedVatTax = this.data.VatTax || false;
            this.selectedProductType = this.data.ProductType || null;
            this.AccountBank =
                {
                    Id: this.data.AccountBank.Id,
                    Code: this.data.AccountBank.Code,
                    AccountName: this.data.AccountBank.AccountName,
                    AccountNumber: this.data.AccountBank.AccountNumber,
                    Currency: { Code: this.data.AccountBank.AccountCurrencyCode },
                    BankName: this.data.AccountBank.BankName
                };
            this.Material = this.data.Material;
            this.MaterialConstruction = this.data.MaterialConstruction;
        }
                
            if (this.data.LatePayment == null) {
                this.data.LatePayment = 1;
            }

            if (this.data.LateReturn == null) {
                this.data.LateReturn = 14;
            }

            if (this.data.Claim == null) {
                this.data.Claim = 7;
            }
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        }
        else
            return true;
    }

    //set termOfPaymentFilter
    BuyerChanged(newValue, oldValue) {
        if (this.Buyer) {
            this.data.Buyer = this.Buyer;
            if (this.data.Buyer) {
                if (this.data.Buyer.Type == "Ekspor") {
                    this.termOfPaymentFilter = { "IsExport": true };
                    this.isExport = true;
                } else {
                    this.termOfPaymentFilter = { "IsExport": false };
                    this.isExport = false;
                }
            }

            // if (oldValue) {
            //     this.Buyer = {};
            //     this.TermOfPayment = {};
            //     this.Agent = {};

            //     this.data.Comission = "";
            //     this.data.TermOfShipment = "";
            //     this.data.Remark = "";
            //     this.data.ShipmentDescription = "";
            // }
        } else {
            this.Buyer = {};
            this.data.Buyer = {};

            this.TermOfPayment = {};
            this.data.TermOfPayment = {};

            this.Agent = {};
            this.data.Agent = {};

            this.data.Comission = "";
            this.data.TermOfShipment = "";
            this.data.Remark = "";
            this.data.ShipmentDescription = "";
            this.data.ProductType = {};
        }
    }

    TermOfPaymentChanged(newValue, oldValue) {
        if (this.TermOfPayment) {
            this.data.TermOfPayment = this.TermOfPayment;
        } else {
            this.TermOfPayment = {};
            this.data.TermOfPayment = {};
        }
    }

    ComodityChanged(newValue, oldValue) {
        if (this.Comodity) {
            this.data.Comodity = this.Comodity;
        } else {
            this.Comodity = {};
            this.data.Comodity = {};
        }
    }

    UomChanged() {
        if (this.Uom) {
            this.data.Uom = this.Uom;
        } else {
            this.Uom = {};
            this.data.Uom = {};
        }
    }

    QualityChanged() {
        if (this.Quality) {
            this.data.Quality = this.Quality;
        } else {
            this.Quality = {};
            this.data.Quality = {};
        }
    }

    AccountBankChanged() {
        if (this.AccountBank) {
            this.data.AccountBank = {
                Id: this.AccountBank.Id,
                AccountName: this.AccountBank.AccountName,
                AccountNumber: this.AccountBank.AccountNumber,
                BankName: this.AccountBank.BankName,
                Code: this.AccountBank.Code,
                AccountCurrencyId: this.AccountBank.Currency.Id,
                AccountCurrencyCode: this.AccountBank.Currency.Code,
            }
        } else {
            this.AccountBank = {};
            this.data.AccountBank = {};
        }
    }

    MaterialChanged() {
        if (this.Material) {
            this.data.Material = this.Material;
        } else {
            this.Material = {};
            this.data.Material = {};
        }
    }

    MaterialConstructionChanged() {
        if (this.MaterialConstruction) {
            this.data.MaterialConstruction = this.MaterialConstruction;
        } else {
            this.MaterialConstruction = {};
            this.data.MaterialConstruction = {};
        }
    }


    getAccount = (text) => {
        var data = text.Code ? `${text.AccountName}-${text.BankName}-${text.AccountNumber}-${text.Currency.Code}` : "";
        return data
    }

    getAgentText = (text) => {
        var data = text.Code ? `${text.Code}-${text.Name}` : "";
        return data
    }

    AgentChanged() {
        if (this.Agent) {
            this.data.Agent = this.Agent
        }
        else {
            this.Agent = {};
            this.data.Agent = {};
            this.data.Comission = "";
        }
    }

    ProductTypeChanged() {
        if (this.ProductType) {
            this.data.ProductType = this.ProductType;
        } else {
            this.ProductType = {};
            this.data.ProductType = {};
        }
    }

    selectedVatTaxChanged(newValue) {
        var _selectedVatTax = newValue || {};
        console.log(_selectedVatTax);
        if (!_selectedVatTax) {
         
          this.data.VatTax = {};
          
        } else if (_selectedVatTax._id || _selectedVatTax.Id) {
          //this.data.vatTaxRate = _selectedVatTax.rate ? _selectedVatTax.rate : 0;
          //this.data.useVatTax = true;
         
          this.data.VatTax = _selectedVatTax;
          //this.data.vatTax._id = _selectedVatTax.Id || _selectedVatTax._id;

        
        }
    }

    async useVatChanged(e) {
        // this.data.items = [];
        // this.data.vatNo = "";
        // this.data.vatDate = null;
        var selectedUseVat = e.srcElement.checked || false;
        this.data.useVat = selectedUseVat;
        console.log(this.isCreate);
        if(this.isCreate){
            if(this.data.useVat){
        
                let info = {
                    keyword:'',
                    order: '{ "Rate" : "desc" }',
                    size: 1,
                };
    
                var defaultVat = await this.service.getDefaultVat(info);
                console.log(defaultVat);
    
                if(defaultVat.length > 0){
                    if(defaultVat[0]){
                        if(defaultVat[0].Id){
                        // this.data.vatTax = defaultVat[0];
                            
                            
                            this.selectedVatTax = defaultVat[0];
                            console.log(this.selectedVatTax);
                            //this.data.vatTax = this.selectedVatTax;
                            this.data.vatTax= {
                            _id : this.selectedVatTax.Id || this.selectedVatTax._id,
                            rate : this.selectedVatTax.Rate || this.selectedVatTax.rate
                            } 
    
                            console.log(this.data.vatTax);
                            //this.data.vatTax.rate = this.selectedVatTax.Rate || this.selectedVatTax.rate;
                        }
                    }
                }
            } else {
                this.data.vatTax = {};


            }
        }
    }

    categoryPayment = ['Tunai sebelum dikirim ', 'Tunai berjangka', 'Tunai dalam tempo'];
  categoryDP = ['Pembayaran dengan DP','Tanpa DP'];

    get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    get qualityLoader() {
        return QualityLoader;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    get materialLoader() {
        return MaterialLoader;
    }

    get productLoader() {
        return ProductLoader;
    }

    get yarnMaterialLoader() {
        return YarnMaterialLoader;
    }

    get termOfPaymentLoader() {
        return TermOfPaymentLoader;
    }

    termOfPaymentView = (termOfPayment) => {
        return termOfPayment.Name;
    }

    get agentLoader() {
        return AgentLoader;
    }
    get vatTaxLoader() {
        return VatTaxLoader;
    }

    vatTaxView = (vatTax) => {
        return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
    }

    get productTypeLoader() {
        return ProductTypeLoader;
      }
    
      productTypeView(ProductType) {
        return ProductType.Name ;
      }
} 