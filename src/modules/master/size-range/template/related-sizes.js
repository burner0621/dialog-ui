const sizeLoader = require('../../../../loader/size-md-loader');

export class StepIndicatorItem {
    activate(context) {
        console.log("step-indicator-Items")
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get sizeLoader() {
        return sizeLoader;
    }
}