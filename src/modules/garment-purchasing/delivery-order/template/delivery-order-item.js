import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
var PurchaseOrderExternalLoader = require('../../../../loader/garment-purchase-order-external-by-supplier-loader');

@containerless()
@inject(BindingEngine, Service)
export class DeliveryOrderItem {
  @bindable selectedPurchaseOrderExternal;

  itemsColumns = [
    { header: " "},
    { header: "Nomor PR" },
    { header: "Nomor Referensi PR" },
    { header: "Barang" },
    { header: "Dipesan" },
    { header: "Diterima" },
    { header: "Satuan" },
    { header: "Konversi" },
    { header: "Jumlah Kecil" },
    { header: "Satuan Kecil" },
    { header: "Harga" },
    { header: "Harga Total" },
    { header: "Mata Uang" },
    { header: "Catatan" }
  ]

  constructor(bindingEngine, service) {
    this.bindingEngine = bindingEngine;
    this.service = service;
  }

  @computedFrom("data.purchaseOrderExternal.no")
    get isEdit() {
        return (this.data.purchaseOrderExternal.no || '').toString() != '';
    }

  activate(context) {
    
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    console.log(context);
    if(this.data && this.context.context.options.hasCreate) {
      if(this.context.context.items[0].data.purchaseOrderExternal.no!=""){
          this.filter = 
          {
            "SupplierId": this.context.context.options.supplierId,
            "CurrencyCode": this.context.context.items[0].data.currency.Code,
            "PaymentType": this.context.context.items[0].data.paymentType,
            "PaymentMethod": this.context.context.items[0].data.paymentMethod,
            "IsUseVat": this.context.context.items[0].data.useVat,
            "VatRate": this.context.context.items[0].data.vat.Rate,
            "IsIncomeTax": this.context.context.items[0].data.useIncomeTax,
            "IncomeTaxName": this.context.context.items[0].data.incomeTax.Name,
            "IncomeTaxRate": this.context.context.items[0].data.incomeTax.Rate,
            "IsPayVAT":this.context.context.items[0].data.isPayVAT,
            "IsPayIncomeTax": this.context.context.items[0].data.isPayIncomeTax
          } 
          for(var item of this.context.context.items){
            this.filter[`EPONo == "${item.data.purchaseOrderExternal.no}"`]=false;
          }
        console.log(this.filter);
      }
      else {
        this.filter = this.context.context.options.supplierId ? 
        { 
          "SupplierId": this.context.context.options.supplierId
        } : {};
      }
    } else {
      if(this.context.context.items[0].data.purchaseOrderExternal.no!="") {
        this.filter = 
        {
          "SupplierId": this.context.context.options.supplierId,
          "CurrencyCode": this.context.context.items[0].data.currency.Code,
          "PaymentType": this.context.context.options.paymentType,
          "PaymentMethod": this.context.context.options.paymentMethod,
          "IsUseVat": this.context.context.options.isUseVat,
          "VatRate": this.context.context.options.vatRate,
          "IsIncomeTax": this.context.context.options.isIncomeTax,
          "IncomeTaxName": this.context.context.options.incomeTaxName,
          "IncomeTaxRate": this.context.context.options.incomeTaxRate,
          "IsPayVAT":this.context.context.items[0].data.isPayVAT,
          "IsPayIncomeTax": this.context.context.items[0].data.isPayIncomeTax
        } 
        for(var item of this.context.context.items){
          this.filter[`EPONo == "${item.data.purchaseOrderExternal.no}"`]=false;
        }
        console.log(this.filter);
      }
      
      else {
        this.filter = this.context.context.options.supplierId ? 
        { 
          "SupplierId": this.context.context.options.supplierId
        } : {};
      }
    }
    
    this.isShowing = false;
    this.isSave = false;
    
    this.errorCount = 0;
    if(this.error){
      this.errorCount += 1;
    }
    
    if (this.data) {
      if(this.context.context.options.hasCreate) {
        // if (this.data.fulfillments) {
        //   this.isShowing = true;
        // }
      } else if(this.context.context.options.hasEdit || this.context.context.options.hasView) {
        //this.isShowing = true;
        if (this.data.fulfillments) {
          for(var fulfillments of this.data.fulfillments){
            fulfillments.currency=this.data.currency;
            fulfillments.errorCount=this.errorCount;
          }
        }
      }
      this.selectedPurchaseOrderExternal = this.data.purchaseOrderExternal;
    }
    this.context.filter = this.filter;
  }

  get purchaseOrderExternalLoader() {
    return PurchaseOrderExternalLoader;
  }

