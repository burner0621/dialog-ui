import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { parse } from "path";
import { type } from "os";

@inject(Router, Service)
export class Edit {
    readOnlyValue = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.error = {};
    }

    Types = ["-- select type --", "Warping", "Sizing"];

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

        if (this.data.Type == this.Types[0]) {
            this.data.Type = "";
        }

        this.data.EmptyWeight = parseFloat(this.data.EmptyWeight); 

        console.log(typeof(this.data.EmptyWeight));
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
