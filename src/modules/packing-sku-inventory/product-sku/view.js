import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

import numeral from "numeral";
numeral.defaultFormat("0,0.00");

@inject(Router, Service)
export class View {
    title = "Detail Packing";
    readOnly = true;
    // numeral = numeral;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind(context) {
        this.context = context;
    }

    async activate(params) {
        this.data = await this.service.getById(params.id)
            .then((productPacking) => {
                productPacking.quantity = numeral(productPacking.quantity).format("0,0.000");
                return this.service.getSKUById(productPacking.skuId)
                    .then((productSKU) => {
                        return {
                            productPacking,
                            productSKU
                        }
                    })
            })
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    controlOptions = {
        control: {
            align: "left",
            length: 2
        }
    };
}