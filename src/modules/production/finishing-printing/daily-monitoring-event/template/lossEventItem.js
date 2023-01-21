import { inject, bindable, computedFrom } from 'aurelia-framework'
var LossEventLoader = require('../../../../../loader/loss-event-remark-loader');
export class CartItem {
    @bindable DyeStuffCollections;

    lossQuery = {};
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.readOnly = context.options.readOnly;
        if (this.data.LossEventRemark) {
            this.lossEvent = this.data.LossEventRemark;
        }
        this.lossQuery = {
            "LossEventProcessArea" : this.contextOptions.processArea
        };
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get lossEventRemarkLoader() {
        return LossEventLoader;
    }

    @bindable lossEvent;
    lossEventChanged(n, o) {
        if (this.lossEvent) {
            this.data.LossEventRemark = this.lossEvent;
        } else {
            this.data.LossEventRemark = null;
        }
    }


}