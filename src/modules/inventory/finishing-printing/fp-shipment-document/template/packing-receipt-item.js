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

        if (!this.data && !this.data.Weight) {
            this.data.Weight = 0;
        }
        if (!this.data && !this.data.Length) {
            this.data.Length = 0;
        }
    }

    @computedFrom("data.Quantity", "data.Weight")
    get weightTotal() {
        return (this.data.Weight * this.data.Quantity).toFixed(2);
    }

    @computedFrom("data.Quantity", "data.Weight")
    get lengthTotal() {
        return (this.data.Length * this.data.Quantity).toFixed(2);
    }

    removeItems() {
        this.bind();
    }
}