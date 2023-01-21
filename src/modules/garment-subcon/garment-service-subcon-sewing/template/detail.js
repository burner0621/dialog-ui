import { computedFrom } from "aurelia-framework";
var UomLoader = require('../../../../loader/uom-loader');

export class Detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.readOnly = context.context.options.readOnly;
        this.itemOptions=context.context.options;

        console.log(this.itemOptions);
    }

    get uomLoader(){
        return UomLoader;
    }

	uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }
}