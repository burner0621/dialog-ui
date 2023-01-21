import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/adj-shipping-spp-loader');

export class CartItem {
    @bindable product;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.productionOrder = {};
            this.selectedProductionOrder.productionOrder.id = this.data.productionOrder.id;
            this.selectedProductionOrder.productionOrder.no = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrder.type = this.data.productionOrder.type;
            this.selectedProductionOrder.construction = this.data.construction;
            this.selectedProductionOrder.material = {};
            this.selectedProductionOrder.material.id = this.data.material.id;
            this.selectedProductionOrder.material.name = this.data.material.name;
            this.selectedProductionOrder.grade = this.data.grade;
            this.selectedProductionOrder.packing = this.data.packing;
            this.selectedProductionOrder.materialConstruction = {};
            this.selectedProductionOrder.materialConstruction.id = this.data.materialConstruction.id;
            this.selectedProductionOrder.materialConstruction.name = this.data.materialConstruction.name;
            this.selectedProductionOrder.qty = this.data.qty;
            this.selectedProductionOrder.materialWidth = this.data.materialWidth;
            this.selectedProductionOrder.finishWidth = this.data.finishWidth;

            this.selectedProductionOrder.buyerId = this.data.buyerId;
            this.selectedProductionOrder.buyer = this.data.buyer;

            this.selectedProductionOrder.color = this.data.color;

            this.selectedProductionOrder.motif = this.data.motif;

            this.selectedProductionOrder.uomUnit = this.data.uomUnit;
            this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId = this.data.dyeingPrintingAreaInputProductionOrderId;
            this.selectedProductionOrder.balanceRemains = this.data.balanceRemains;

            this.selectedProductionOrder.productionOrder.orderQuantity = this.data.productionOrder.orderQuantity;
            this.selectedProductionOrder.unit = this.data.unit;
            this.selectedProductionOrder.packingType = this.data.packingType;

            this.selectedProductionOrder.processType = {};
            this.selectedProductionOrder.processType.id = this.data.processType.id;
            this.selectedProductionOrder.processType.name = this.data.processType.name;

            this.selectedProductionOrder.yarnMaterial = {};
            this.selectedProductionOrder.yarnMaterial.id = this.data.yarnMaterial.id;
            this.selectedProductionOrder.yarnMaterial.name = this.data.yarnMaterial.name;

            this.selectedProductionOrder.productSKUId = this.data.productSKUId;
            this.selectedProductionOrder.fabricSKUId = this.data.fabricSKUId;
            this.selectedProductionOrder.productSKUCode = this.data.productSKUCode;
            this.selectedProductionOrder.hasPrintingProductSKU = this.data.hasPrintingProductSKU;

            this.selectedProductionOrder.productPackingId = this.data.productPackingId;
            this.selectedProductionOrder.fabricPackingId = this.data.fabricPackingId;
            this.selectedProductionOrder.productPackingCode = this.data.productPackingCode;
            this.selectedProductionOrder.hasPrintingProductPacking = this.data.hasPrintingProductPacking;
        }
    }

    @bindable balance;
    get totalBalance() {
        this.data.balance = this.data.qtyPacking * this.data.qty;
        this.balance = this.data.balance;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    adjSPPFormatter = (spp) => {
        // if (spp.productionOrder) {
        //     return `${spp.productionOrder.no}`
        // }
        return `${spp.productionOrder.no}`
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.productionOrder) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.productionOrder.id;
            this.data.productionOrder.no = this.selectedProductionOrder.productionOrder.no;
            this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
            this.data.construction = this.selectedProductionOrder.construction;
            this.data.remark = this.selectedProductionOrder.remark;
            this.data.material = {};
            this.data.material.id = this.selectedProductionOrder.material.id;
            this.data.material.name = this.selectedProductionOrder.material.name;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.materialConstruction.id;
            this.data.materialConstruction.name = this.selectedProductionOrder.materialConstruction.name;

            this.data.materialWidth = this.selectedProductionOrder.materialWidth;
            this.data.finishWidth = this.selectedProductionOrder.finishWidth;
            this.data.qty = this.selectedProductionOrder.qty;
            this.data.grade = this.selectedProductionOrder.grade;
            this.data.packing = this.selectedProductionOrder.packing;
            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.orderQuantity;
            this.data.unit = this.selectedProductionOrder.unit;
            this.data.packingType = this.selectedProductionOrder.packingType;
            this.data.dyeingPrintingAreaInputProductionOrderId = this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId;
            this.data.balanceRemains = this.selectedProductionOrder.balanceRemains;
            this.data.processType = {};
            this.data.processType.id = this.selectedProductionOrder.processType.id;
            this.data.processType.name = this.selectedProductionOrder.processType.name;

            this.data.yarnMaterial = {};
            this.data.yarnMaterial.id = this.selectedProductionOrder.yarnMaterial.id;
            this.data.yarnMaterial.name = this.selectedProductionOrder.yarnMaterial.name;

            this.data.productSKUId = this.selectedProductionOrder.productSKUId;
            this.data.fabricSKUId = this.selectedProductionOrder.fabricSKUId;
            this.data.productSKUCode = this.selectedProductionOrder.productSKUCode;
            this.data.hasPrintingProductSKU = this.selectedProductionOrder.hasPrintingProductSKU;

            this.data.productPackingId = this.selectedProductionOrder.productPackingId;
            this.data.fabricPackingId = this.selectedProductionOrder.fabricPackingId;
            this.data.productPackingCode = this.selectedProductionOrder.productPackingCode;
            this.data.hasPrintingProductPacking = this.selectedProductionOrder.hasPrintingProductPacking;
        }
        else {
            this.data.productionOrder = {};
        }
    }
}