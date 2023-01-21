import { bindable, computedFrom } from 'aurelia-framework';

const DOSalesLoader = require("./../../../../../loader/do-sales-loader");

export class Item {
  constructor() {
    this.error = {};
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.WeightBruto = this.data.WeightBruto;
    this.SalesContractNo = context.context.options.SalesContractNo;

    this.filter = { "DOSalesCategory": "SPINNING" };

    if (this.data.NoSOP && this.data.IdSOP) {
      this.selectedNoSop = this.data.NoSOP;
    }
    else{
      this.selectedNoSop = this.data.noSOP;
    }
  }

  @bindable selectedNoSop;
  selectedNoSopChanged(newValue, oldValue) {
    if (newValue) {
      if (this.selectedNoSop) {
        var doSalesDetailItem = this.selectedNoSop.DOSalesDetailItems;
        for (var detail of doSalesDetailItem) {
          this.data.NoSOP = detail.NoSOP;
          this.data.IdSOP = detail.Id;
        }
      }
    }

  }

  @computedFrom("data.weightBale")
  get getTotal() {
    this.data.getTotal = 0;
    if (this.data.weightBale) {
      this.data.getTotal = this.data.weightBale * 217.7243376;
    }
    else {
      this.data.getTotal = 0;
    }

    return this.data.getTotal;
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  doTextFormatter = (deliveryOrder) => {
    // console.log(deliveryOrder.DOSalesDetailItems.NoSOP);
    // if (deliveryOrder.DOSalesDetailItems.NoSOP == null){
    //     return `${deliveryOrder.doSalesNo}`;    
    // }
    // else{
    if(deliveryOrder.DOSalesDetailItems == null){
      console.log(deliveryOrder);
      for (var detail of deliveryOrder.items) {
        var NoSOP = detail.noSOP;
      }
      return `${NoSOP}`;
    }
    else{

      for (var detail of deliveryOrder.DOSalesDetailItems) {
        var NoSOP = detail.NoSOP;
      }
      return `${NoSOP}`;
    }
  };
}
