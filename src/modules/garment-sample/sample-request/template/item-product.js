import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";

const SizeLoader = require("../../../../loader/size-loader");

@inject(Service)
export class Product {

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = context.context.options;
    }

    get sizeLoader() {
        return SizeLoader;
    }


}
