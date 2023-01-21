import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { CoreService } from "./core-service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service, CoreService)
export class Create {
    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
        this.data = {
            Items: []
        };
    }

    isVisible = false;

    async activate(params) {
        // let unitCostsResponse = await this.coreService.getWithVBLayoutOrder();
        // let unitCosts = unitCostsResponse.data;
        this.data.Date = new Date();
        this.data.Date.setHours(0, 0, 0, 0);

        // unitCosts.map((unit) => {
        //     let item = {
        //         Unit: unit
        //     }

        //     this.data.Items.push(item);
        //     if (unit.VBDocumentLayoutOrder === 9)
        //         this.data.Items.push({
        //             Unit: {
        //                 VBDocumentLayoutOrder: 10
        //             }
        //         });

        // })
    }

    list() {
        this.router.navigateToRoute("list");
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.service
            .create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute(
                    "create", {}, { replace: true, trigger: true }
                );
            })
            .catch(e => {
                if (e.message) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                this.error = e;
            });

    }
}