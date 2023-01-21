import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/adj-warehouse-spp-loader');

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
            this.selectedProductionOrder.materialProduct = {};
            this.selectedProductionOrder.materialProduct.id = this.data.materialProduct.id;
            this.selectedProductionOrder.materialProduct.name = this.data.materialProduct.name;
            this.selectedProductionOrder.grade = this.data.grade;
            this.selectedProductionOrder.packagingUnit = this.data.packagingUnit;
            this.selectedProductionOrder.materialConstruction = {};
            this.selectedProductionOrder.materialConstruction.id = this.data.materialConstruction.id;
            this.selectedProductionOrder.materialConstruction.name = this.data.materialConstruction.name;

            this.selectedProductionOrder.materialWidth = this.data.materialWidth;
            this.selectedProductionOrder.finishWidth = this.data.finishWidth;

            this.selectedProductionOrder.buyerId = this.data.buyerId;
            this.selectedProductionOrder.buyer = this.data.buyer;

            this.selectedProductionOrder.color = this.data.color;

            this.selectedProductionOrder.motif = this.data.motif;

            this.selectedProductionOrder.uomUnit = this.data.uomUnit;

            this.selectedProductionOrder.productionOrder.orderQuantity = this.data.productionOrder.orderQuantity;
            this.selectedProductionOrder.unit = this.data.unit;
            this.selectedProductionOrder.quantity = this.data.quantity;
            // this.selectedProductionOrder.packagingQty = this.data.packagingQty;
            this.selectedProductionOrder.packagingType = this.data.packagingType;

            this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId = this.data.dyeingPrintingAreaInputProductionOrderId;
            this.selectedProductionOrder.balanceRemains = this.data.balanceRemains;

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
        this.data.balance = this.data.packagingQty * this.data.quantity;
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

            this.data.dyeingPrintingAreaInputProductionOrderId = this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId;
            this.data.balanceRemains = this.selectedProductionOrder.balanceRemains;

            this.data.materialProduct = {};
            this.data.materialProduct.id = this.selectedProductionOrder.materialProduct.id;
            this.data.materialProduct.name = this.selectedProductionOrder.materialProduct.name;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.materialConstruction.id;
            this.data.materialConstruction.name = this.selectedProductionOrder.materialConstruction.name;

            this.data.materialWidth = this.selectedProductionOrder.materialWidth;
            this.data.finishWidth = this.selectedProductionOrder.finishWidth;

            this.data.grade = this.selectedProductionOrder.grade;
            this.data.packagingUnit = this.selectedProductionOrder.packagingUnit;
            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.orderQuantity;
            this.data.unit = this.selectedProductionOrder.unit;
            this.data.quantity = this.selectedProductionOrder.quantity;
            // this.data.packagingQty = this.selectedProductionOrder.packagingQty;
            this.data.packagingType = this.selectedProductionOrder.packagingType;

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