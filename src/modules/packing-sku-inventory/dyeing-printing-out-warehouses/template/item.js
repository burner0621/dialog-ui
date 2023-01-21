import { inject, bindable, computedFrom } from "aurelia-framework";
let ProductionOrderLoader = require("../../../../loader/production-order-loader");
let DOSalesLoader = require("../../../../loader/do-sales-loader");

// @inject(BindingEngine, Service)
export class Item {
  @bindable product;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;

    if (this.data.balance) {
      this.data.previousBalance = this.data.balance;
    }

    if (this.data.productionOrder && this.data.productionOrder.id) {
      this.selectedProductionOrder = {};
      this.selectedProductionOrder.Id = this.data.productionOrder.id;
      this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
      this.selectedProductionOrder.OrderType = {};
      this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
      this.selectedProductionOrder.OrderQuantity = this.data.balance;
      this.selectedProductionOrder.Construction = this.data.construction;
      this.selectedProductionOrder.Buyer = {};
      this.selectedProductionOrder.Buyer.Name = this.data.buyer;
      this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;
      this.selectedProductionOrder.Details = [];
      this.selectedProductionOrder.Details.push({});
      this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;
      this.selectedProductionOrder.DesignCode = this.data.motif;
      this.selectedProductionOrder.Unit = this.data.unit;
      this.selectedProductionOrder.Uom = {};
      this.selectedProductionOrder.Uom.Unit = this.data.unit;
      this.selectedProductionOrder.OrderQuantity = this.data.balance;
      this.selectedProductionOrder.Construction = this.data.construction;
      this.selectedProductionOrder.PackagingQty = this.data.packagingQTY;
      this.selectedProductionOrder.PackagingUnit = this.data.packagingUnit;
      this.selectedProductionOrder.PackagingType = this.data.packagingType;
      if (this.selectedProductionOrder.OrderNo.charAt(0) === "P") {
        this.data.unit = "PRINTING";
      } else {
        this.data.unit = "DYEING";
      }
    }

    if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
      this.selectedDeliveryOrderSales = {};

      this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
      this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
    }
  }

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  controlOptions = {
    control: {
      length: 12,
    },
  };

  get productionOrderLoader() {
    return ProductionOrderLoader;
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  @bindable selectedProductionOrder;
  selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedProductionOrder && this.selectedProductionOrder.id) {
      this.data.productionOrder = {};
      this.data.productionOrder.id = this.selectedProductionOrder.id;
      this.data.productionOrder.no = this.selectedProductionOrder.productionOrderNo;
      this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
      this.data.balance = this.selectedProductionOrder.balance;
      this.data.qtyOrder = this.selectedProductionOrder.qtyOrder;
      if (this.selectedProductionOrder.construction) {
        this.data.construction = this.selectedProductionOrder.construction;
      } else {
        this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`;
      }
      this.data.material = this.data.construction;
      this.data.material = this.data.construction;
      this.data.buyer = this.selectedProductionOrder.buyer;
      this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
      this.data.color = this.selectedProductionOrder.color;
      this.data.packagingType = this.selectedProductionOrder.packagingType;
      this.data.packagingUnit = this.selectedProductionOrder.packagingUnit;
      this.data.packagingQty = this.selectedProductionOrder.packagingQty;
      this.data.motif = this.selectedProductionOrder.motif;
      this.data.unit = this.selectedProductionOrder.unit;
      this.data.uomUnit = this.selectedProductionOrder.uomUnit;
      this.data.grade = this.selectedProductionOrder.grade;
      if (this.selectedProductionOrder.productionOrderNo.charAt(0) === "P") {
        this.data.unit = "PRINTING";
      } else {
        this.data.unit = "DYEING";
      }
    } else {
      this.data.productionOrder = {};
    }
  }

  @bindable selectedDeliveryOrderSales;
  selectedDeliveryOrderSalesChanged(newValue, oldValue) {
    if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
      this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
      this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
    }
  }

  // remarks = [];

  // constructor(dataForm) {
  //   this.dataForm = dataForm;
  // }

  // constructor() {}
}
