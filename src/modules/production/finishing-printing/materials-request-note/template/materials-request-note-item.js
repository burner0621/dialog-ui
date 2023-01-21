import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductLoader = require('../../../../../loader/product-loader');
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

export class MaterialsRequestNoteItem {
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.productionOrderFilter = context.context.options.productionOrderFilter;
        // console.log(this.productionOrderFilter)
        this.isTest = context.context.options.isTest;
        this.isComplete = context.context.options.isComplete;
        this.isView = context.context.options.isView;
        this.isAwal = context.context.options.isAwal;
        this.isEdit = context.context.options.isEdit;
        this.isDisabled = this.data.isDisabled;
        
    }

    get productLoader() {
        return ProductLoader;
    }

    checkboxChanged(e) {
        this.data.toBeCompleted = this.data.ProductionOrder.IsCompleted;
    }

    // change.delegate="checkboxChanges($event)"

    productChanged(e) {
        this.data.Product = this.data && this.data.Product && this.data.Product.Id ? this.data.Product : null;
        if(this.data.Product && this.data.Product.Id){
            this.data.Product._id = this.data.Product.Id;
            this.data.Product.code = this.data.Product.Code;
            this.data.Product.name = this.data.Product.Name;
        }
        
        // console.log(this.data.Product)
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    productionOrderChanged(e) {
        this.data.ProductionOrder = this.data && this.data.ProductionOrder && this.data.ProductionOrder.Id ? this.data.ProductionOrder : null;
        if(this.data.ProductionOrder && this.data.ProductionOrder.Id){
            this.data.ProductionOrder._id = this.data.ProductionOrder.Id;
            this.data.ProductionOrder.orderNo = this.data.ProductionOrder.OrderNo;
            this.data.ProductionOrder.orderQuantity = this.data.ProductionOrder.OrderQuantity;
            this.data.ProductionOrder.isCompleted = this.data.ProductionOrder.IsCompleted;
            this.data.ProductionOrder.distributedQuantity = this.data.ProductionOrder.DistributedQuantity;
            this.data.ProductionOrder.orderType = this.data.ProductionOrder.OrderType;
            this.data.ProductionOrder.orderType._id = this.data.ProductionOrder.OrderType.Id;
            this.data.ProductionOrder.orderType.code = this.data.ProductionOrder.OrderType.Code;
            this.data.ProductionOrder.orderType.name = this.data.ProductionOrder.OrderType.Name;
            this.data.ProductionOrderId = this.data.ProductionOrder.Id;
            this.data.ProductionOrderNo = this.data.ProductionOrder.OrderNo;
            // console.log(this.data.ProductionOrder)
        }
        // console.log(this.data.ProductionOrder)
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}