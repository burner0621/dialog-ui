import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

import BuyersLoader from "../../../loader/buyers-loader";
import ComodityLoader from "../../../loader/comodity-loader";
import OrderTypeLoader from "../../../loader/order-type-loader";
import MaterialConstructionLoader from "../../../loader/material-loader";
import MaterialLoader from "../../../loader/product-loader";
import YarnMaterialLoader from "../../../loader/yarn-material-loader";
import DesignMotiveLoader from "../../../loader/design-motive-loader";
import UomLoader from "../../../loader/uom-loader";
import QualityLoader from "../../../loader/quality-loader";
import TermOfPaymentLoader from "../../../loader/term-of-payment-loader";
import AccountBankLoader from "../../../loader/account-banks-loader";
import ProductTypeLoader from "../../../loader/product-types-loader";
import ProductTextileLoader from "../../../loader/product-textile-loader";

var VatTaxLoader = require('../../../loader/vat-tax-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable isCreate;

  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};

  lampHeader = [{ header: "Standar Lampu" }];

  pointSystemOptions = [10, 4];

  filterMaterial = {
    "tags": { "$in": ["MATERIAL", "material", "Material"] }
  };

  filterpayment = {
    "isExport": false
  };

  materialQuery = {
    "Tags" : "MATERIAL"
  }

  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  get filter() {
    var filter = {};
    filter = {
              BuyerCode: this.data.BuyerCode,
              
             };          
    return filter;
  }



  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.itemsOptions = {
      useIncomeTax: this.data.UseIncomeTax || false
    };
    this.isCreate = this.context.isCreate;
    console.log(this.isCreate);
    if(this.isCreate){
      this.data.LatePayment = 1;
      this.data.LateReturn = 14;
      this.data.Claim = 7;
    }else if( this.isCreate && this.isExport){
      this.data.LatePayment = 1;
      this.data.LateReturn = 14;
      this.data.Claim = 7;

    }
    this.data.Day = 0;
    this.selectedBuyer = this.data.Buyer || null;
    this.selectedOrderType = this.data.OrderType || null;
    this.selectedAccountBank = this.data.AccountBank || null;
    this.selectedUseIncomeTax = this.data.UseIncomeTax || false;
    this.selectedVatTax = this.data.VatTax || false;
    this.selectedPointSystem = this.data.PointSystem || 10;
    this.selectedPaymentMethods = this.data.PaymentMethods || null;
    this.selectedDownPayments = this.data.DownPayments || null;
    this.productTextile = this.data.ProductTextile || null;
    console.log(this.data.Buyer);
    // this.selectedProductType = this.data.ProductType || null;
    console.log(context);
  }




  isExport = false;
  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    this.data.Buyer = newValue;
    if (newValue) {
      if (newValue.Type.toLowerCase() == "ekspor" || newValue.Type.toLowerCase() == "export") {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      } else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }
      this.data.BuyerType = newValue.Type;
      //console.log(this.data.BuyerType);
      console.log(newValue);

    } else {
      this.isExport = false;
      this.data.FromStock = false;
      this.data.DispositionNumber = "";
      this.data.Commodity = null;
      this.data.CommodityDescription = "";
      this.selectedOrderType = null;
      this.data.Material = null;
      this.data.MaterialConstruction = null;
      this.data.YarnMaterial = null;
      this.data.MaterialWidth = 0;
      this.data.DesignMotive = null;
      this.data.OrderQuantity = 0;
      this.data.UOM = null;
      this.data.ShippingQuantityTolerance = 0;
      this.data.Amount = 0;
      this.data.Quality = null;
      this.data.PieceLength = "";
      this.data.Packing = "";
      this.selectedUseIncomeTax = false;
      this.data.TermOfPayment = null;
      this.selectedAccountBank = null;
      this.data.Agent = null;
      this.data.TransportFee = "";
      this.data.DeliveredTo = "";
      this.data.DeliverySchedule = null;
      this.data.ShipmentDescription = "";
      this.data.Condition = "";
      this.data.Commision = "";
      this.data.PointSystem = 10;
      this.data.PointLimit = 0;
      this.data.Details = [];
      // this.data.ProductType = null;
      this.data.PaymentMethods = null;
      this.data.DownPayments = null;
      this.data.Day = 0;
      this.data.PriceDP = 0;
      this.data.PrecentageDP = 0;
      this.data.LatePayment = "";
      this.data.LateReturn = "";
      this.data.Claim = 0;
    }
  }

    get filter() {
    var filter = {};
    filter = {
              BuyerType: this.data.BuyerType,
              
             };      
    return filter;
             
  }

  @bindable selectedUseIncomeTax = false;
 async  selectedUseIncomeTaxChanged(newValue, oldValue) {
    this.data.UseIncomeTax = newValue
    //console.log(this.data.UseIncomeTax);
    this.data.Details.map((detail) => {
      detail.isUseIncomeTax = newValue
    })
    console.log(this.isCreate);
    if(this.isCreate){
      if(this.data.UseIncomeTax){
      
        let info = {
            keyword:'',
            order: '{ "Rate" : "desc" }',
            size: 1,
        };

        var defaultVat = await this.service.getDefaultVat(info);
        //console.log(defaultVat);

            if(defaultVat.length > 0){
                if(defaultVat[0]){
                    if(defaultVat[0].Id){
                      // this.data.vatTax = defaultVat[0];
                        
                        
                        this.selectedVatTax = defaultVat[0];
                        console.log(this.selectedVatTax);
                        //this.data.vatTax = this.selectedVatTax;
                        this.data.VatTax= {
                          _id : this.selectedVatTax.Id || this.selectedVatTax._id,
                          rate : this.selectedVatTax.Rate || this.selectedVatTax.rate
                        } 

                        //this.data.vatTax.rate = this.selectedVatTax.Rate || this.selectedVatTax.rate;
                    }
                }
            }
      } else {
        this.data.VatTax = {};


      }
    }
    this.context.FPCollection.bind();
  }

  @bindable selectedVatTax;
  selectedVatTaxChanged(newValue) {
    var _selectedVatTax = newValue || {};
    console.log(_selectedVatTax);
    if (!_selectedVatTax) {
     
      this.data.VatTax = {};
      
    } else if (_selectedVatTax._id || _selectedVatTax.Id) {
      //this.data.vatTaxRate = _selectedVatTax.rate ? _selectedVatTax.rate : 0;
      //this.data.useVatTax = true;
     
      this.data.VatTax = _selectedVatTax;
      console.log(this.data.VatTax);
      //this.data.VatTax._id = _selectedVatTax.Id || _selectedVatTax._id;

    
    }
  }

  isPrinting = false;
  @bindable selectedOrderType;
  selectedOrderTypeChanged(newValue, oldValue) {
    this.data.OrderType = newValue;
    if (newValue) {
      if (newValue.Unit && newValue.Unit.toLowerCase() === "printing") {
        this.isPrinting = true;
      }
    } else {
      this.isPrinting = false;
    }
  }

  @bindable isExistAccountBank = false;
  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.AccountBank = this.selectedAccountBank;
      this.isExistAccountBank = true;
    } else {
      this.data.AccountBank = null;
      this.isExistAccountBank = false;
    }
  }

  @bindable selectedPointSystem;
  isFourPointSystem = false;
  selectedPointSystemChanged(newValue, oldValue) {
    this.data.PointSystem = newValue;
    if (newValue) {
      if (newValue == 4) {
        this.isFourPointSystem = true;
      } else {
        this.isFourPointSystem = false;
      }
    } else {
      this.isFourPointSystem = false
    }
  }
  @bindable productTextile;
  productTextileChanged(newValue, oldValue) {
    var selectedProductTextile = newValue;
    if (selectedProductTextile) {
        this.data.ProductTextile = selectedProductTextile;
        this.data.ProductTextileId = selectedProductTextile._id;
    }
    else {
        this.data.ProductTextileId = undefined;
    }
}

  categoryPayment = ['Tunai sebelum dikirim ', 'Tunai berjangka', 'Tunai dalam tempo'];
  categoryDP = ['Pembayaran dengan DP','Tanpa DP'];

  get detailHeader() {
    if (!this.data.UseIncomeTax) {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    }
    else {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, { header: "Include PPn?" }];
    }
  }

  itemsInfo = {
    onAdd: function () {
      this.data.Details.push({
        Currency: this.data.AccountBank.Currency,
        Color: '',
        Price: 0,
        UseIncomeTax: false,
        isUseIncomeTax: this.data.UseIncomeTax || false
      });
    }.bind(this)
  }

  get buyerLoader() {
    return BuyersLoader;
  }

  buyerView(buyer) {
    return buyer.Name ? `${buyer.Code} - ${buyer.Name} `  : '';
  }

  get comodityLoader() {
    return ComodityLoader;
  }

  get orderTypeLoader() {
    return OrderTypeLoader;
  }

  get materialLoader() {
    return MaterialLoader;
  }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get yarnMaterialLoader() {
    return YarnMaterialLoader;
  }

  get designMotiveLoader() {
    return DesignMotiveLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get qualityLoader() {
    return QualityLoader;
  }

  get termOfPaymentLoader() {
    return TermOfPaymentLoader;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  get vatTaxLoader() {
    return VatTaxLoader;
  }

  get productTextileLoader() {
    return ProductTextileLoader;
  }

  // get productTypeLoader() {
  //   return ProductTypeLoader;
  // }

  // productTypeView(productType) {
  //   return productType.Name ;
  // }

  bankView(bank) {
    return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
  }

  vatTaxView = (vatTax) => {
    return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
  }

  productTxView = (productTx) => {
    return `${productTx.Code} - ${productTx.Name}`;
}

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }

}
