import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";
const UomLoader = require("../../../../../loader/uom-loader");

@inject(Service)
export class Specification {
    constructor(service) {
        this.service = service;
    }

    get uomLoader() {
        return UomLoader;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = context.context.options;
    }

}
