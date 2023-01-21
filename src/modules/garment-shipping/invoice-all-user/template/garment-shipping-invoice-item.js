import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
import { SalesService } from "../service";
var CostCalLoader = require('../../../../loader/cost-calculation-garment-loader');
var UomLoader = require('../../../../loader/uom-loader');

@inject(Service, SalesService)
export class items {
  @bindable roNo;
  @bindable cmtPrice;
  @bindable uom;
  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(service, salesService) {
    this.service = service;
    this.salesService = salesService;

  }

  get filter() {
    var filter={};
    if (this.context.context.options.data.invoiceNo.includes("SM",0) || this.context.context.options.data.invoiceNo.includes("DLR",0))
    {
    var filter={          
        Section: this.data.Section,
        "SCGarmentId!=null":true
      };
    }
    else
    {
      var filter={
          BuyerCode:this.data.BuyerCode,
          Section: this.data.Section,
          "SCGarmentId!=null":true
        };
      }          
  return filter;
}

  activate(context) {
    this.context = context;
    this.saveAll = false;
    this.data = context.data;
    this.error = context.error;
    this.options = this.context.context.options;
    this.readOnly = this.options.isView;
    this.isEdit = this.options.isEdit;
    this.isUpdated = this.options.isUpdated;

    this.roNo = this.data.roNo;
    if (this.data) {
      this.uom = this.data.uom;
    }
  }

  get costCalLoader() {
    return CostCalLoader;
  }

  costCalView = (cc) => {
    return `${cc.RO_Number}`;
  }
  get uomLoader() {
    return UomLoader;
  }

  uomView = (cc) => {
    return `${cc.Unit || cc.unit}`;
  }

  get Amount() {
    var am = 0;
    if (this.data.price && this.data.quantity) {
      am = this.data.quantity * this.data.price;
      this.data.amount = am;
    }

    return am;
  }
  uomChanged(newValue, oldValue) {
    var selectedUom = newValue;
    if (selectedUom) {
      this.data.uom = {
        id: selectedUom.Id,
        unit: selectedUom.Unit
      }
    }
  }
  async roNoChanged(newValue, oldValue) {
    var selectedRo = newValue;
    this.salesService.getCostCalculationById(newValue.Id)
      .then(result => {
        this.salesService.getSalesContractById(result.SCGarmentId)
          .then(sc => {
            this.data.roNo = result.RO_Number;
            this.data.article = result.Article;
            this.data.marketingName = result.MarketingName;      
            this.data.buyerBrand =
            {
              id: result.BuyerBrand.Id,
              code: result.BuyerBrand.Code,
              name: result.BuyerBrand.Name
            }

            this.data.unit =
            {
              id: result.Unit.Id,
              code: result.Unit.Code,
              name: result.Unit.Name
            }

            this.data.quantity = result.Quantity;
            this.data.scNo = sc.SalesContractNo;
            this.data.amount = sc.Amount;
            this.data.price = sc.Price;
            this.data.priceRO = sc.Price;
            this.data.currencyCode = "USD"
            this.data.comodity = {
              id: result.Comodity.Id,
              code: result.Comodity.Code,
              name: result.Comodity.Name
            }

            this.uom = sc.Uom;
            this.data.uom = {
              id: sc.Uom.Id,
              unit: sc.Uom.Unit
            }
          })
      });
  }
  get cmtAmount(){
    var amount=0;
    if(this.data.cmtPrice && this.data.quantity){
      amount= this.data.cmtPrice * this.data.quantity
    }
    return amount;
  }
}