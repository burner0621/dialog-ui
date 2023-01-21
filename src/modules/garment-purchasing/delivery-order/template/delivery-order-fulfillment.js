import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable doQuantity;
  @bindable selectedDealUom;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.data.pricePerDealUnit = this.data.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 4 }).replace(",","");
    this.data.dealQuantity = this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    // this.data.conversion = this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.data.doQuantity = this.data.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.error = context.error;
    this.options = context.options;
    this.hasView = this.context.context.options.hasView;
    this.hasEdit = this.context.context.options.hasEdit;
    this.hasCreate = this.context.context.options.hasCreate;
    this.hasEdit = this.context.context.options.hasEdit;
    // this.data.isSave=false;
    this.isEdit = this.context.context.options.isEdit || false;
    if (this.data) {
        if((this.hasEdit || this.hasView) && this.data.errorCount<1){
          this.data.isSave=true;
        }
        if(this.data.purchaseOrderUom){
          this.selectedDealUom=this.data.purchaseOrderUom;
        }
      this.doQuantity=this.data.doQuantity;
      // if(this.data.conversion){
      //   this.data.conversion=this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 10 });}
      if(this.data.pricePerDealUnit){
        this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN',  { minimumFractionDigits: 4 });}
      if(this.data.dealQuantity){
        this.data.dealQuantity=this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 10 });}
    } else {
      this.data.doQuantity = 0;
    }
  }

  get smallQuantity() {
    this.data.smallQuantity= this.data.doQuantity * this.data.conversion;
    return (Number(this.data.doQuantity) * Number(this.data.conversion)).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  })
  }

  get priceTotal() {
    this.data.priceTotal = this.data.doQuantity * this.data.pricePerDealUnit;
    return (Number(this.data.doQuantity) * Number(this.data.pricePerDealUnit)).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.Code} - ${product.Name}`
  }

  doQuantityChanged(newValue) {
    if(!this.error){
      this.error={};
    }
    if (typeof newValue === "number" && !this.context.context.options.hasView) {
      if(newValue==0){
        this.error.doQuantity = "DoQuantity harus > 0";
        this.data.doQuantity = newValue;
        this.isWarning=false;
      } else {
        if(this.data.dealQuantity<newValue){
          this.isWarning=true;
        } else {
          this.isWarning=false;
        }
        this.data.doQuantity=newValue;
        this.error.doQuantity=null;
      }
    } else {
      if (this.isWarning) {
        this.isWarning = false;
      }
      if (newValue === null) {
        this.doQuantity = 0
      } else {
        this.doQuantity = newValue;
      }
      this.error.doQuantity=null;
    }
  }

  conversionChanged(e) {
    if(!this.error)
      this.error={};
    if(!this.context.context.options.hasView){
      if(this.data.conversion%1>=0){
        if(this.data.purchaseOrderUom.Unit==this.data.smallUom.Unit && Number(this.data.conversion)!=1){
          this.error.conversion="Konversi harus 1";
        }
        else {
          if(!((this.data.conversion.length<=16 && this.data.conversion.indexOf(".")>0) || (this.data.conversion.length<=15 && this.data.conversion.indexOf(".")<0))){
            this.error.conversion="Konversi tidak boleh lebih dari 15 digit";
          }
          else if(this.data.conversion==0 || this.data.conversion=='0'){
            this.error.conversion="Conversion can not 0";
          }
          else {
            this.error.conversion=null;
          }
        }
      }
      else {
        this.error.conversion="Konversi Harus Diisi Dengan Angka";
      }
      this.data.conversion=e.srcElement.value;
    }
  }

  selectedDealUomChanged(newValue) {
    if (newValue.Id) {
      this.data.purchaseOrderUom = newValue;
    }
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}