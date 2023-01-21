import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/adj-transit-spp-loader');
var ProductionOrderPackLoader = require('../../../../loader/adj-transit-spp-pack-loader');

export class CartItem {
    @bindable product;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
        this.isKain = this.contextOptions.adjItemCategory == "KAIN";
        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.productionOrder = {};
            this.selectedProductionOrder.productionOrder.id = this.data.productionOrder.id;
            this.selectedProductionOrder.productionOrder.no = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrder.type = this.data.productionOrder.type;
            this.selectedProductionOrder.construction = this.data.construction;
            this.selectedProductionOrder.remark = this.data.remark;
            this.selectedProductionOrder.material = {};
            this.selectedProductionOrder.material.id = this.data.material.id;
            this.selectedProductionOrder.material.name = this.data.material.name;

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

            this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId = this.data.dyeingPrintingAreaInputProductionOrderId;
            this.selectedProductionOrder.balanceRemains = this.data.balanceRemains;

            this.selectedProductionOrder.packingLength = this.data.packingLength;
            this.selectedProductionOrder.packingUnit = this.data.packingUnit;
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

    get productionOrderPackLoader() {
        return ProductionOrderPackLoader;
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

            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.orderQuantity;
            this.data.unit = this.selectedProductionOrder.unit;
            this.data.dyeingPrintingAreaInputProductionOrderId = this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId;
            this.data.balanceRemains = this.selectedProductionOrder.balanceRemains;
            this.data.processType = {};
            this.data.processType.id = this.selectedProductionOrder.processType.id;
            this.data.processType.name = this.selectedProductionOrder.processType.name;

            this.data.packingLength = this.selectedProductionOrder.packingLength;
            this.data.packingUnit = this.selectedProductionOrder.packingUnit;
            this.data.packingType = this.selectedProductionOrder.packingType;

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

    @bindable balance;
    get totalBalance() {
        this.data.balance = this.data.qtyPacking * this.data.packingLength;
        this.balance = this.data.balance;
    }
}