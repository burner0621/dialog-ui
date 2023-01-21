import { inject, bindable, computedFrom,BindingEngine } from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {DataForm} from '../data-form';

var ProductionOrderLoader = require('../../../../loader/input-packaging-production-order-loader');
@inject(EventAggregator,DataForm,BindingEngine)
export class CartItem {
    @bindable product;
    // @bindable readOnly;
    constructor(eventAggregator,dataForm,bindingEngine){
        this.eventAggregator = eventAggregator;
        this.dataForm = dataForm;
        this.bindingEngine = bindingEngine;
    }
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.readOnly = this.dataForm.readOnly;

    }
    controlOptions = {
        control: {
            length: 12
        }
    };

    // changeCheckBox() {
        // this.context.context.options.checkedAll = this.context.context.items.reduce(
        //   (acc, curr) => acc && curr.data.IsSave,
        //   true
        // );
    //   }
}