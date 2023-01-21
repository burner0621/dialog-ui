import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class View {
    readOnly = true;

    constructor(router, service, authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
    }

    formOptions = {
        cancelText: "Kembali",
        editText: "Approve",
    }

    async activate(params) {
        const id = params.id;
        this.data = await this.service.read(id);

        if (this.authService.authenticated) {
            this.me = this.authService.getTokenPayload();
        }
        else {
            this.me = null;
        }
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    editCallback(event) {
        if (confirm(`Approve Data?`)) {
            const jsonPatch = [
                { op: "replace", path: `/IsValidatedROPPIC`, value: true },
                { op: "replace", path: `/ValidationPPICBy`, value: this.me.username },
                { op: "replace", path: `/ValidationPPICDate`, value: new Date() }
            ];

            this.service.replace(this.data.CostCalculationGarment.Id, jsonPatch)
                .then(result => {
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}