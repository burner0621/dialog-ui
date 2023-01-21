import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
    readOnlyValue = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.error = {};
    }

    async activate(params) {

        var Id = params.Id;
        this.data = await this.service
            .getById(Id)
            .then(result => {

                return result;
            });
    }

    cancelCallback(event) {
        this.router.navigateToRoute("list");
    }

    saveCallback(event) {
        this.error = {};

        this.service
            .update(this.data)
            .then(result => {

                this.router.navigateToRoute("list");
            });
    }

    deleteCallback(event) {
        this.service.delete(this.data).then(result => {
            this.cancelCallback(event);
        });
    }
}