  async selectedPurchaseOrderExternalChanged(newValue) {
    if (newValue == null) {
      this.data.fulfillments = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue.EPONo && this.context.context.options.hasCreate) {

      this.data.fulfillments = [];
      this.data.purchaseOrderExternal = newValue;
      this.data.purchaseOrderExternal.no = newValue.EPONo;
      this.data.purchaseOrderExternal.Id = newValue.Id;
      this.data.paymentType = newValue.PaymentType;
      this.data.paymentMethod = newValue.PaymentMethod;
      this.data.paymentDueDays = newValue.PaymentDueDays;
      this.data.currency = {};
      this.data.currency.Id = newValue.Currency.Id;
      this.data.currency.Code = newValue.Currency.Code;
      this.data.useVat = newValue.IsUseVat;
      if(this.data.useVat==true) {
        this.data.vat = newValue.Vat
      } else {
        this.data.vat={};
      }
      this.data.useIncomeTax = newValue.IsIncomeTax;
      this.data.isPayVAT = newValue.IsPayVAT;
      this.data.isPayIncomeTax = newValue.IsPayIncomeTax;
      this.data.incomeTax={};
      if(this.data.useIncomeTax==true) {
        this.data.incomeTax.Id = newValue.IncomeTax.Id;
        this.data.incomeTax.Name = newValue.IncomeTax.Name;
        this.data.incomeTax.Rate = newValue.IncomeTax.Rate;
      } else {
        this.data.incomeTax={};
      }

      for(var item of newValue.Items) {
        var filterGarmentCategory = {
          "_IsDeleted": false,
          "Name": item.Product.Name,
        }
        var info = { filter: JSON.stringify(filterGarmentCategory), size: 2147483647 };
        var categoryProduct = await this.service.searchGarmentCategory(info);
        var codeRequirmentTemp = "";
        for (var data of categoryProduct) {
          codeRequirmentTemp = data.codeRequirement;
        }

        var fulfillment = {
          ePOItemId : item.Id,
          pOId : item.POId,
          pONo : item.PONo,
          pRId : item.PRId,
          pRNo : item.PRNo,
          poSerialNumber : item.PO_SerialNumber,
          product : item.Product,
          doQuantity : item.DOQuantity,
          dealQuantity : item.DealQuantity,
          conversion : item.Conversion,
          smallQuantity : item.SmallQuantity,
          pricePerDealUnit : item.PricePerDealUnit,
          rONo : item.RONo,
          currency : newValue.Currency,
          product : item.Product,
          codeRequirment : codeRequirmentTemp,
          smallUom : item.SmallUom,
          purchaseOrderUom : item.DealUom,
          isSave : false,
          remark : item.Remark
        };
        this.data.fulfillments.push(fulfillment);
      }
      this.isShowing = true;
        
    } else if (newValue.EPONo && (this.context.context.options.hasView || this.context.context.options.hasEdit)) {
      this.data.purchaseOrderExternal.no = newValue.EPONo;
      this.data.purchaseOrderExternal.Id = newValue.Id;
      this.data.paymentDueDays = newValue.PaymentDueDays;
      this.data.currency = {};
      this.data.currency.Id = newValue.Currency.Id;
      this.data.currency.Code = newValue.Currency.Code;

      for(var item of newValue.Items){
        var filterGarmentCategory = {
          "_IsDeleted": false,
          "Name": item.Product.Name,
        }
        var info = { filter: JSON.stringify(filterGarmentCategory), size: 2147483647 };
        var categoryProduct = await this.service.searchGarmentCategory(info);
        var codeRequirmentTemp = "";
        for (var data of categoryProduct){
          codeRequirmentTemp = data.codeRequirement;
        }

        var fulfillment = {
          ePOItemId : item.Id,
          pOId : item.POId,
          pONo : item.PONo,
          pRId : item.PRId,
          pRNo : item.PRNo,
          poSerialNumber : item.PO_SerialNumber,
          product : item.Product,
          doQuantity : item.DOQuantity,
          dealQuantity : item.DealQuantity,
          conversion : item.Conversion,
          smallQuantity : item.SmallQuantity,
          pricePerDealUnit : item.PricePerDealUnit,
          rONo : item.RONo,
          currency : newValue.Currency,
          product : item.Product,
          codeRequirment : codeRequirmentTemp,
          smallUom : item.SmallUom,
          purchaseOrderUom : item.DealUom,
        };
        this.data.fulfillments.push(fulfillment);
      }
        this.isShowing = true;
    }
    this.activate(this.context);
    this.dataPassing ="passing data";
    console.log("after change",this);
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderExternalView = (purchaseOrderExternal) => {
    if(purchaseOrderExternal.EPONo){
      return purchaseOrderExternal.EPONo;
    } else {
      return purchaseOrderExternal.no;
    }
    
  }

  removeItems = function () {
    this.bind();
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
