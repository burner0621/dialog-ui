import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');

export class TransferRequestItem {
  
    gradeOptions=["","A","B","C"];
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.productId) {
      this.data.productId = {};
    }
    this.data.status="Belum diterima Pembelian";

    if(this.data.Id){
        this.data.product.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }

        this.data.product.uom=this.data.uom;
        this.data.productId=this.data.product._id;
        this.data.productCode=this.data.product.code;
        this.data.productName=this.data.product.name;
    }
    else{
      this.data.productId=this.data.product ? this.data.product._id:"";
      this.data.productCode=this.data.product?this.data.product.code: "" ;
      this.data.productName=this.data.product? this.data.product.name : "";
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  productChanged(e) {
    if (this.data.product){
      if(this.data.product._id){
        this.data.productId = this.data.product._id ? this.data.product._id : {};
        this.data.uom=this.data.product.uom ? this.data.product.uom:{};
        this.data.productCode=this.data.product.code;
        this.data.productName=this.data.product.name;
      }
      else{
        this.data.productId = "";
        this.data.productCode="";
        this.data.productName="";
        this.data.uom={};
        this.data.product={};
        this.data.product.uom={};
        this.data.product.uom.unit="";
      }
    }
    else{
      this.data.productId = "";
      this.data.productCode="";
      this.data.productName="";
      this.data.product={};
      this.data.product.uom={};
      this.data.product.uom.unit="";
    }
  }

  productView = (product) => {
    if(product.code && product.name)
      return `${product.code}-${product.name}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}