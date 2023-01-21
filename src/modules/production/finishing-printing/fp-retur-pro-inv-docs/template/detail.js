
// import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'

// @containerless()
// @inject(BindingEngine)
export class detail {
    // constructor(bindingEngine) {
    //     this.bindingEngine = bindingEngine;
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.contextOptions = context.context.options;
        // this.Product = this.data ? this.data.Product : {};
    }

    // @bindable No = 0;
    gradeList = ["A", "B", "C", "BS"];
    return = ["Tidak", "Ya"];

    controlOptions = {
        control: {
            length: 12
        }
    };

    // ProductChanged(newValue, oldValue) {
    //     if (this.Product) {
    //         this.data.Product = this.Product;
    //     } else {
    //         this.data = {};
    //     }
    // }

    // get productLoader() {
    //     return this.options.productLoader;
    // }

}