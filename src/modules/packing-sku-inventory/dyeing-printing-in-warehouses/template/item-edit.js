import { inject, bindable, computedFrom } from "aurelia-framework";
let ProductionOrderLoader = require("../../../../loader/production-order-azure-loader");

// @inject(DataForm)
export class Item {
  @bindable product;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.data.IsSave = true;
    this.isShowing = false;
    
    if (this.data.productionOrderId) {
      this.selectedProductionOrder = {};
      this.selectedProductionOrder.Id = this.data.productionOrderId;
      this.selectedProductionOrder.OrderNo = this.data.productionOrderNo;
      this.selectedProductionOrder.OrderQuantity = this.data.productionOrderOrderQuantity;
      this.selectedProductionOrder.OrderType = this.data.productionOrderType;
      this.selectedProductionOrder.ProductionOrderItems = this.data.productionOrderItems;
      // this.selectedProductionOrder = {};
      // this.selectedProductionOrder.PackingItems = [];
      // this.selectedProductionOrder.Id = this.data.productionOrder.id;
      // this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
      // this.selectedProductionOrder.OrderType = {};
      // this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
      // this.selectedProductionOrder.Construction = this.data.construction;
      // this.selectedProductionOrder.Buyer = {};
      // this.selectedProductionOrder.Buyer.Name = this.data.buyer;
      // this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;
      // this.selectedProductionOrder.Details = [];
      // this.selectedProductionOrder.Details.push({});
      // this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;
      // this.selectedProductionOrder.DesignCode = this.data.motif;
      // this.selectedProductionOrder.Unit = this.data.unit;
      // this.selectedProductionOrder.Uom = {};
      // this.selectedProductionOrder.Uom.Unit = this.data.unit;
      // this.selectedProductionOrder.Construction = this.data.construction;

      // this.selectedProductionOrder.PackagingQty = this.data.packagingQty;
      // this.selectedProductionOrder.PackagingUnit = this.data.packagingUnit;
      // this.selectedProductionOrder.PackagingType = this.data.packagingType;

      // // var dummyPackings = [
      // //   {
      // //     packagingQty: this.data.packagingQty,
      // //     packagingType: this.data.packagingType,
      // //     qty: this.data.balance / this.data.packagingQty,
      // //   },
      // //   {
      // //     packagingQty: this.data.packagingQty * 5,
      // //     packagingType: this.data.packagingType,
      // //     qty: this.data.balance / this.data.packagingQty,
      // //   },
      // // ];

      // // this.selectedProductionOrder.PackingItems = dummyPackings;
      // if (this.selectedProductionOrder.OrderNo.charAt(0) === "P") {
      //   this.data.unit = "PRINTING";
      // } else {
      //   this.data.unit = "DYEING";
      // }
    }
  }

  bind() {
    this.itemColumns = [
      "Material",
      "Unit",
      "Buyer",
      "Warna",
      "Motif",
      "Grade",
      "Satuan",
      "Zona Asal",
      "Qty Packing",
      "Packing",
      "Jenis",
      "Panjang Per Packing",
      "Qty Masuk",
    ];
  }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  controlOptions = {
    control: {
      length: 12,
    },
  };

  get productionOrderLoader() {
    return ProductionOrderLoader;
  }

  @bindable selectedProductionOrder;
  selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedProductionOrder.id) {
      this.data.productionOrder = {};
      this.data.productionOrder.id = this.selectedProductionOrder.id;
      this.data.productionOrder.no = this.selectedProductionOrder.productionOrderNo;
      this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.type;
      this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
      this.data.productionOrder.productionOrderItems = this.selectedProductionOrder.productionOrderItems;
      // this.data.productionOrder = {};
      // this.data.packingItems = [];
      // this.data.productionOrder.id = this.selectedProductionOrder.id;
      // this.data.productionOrder.no = this.selectedProductionOrder.productionOrderNo;
      // this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
      // this.data.balance = this.selectedProductionOrder.balance;
      // this.data.qtyOrder = this.selectedProductionOrder.qtyOrder;
      // if (this.selectedProductionOrder.construction) {
      //   this.data.construction = this.selectedProductionOrder.construction;
      // } else {
      //   this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`;
      // }
      // this.data.material = this.data.construction;
      // this.data.buyer = this.selectedProductionOrder.buyer;
      // this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
      // this.data.color = this.selectedProductionOrder.color;

      // // this.data.packagingType = this.selectedProductionOrder.packagingType;
      // // this.data.packagingUnit = this.selectedProductionOrder.packagingUnit;
      // // this.data.packagingQty = this.selectedProductionOrder.packagingQty;

      // // this.data.packingItems = this.selectedProductionOrder.PackingItems;

      // this.data.motif = this.selectedProductionOrder.motif;
      // this.data.unit = this.selectedProductionOrder.unit;
      // this.data.uomUnit = this.selectedProductionOrder.uomUnit;
      // this.data.grade = this.selectedProductionOrder.grade;
      // if (this.selectedProductionOrder.productionOrderNo.charAt(0) === "P") {
      //   this.data.unit = "PRINTING";
      // } else {
      //   this.data.unit = "DYEING";
      // }
    } else {
      this.data.productionOrder = {};
    }
  }

  // remarks = [];

  // constructor(dataForm) {
  //   this.dataForm = dataForm;
  // }

  // constructor() {}
}
