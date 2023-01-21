import { bindable, computedFrom } from 'aurelia-framework'
import { factories } from 'powerbi-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var UomLoader = require('../../../../loader/uom-loader');

const resource = 'master/garmentProducts';
const POresource= 'garment-internal-purchase-orders';
export class PurchaseOrderItem {
  @bindable selectedDealUom;
  @bindable price;
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseVat = this.context.context.options.isUseVat || false;
    this.checkOverBudget = this.context.context.options.checkOverBudget;
    this.kurs = this.context.context.options.kurs;
    this.selectedDealUom = this.data.dealUom;
    this.price = this.data.PricePerDealUnit;

    if (!this.data.budgetUsed) {
      this.data.budgetUsed = 0;
    }
    if (!this.data.totalBudget) {
      this.data.totalBudget = 0;
    }
    if(this.data.DealUom){
      this.selectedDealUom=this.data.DealUom;
    }
    if(!this.data.SmallUom && this.data.Product){
      if(this.data.Product.Id){
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var productUri=`${resource}/${this.data.Product.Id}`;
        await endpoint.find(productUri)
            .then((result) => {
              var product=result.data;
              this.data.SmallUom=product.UOM;
            });
      }
    }
    this.data.SmallQuantity = parseFloat(this.data.DealQuantity * this.data.Conversion).toFixed(2);
    if(!this.data.UsedBudget ){
      this.data.budgetUsed=(this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate);
    }
    else{
      this.data.budgetUsed=this.data.UsedBudget;
    }
    this.data.DefaultQuantity=parseFloat(this.data.DefaultQuantity).toFixed(2);
    this.data.DealQuantity=parseFloat(this.data.DealQuantity).toFixed(2);
    // if(this.data.Id){
    //   if(this.data.POId){
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("purchasing-azure");
    //     var pOUri=`${POresource}/${this.data.POId}`;
    //     await endpoint.find(pOUri)
    //         .then((result) => {
    //           var PO=result.data;
    //           this.data.Initial=PO.remainingBudget+this.data.;
    //         });
    //   }
    // }
    if(this.options.readOnly){
      this.data.PricePerDealUnit=parseFloat(this.data.PricePerDealUnit).toFixed(4);
    }
    if(!this.options.readOnly)
      this.checkIsOverBudget();
  }

  bind() {
    if (this.context.context.options.resetOverBudget == true) {
      this.price = this.data.BudgetPrice;
      this.context.context.options.resetOverBudget = false;
      if (this.error) {
        if (this.error.overBudgetRemark) {
          this.error.overBudgetRemark = "";
        }
      }
    }
  }


  checkIsOverBudget() {
    if(!this.options.readOnly)
      if (this.context.context.options.checkOverBudget) {
        this.data.UsedBudget=parseFloat(this.data.budgetUsed.toFixed(4));
        //this.data.budgetUsed=(this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate);
        //var totalDealPrice = ((this.data.DealQuantity * this.price * this.kurs.Rate) + this.data.budgetUsed).toFixed(4);
        var totalDealPrice = parseFloat((this.data.remainingBudget-parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
        //var totalBudget=parseInt(this.data.totalBudget.toFixed(4));
        //this.data.RemainingBudget=totalDealPrice;

        if (this.data.UENItemId) {
          totalDealPrice = parseFloat((this.data.BudgetFromUEN - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
        }
        if (totalDealPrice <0) {
          this.data.IsOverBudget = true;
        } else {
          this.data.IsOverBudget = false;
          this.data.OverBudgetRemark = "";
        }
      }
  }

  updatePrice() {
    // if (this.data.UseIncomeTax) {
    //   this.data.PricePerDealUnit = (100 * this.price) / 110;
    // } else {
    //   this.data.PricePerDealUnit = this.price;
    // }
    this.checkIsOverBudget();
  }

  selectedDealUomChanged(newValue) {
    if (newValue.Id) {
      this.data.DealUom = newValue;
    }
  }

  get quantityConversion() {
    this.data.SmallQuantity=parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
    return this.data.SmallQuantity;
  }

  conversionChanged(e) {
    this.data.SmallQuantity = parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
  }

  priceChanged(e) {
    if(e.detail)
      this.data.budgetUsed=parseFloat(e.detail)* parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    else{
      this.data.budgetUsed=parseFloat(this.data.PricePerDealUnit)* parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    }
    this.checkIsOverBudget();
  }

  qtyChanged(e) {
    this.data.budgetUsed=parseFloat(e.srcElement.value)* this.data.PricePerDealUnit * this.kurs.Rate;
    this.checkIsOverBudget();
  }

  useIncomeTaxChanged(e) {
    this.checkIsOverBudget();
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  get prNo() {
    return `${this.data.PRNo} - ${this.data.PO_SerialNumber} - ${this.data.Article}`;
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