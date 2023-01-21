import { inject, bindable, computedFrom } from 'aurelia-framework'
var AvalLoader = require('../../../../loader/adj-aval-spp-loader');

export class CartItem {
    @bindable product;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;

        if (this.data.avalType) {
            this.selectedAval = {};
            this.selectedAval.avalTransformationId = this.data.avalTransformationId;
            this.selectedAval.avalType = this.data.avalType;
            this.selectedAval.avalQuantity = this.data.avalQuantityBalance;
            this.selectedAval.avalQuantityKg = this.data.avalWeightBalance;
        }
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    adjAvalFormatter = (aval) => {
        // if (spp.productionOrder) {
        //     return `${spp.productionOrder.no}`
        // }
        return `${aval.avalType}`
    }

    get avalLoader() {
        return AvalLoader;
    }

    @bindable selectedAval;
    selectedAvalChanged(newValue, oldValue) {
        if (this.selectedAval && this.selectedAval.avalType) {
            this.data.avalTransformationId = this.selectedAval.avalTransformationId;
            this.data.avalType = this.selectedAval.avalType;
            this.data.avalQuantityBalance = this.selectedAval.avalQuantity;
            this.data.avalWeightBalance = this.selectedAval.avalQuantityKg;
        }
        else {
            this.data = {};
        }
    }
}