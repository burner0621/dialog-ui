import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from '../service';
import { factories } from 'powerbi-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var UomLoader = require('../../../../loader/uom-loader');

@inject(Service)
export class UnitDeliveryOrderItem {

  constructor(service) {
    this.service = service;

  }

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.readOnly = this.options.readOnly || this.data.IsDisabled;
    this.isEdit = context.context.options.isEdit;
    this.remark= `${this.data.POSerialNumber}; ${this.data.Article}; ${this.data.RONo}; ${this.data.ProductRemark}`;


    if(this.isEdit){
      if(this.data.URNId){
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("purchasing-azure");
        var URNUri=`garment-unit-receipt-notes/${this.data.URNId}`;
        await endpoint.find(URNUri)
            .then((result) => {
              var urn=result.data;
              if(urn){
                for(var urnItem of urn.Items){
                  if(urnItem.Id== this.data.URNItemId){
                    this.data.Conversion=urnItem.CorrectionConversion;break;
                  }
                }
              }
            });
      }
    }

    //ambil dr DOItems
    var doItems= await this.service.getDOItemsById(this.data.URNItemId);
    if(!this.data.Id){
      this.data.Quantity= this.data.Quantity? this.data.Quantity : doItems.RemainingQuantity;
  
      this.data.ReturQuantity= this.data.ReturQuantity? this.data.ReturQuantity: doItems.RemainingQuantity/this.data.Conversion;
      this.data.ReturQtyCheck=this.data.ReturQtyCheck? this.data.ReturQtyCheck:doItems.RemainingQuantity;

    }
    else{
      if(!this.error)
        this.data.ReturQtyCheck=doItems.RemainingQuantity+this.data.Quantity;
    }
  }

  bind() {

  }

  @computedFrom("options.readOnly", "isEdit")
  get isDefaultDOAppear() {
    return this.options.readOnly || this.isEdit;
  }

  qtyChanged(e){
    var qty= parseFloat(e.target.value);
    this.data.ReturQuantity=qty/this.data.Conversion;
    this.data.DefaultDOQuantity=qty;

  }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.filter(item => item.data.IsDisabled === false).reduce((acc, curr) => acc && curr.data.IsSave, true);
  }

  productChanged(newValue) {
    var selectedProduct = newValue;
    if (selectedProduct) {
      this.data.Product.Id = selectedProduct.ProductId;
      this.data.Product.Name = selectedProduct.ProductName;
      this.data.Product.Code = selectedProduct.ProductCode;
      this.data.Product.Remark = selectedProduct.ProductRemark;
    } else {
      this.data.Product = null;
    }
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  get product() {
    return this.data.Product.Name;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}