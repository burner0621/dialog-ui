import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');
var DOSalesLoader = require('../../../../loader/do-sales-loader');
var DeliveryOrderLoader = require('../../../../loader/do-retur-loader');
export class CartItem {
    @bindable product;

    sppQuery = {};
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.dyeingPrintingAreaInputId = this.contextOptions.dyeingPrintingAreaInputId;
        this.isEdit = this.contextOptions.isEdit;
        this.type = this.contextOptions.type;
        console.log(this.type);
        this.isRetur = this.contextOptions.isRetur;

        if (this.isRetur) {
            this.data.IsSave = true;
            this.data.area = "SHIPPING";
        }
        this.sppQuery.dyeingPrintingAreaInputId = this.dyeingPrintingAreaInputId;

        if (this.isRetur) {
            if (this.data.deliveryOrderRetur) {
                this.deliveryOrder = {};
                this.deliveryOrder.Id = this.data.deliveryOrderRetur.id;
                this.deliveryOrder.DOReturnNo = this.data.deliveryOrderRetur.no;
            }
        }


        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;

            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.Construction = this.data.construction;

            this.selectedProductionOrder.Material = {};
            this.selectedProductionOrder.Material.Id = this.data.material.id;
            this.selectedProductionOrder.Material.Name = this.data.material.name;

            this.selectedProductionOrder.MaterialConstruction = {};
            this.selectedProductionOrder.MaterialConstruction.Id = this.data.materialConstruction.id;
            this.selectedProductionOrder.MaterialConstruction.Name = this.data.materialConstruction.name;

            this.selectedProductionOrder.MaterialWidth = this.data.materialWidth;
            this.selectedProductionOrder.FinishWidth = this.data.finishWidth;

            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Id = this.data.buyerId;
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;

            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;

            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;

            this.selectedProductionOrder.DesignCode = this.data.motif;

            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.uomUnit;

            this.selectedProductionOrder.OrderQuantity = this.data.productionOrder.orderQuantity;

            this.selectedProductionOrder.ProcessType = {};
            this.selectedProductionOrder.ProcessType.Id = this.data.processType.id;
            this.selectedProductionOrder.ProcessType.Name = this.data.processType.name;

            this.selectedProductionOrder.YarnMaterial = {};
            this.selectedProductionOrder.YarnMaterial.Id = this.data.yarnMaterial.id;
            this.selectedProductionOrder.YarnMaterial.Name = this.data.yarnMaterial.name;

            this.selectedProductionOrder.ProcessType.Unit = this.data.unit;
        }

        if (this.data.packingLength) {
            this.packingLength = this.data.packingLength;
        }

        if (this.data.inputQtyPacking) {
            this.inputQtyPacking = this.data.inputQtyPacking;
        }

    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }
    packings = ["ROLL", "PIECE", "POTONGAN"];
    packTypes = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT"];
    grades = [
        "A", "B", "C", "BS", "Aval 1", "Aval 2"
    ];
    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get doSalesLoader() {
        return DOSalesLoader;
    }

    get deliveryOrderLoader() {
        return DeliveryOrderLoader;
    }

    @bindable deliveryOrder;
    deliveryOrderChanged(n, o) {
        if (this.deliveryOrder) {
            this.data.deliveryOrder = {};
            this.data.deliveryOrderRetur = {};
            this.data.deliveryOrderRetur.id = this.deliveryOrder.Id;
            this.data.deliveryOrderRetur.no = this.deliveryOrder.DOReturnNo;
        } else {
            this.data.deliveryOrderRetur = null;
        }
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.OrderType.Name;

            if (this.selectedProductionOrder.Construction) {
                this.data.construction = this.selectedProductionOrder.Construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.FinishWidth} / ${this.selectedProductionOrder.YarnMaterial.Name}`
            }
            this.data.material = {};
            this.data.material.id = this.selectedProductionOrder.Material.Id;
            this.data.material.name = this.selectedProductionOrder.Material.Name;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.MaterialConstruction.Id;
            this.data.materialConstruction.name = this.selectedProductionOrder.MaterialConstruction.Name;

            this.data.materialWidth = this.selectedProductionOrder.MaterialWidth;
            this.data.finishWidth = this.selectedProductionOrder.FinishWidth;

            this.data.buyerId = this.selectedProductionOrder.Buyer.Id;
            this.data.buyer = this.selectedProductionOrder.Buyer.Name;
            this.data.packingInstruction = this.selectedProductionOrder.PackingInstruction;
            this.data.color = this.selectedProductionOrder.Details[0].ColorRequest;
            this.data.motif = this.selectedProductionOrder.DesignCode;
            this.data.uomUnit = this.selectedProductionOrder.Uom.Unit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.OrderQuantity;
            // this.data.inputQuantity = this.selectedProductionOrder.OrderQuantity;

            this.data.processType = {};
            this.data.processType.id = this.selectedProductionOrder.ProcessType.Id;
            this.data.processType.name = this.selectedProductionOrder.ProcessType.Name;

            this.data.yarnMaterial = {};
            this.data.yarnMaterial.id = this.selectedProductionOrder.YarnMaterial.Id;
            this.data.yarnMaterial.name = this.selectedProductionOrder.YarnMaterial.Name;

            this.data.productTextile = {};
            this.data.productTextile.name = this.selectedProductionOrder.ProductTextile.Name;

            if (this.selectedProductionOrder.ProcessType.Unit) {

                this.data.unit = this.selectedProductionOrder.ProcessType.Unit;
            }
            else {
                if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                    this.data.unit = "PRINTING"
                } else {
                    this.data.unit = "DYEING"
                }
            }
        }
        else {
            this.data.productionOrder = {};
        }
    }

    @bindable inputQtyPacking;
    inputQtyPackingChanged(n, o) {
        if (n != o) {
            this.data.inputQuantity = this.packingLength * n;
            this.data.inputQtyPacking = n;
        }
    }

    @bindable packingLength;
    packingLengthChanged(n, o) {
        if (n != o) {
            this.data.inputQuantity = this.inputQtyPacking * n;
            this.data.packingLength = n;
        }
    }

    doTextFormatter = (deliveryOrder) => {
        return `${deliveryOrder.DOReturnNo}`;
    };
}