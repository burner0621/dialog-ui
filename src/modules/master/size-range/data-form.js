import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};

    customOptions = {
        label: {
            length: 5
        }
    }
    
    relatedSizesInfo = {
        columns: [
            { header: "Ukuran", value: "Size" }
        ],
        onAdd: function () {
            this.data.RelatedSizes = this.data.RelatedSizes || [];
            this.data.RelatedSizes.push({ Size: "" });
        }.bind(this),
        onRemove: function () {
            console.log("step removed");
        }.bind(this)
    };

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }
} 
