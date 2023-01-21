import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class NewPurchaseOrderIntItem {
  @bindable selectedDealUom
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.priceBeforeTax = this.data.priceBeforeTax;
    this.error = context.error;
    this.options = context.options;
    this.useVat = this.context.context.options.useVat || false;

    console.log(this.data);

    // if(!this.data.useVat){
    //   this.data.includePpn=false;
    // }
    // if (this.data) {
    //   this.updateItem();
    // }
    // if(this.options.readOnly!=true && isNaN(this.data.priceBeforeTax%1))
    //   this.error.price="Harga Barang Harus Diisi Dengan Angka";
  }

  // // get getTotalPaid() {
  // //   var result = 0;
  // //   // console.log(this.data)
  // //   // if (this.data.items) {

  // //   //   for (var productList of this.data.items) {

  // //   //     for (var proddetail of productList.details) {

  // //         result += this.data.priceBeforeTax;
  // //   //     }

  // //   //   }
  // //   // }
  // //   return result;
  // // }

  // updateItem() {
  //   // if (this.data.dealQuantity === 0) {
  //   //   this.data.dealQuantity = this.data.defaultQuantity;
  //   // }
  //   // if (!this.data.dealUom.unit) {
  //   //   Object.assign(this.data.dealUom, this.data.defaultUom);
  //   // }

  //   // if (!this.error && this.data.priceBeforeTax === 0) {
  //   //   this.data.priceBeforeTax = this.data.product.price;
  //   // }

  //   // if (this.data.conversion === 0) {
  //   //   this.data.priceBeforeTax = this.data.product.price;
  //   // }

  //   // this.selectedDealUom = this.data.dealUom;
  //   if (!this.data.dealQuantity || this.data.dealQuantity === 0) {
  //     this.data.dealQuantity = this.data.defaultQuantity;
  //   }
  //   if (!this.data.dealUom) {
  //     this.data.dealUom = {};
  //     Object.assign(this.data.dealUom, this.data.defaultUom);
  //   }
  //   // if (!this.error && this.data.priceBeforeTax === 0) {
  //   //   this.data.priceBeforeTax = this.data.product.price;
  //   // }

  //   // if (!this.data.conversion || this.data.conversion === 0) {
  //   //   this.data.priceBeforeTax = this.data.product.price;
  //   // }

  //   this.selectedDealUom = this.data.dealUom;
  //   if (!this.data.defaultUom) {
  //     this.data.defaultUom = this.data.product.uom;
  //     if (!this.data.conversion || this.data.conversion === 0)
  //       if (this.data.dealUom.unit == this.data.defaultUom.unit) {
  //         this.data.conversion = 1;
  //       }
  //   }
  //   else {
  //     if (this.data.dealUom.unit == this.data.defaultUom.unit) {
  //       this.data.conversion = 1;
  //     }
  //   }

  //   // if(this.data.priceBeforeTax){
  //   //   this.data.priceBeforeTax=this.data.priceBeforeTax.toLocaleString('en-EN', { minimumFractionDigits: 4 });
  //   // }
  //   if (this.data.dealQuantity) {
  //     this.data.dealQuantity = this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
  //   }
  //   if (this.data.defaultQuantity) {
  //     this.data.defaultQuantity = this.data.defaultQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
  //   }
  // }

  // updatePrice() {
  //   if (this.data.includePpn) {
  //     this.data.pricePerDealUnit = (100 * parseFloat(this.data.priceBeforeTax)) / 110;
  //   } else {
  //     this.data.pricePerDealUnit = parseFloat(this.data.priceBeforeTax);
  //   }
  // }

  // selectedDealUomChanged(newValue) {
  //   if (newValue._id || newValue.Id) {
  //     this.data.dealUom = newValue;
  //     if (newValue.Unit)
  //       if (this.data.dealUom.Unit == this.data.defaultUom.Unit || this.data.dealUom.unit == this.data.defaultUom.unit) {
  //         this.data.conversion = 1;
  //       }
  //     this.data.dealUom._id = newValue.Id;
  //     this.data.dealUom.unit = newValue.Unit;
  //   }
  // }

  // conversionChanged(e) {
  //   if (this.data.dealUom.unit)
  //     if (this.data.dealUom.unit == this.data.defaultUom.unit) {
  //       this.data.conversion = 1;
  //     }
  // }

  // priceBeforeTaxChanged(e) {
  //   this.error = {};

  //   // if(this.data.priceBeforeTax%1>=0){
  //   //   if((this.data.priceBeforeTax.length<=16 && this.data.priceBeforeTax.indexOf(".")>0) || (this.data.priceBeforeTax.length<=15 && this.data.priceBeforeTax.indexOf(".")<0)){
  //   //     this.updatePrice();
  //   //   }
  //   //   else{
  //   //     this.error.price="Harga tidak boleh lebih dari 15 digit";
  //   //   }
  //   // }
  //   // else {
  //   //   this.error.price="Harga Barang Harus Diisi Dengan Angka";
  //   // }

  // }

  // useIncomeTaxChanged(e) {
  //   this.updatePrice();
  // }

  // get productLoader() {
  //   return ProductLoader;
  // }

  // get uomLoader() {
  //   return UomLoader;
  // }

  // productView = (product) => {
  //   return `${product.code} - ${product.name}`
  // }

  // uomView = (uom) => {
  //   return uom.unit ? uom.unit : uom.Unit;
  // }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
