import { inject, bindable, computedFrom } from "aurelia-framework";
let ProductionOrderLoader = require("../../../../loader/production-order-azure-loader");

// @inject(DataForm)
export class Item {
  @bindable product;
  //@bindable readOnly;

  activate(context) {
    this.context = context;
    this.data = context.data;
   // console.log(context);
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    console.log(this.options);
    //this.isEdit = this.contextOptions.isEdit;
    //this.destinationArea = this.contextOptions.destinationArea;
    this.isShowing = false;
   //this.readOnly = this.contextOptions.readOnly;
   // this.listOptions = {
     // isEdit: this.isEdit,
      //destinationArea: this.destinationArea
   // };
   console.log()
   
   if (this.options.readOnly == true) {
      this.itemColumns = [
        "Construction",
        "Grade",
        //"Piece",
        
        "Qty Piece Keluar",
        "Qty Keluar",
        //"Barcode"
      ];
    } else {
      this.itemColumns = [
        "Grade",
        //"Piece",
        "Qty Piece",
        "Qty Saldo",
        "Qty Piece Keluar",
        "Qty Keluar",
       
      ];
    }
    
      
    // if (this.data.Construction) {
    //   this.selectedMaterial = {};
    //   this.selectedMaterial.Construction = this.data.Construction;
    //   this.selectedMaterial.ListItems = this.data.ListItems;
  
    // }
    if (this.data.ReferenceNo) {
      this.selectedMaterial = {};
      this.selectedMaterial.ReferenceNo = this.data.ReferenceNo;
      this.selectedMaterial.ListItems = this.data.ListItems;
  
    }
  }

  //   if (this.data.productionOrderId) {
  //     this.selectedProductionOrder = {};
  //     this.selectedProductionOrder.Id = this.data.productionOrderId;
  //     this.selectedProductionOrder.OrderNo = this.data.productionOrderNo;
  //     this.selectedProductionOrder.OrderQuantity = this.data.productionOrderOrderQuantity;
  //     this.selectedProductionOrder.OrderType = this.data.productionOrderType;
  //     this.selectedProductionOrder.ProductionOrderItems = this.data.productionOrderItems;
  
  //   }
  // }

  
  listOptions = {};
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

  // get productionOrderLoader() {
  //   return ProductionOrderLoader;
  // }

  @bindable selectedMaterial;
  selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedMaterial.Construction) {
      this.data.material = {};
      this.data.material.Construction = this.selectedMaterial.Construction;
      this.data.material.ListItems = this.selectedMaterial.ListItems;
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
      this.data.material = {};
    }
  }

  removeItems() {
    // this.itemOptions.PackagingList = this.data.PackagingList;
    this.bind();
  }

  // remarks = [];

  // constructor(dataForm) {
  //   this.dataForm = dataForm;
  // }

  // constructor() {}
}
