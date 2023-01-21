import { inject, bindable, computedFrom } from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {DataForm} from '../data-form';

var ProductionOrderLoader = require('../../../../loader/input-packaging-production-order-loader');
@inject(EventAggregator,DataForm)
export class CartItem {
    @bindable product;
    constructor(eventAggregator,dataForm){
        this.eventAggregator = eventAggregator;
        this.dataForm = dataForm;
    }
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.productionOrderListItem = this.dataForm.selectedPackaging.packagingProductionOrders;

        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.id = this.data.productionOrder.id;
            this.selectedProductionOrder.productionOrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrder = {};
            this.selectedProductionOrder.productionOrder.type = this.data.productionOrder.type;
            this.selectedProductionOrder.qtyOrder = this.data.qtyOrder;
            this.selectedProductionOrder.balance = this.data.balance;
            this.selectedProductionOrder.construction = this.data.construction;
            this.selectedProductionOrder.Material = this.data.construction;
            // this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.buyer = this.data.buyer;
            this.selectedProductionOrder.packingInstruction = this.data.packingInstruction;
            // this.selectedProductionOrder.Details = [];
            // this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.color = this.data.color;
            this.selectedProductionOrder.motif = this.data.motif;
            // this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.uomUnit = this.data.uomUnit;
            this.selectedProductionOrder.balance = this.data.balance;
            this.selectedProductionOrder.grade = this.data.grade;
            if (this.selectedProductionOrder.productionOrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
    get productionOrderList(){
        return (keyword) => {
            return Promise.resolve().then(result => {return this.productionOrderListItem;});
          }
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
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.material = this.data.construction;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.grade = this.selectedProductionOrder.grade;
            if (this.selectedProductionOrder.productionOrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
        else {
            this.data.productionOrder = {};
        }
    }
}