import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/output-packaging-loader');

export class PackagingDetails {

    controlOptions = {
        control: {
            length: 12
        }
    };
    activate(context){
        this.context = context;
        // this.data = context.data;
        // this.error = context.error;
        
    }


    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

}