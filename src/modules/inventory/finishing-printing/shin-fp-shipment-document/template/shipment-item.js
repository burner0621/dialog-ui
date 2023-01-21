import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

@inject(Service, BindingEngine, BindingSignaler)
export class ShipmentItem {

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;

        if (!this.data && !this.data.weight) {
            this.data.weight = 0;
        }
        if (!this.data && !this.data.length) {
            this.data.length = 0;
        }
    }

    @computedFrom("data.quantity", "data.weight")
    get weightTotal() {
        return (this.data.weight * this.data.quantity).toFixed(2);
    }

    @computedFrom("data.quantity", "data.weight")
    get lengthTotal() {
        return (this.data.length * this.data.quantity).toFixed(2);
    }

    removeItems() {
        this.bind();
    }
}