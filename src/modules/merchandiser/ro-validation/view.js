import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class View {
    readOnly = true;
    hasApprove = true;
    // hasUnApprove = false;


    constructor(router, service, authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
    }

    async activate(params, routeConfig, navigationInstruction) {
        let id = params.id;
        this.data = await this.service.read(id);

        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        switch (type) {
            case "kabagmd":
                this.type = "MD";
                break;
            case "sample":
                this.type = "Sample";
                this.saveCallback = () => {
                    this.service.getPdfById(id);
                };
                break;
            default: break;
        }

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

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     if (confirm(`Hapus Data?`))
    //         this.service.delete(this.data)
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }

    approveCallback(event) {
        if (confirm(`Approve Data?`)) {
            let jsonPatch = [
                { op: "replace", path: `/IsValidatedRO${this.type}`, value: true },
                { op: "replace", path: `/Validation${this.type}By`, value: this.me.username },
                { op: "replace", path: `/Validation${this.type}Date`, value: new Date() }
            ];

            if (this.type === "Sample") {
                jsonPatch.push(
                    { op: "replace", path: `/IsValidatedROPPIC`, value: true },
                    { op: "replace", path: `/ValidationPPICBy`, value: this.me.username },
                    { op: "replace", path: `/ValidationPPICDate`, value: new Date() },
                    { op: "replace", path: `/IsROAccepted`, value: true },
                    { op: "replace", path: `/ROAcceptedBy`, value: this.me.username },
                    { op: "replace", path: `/ROAcceptedDate`, value: new Date() },
                );
            }

            this.service.replaceCostCalculation(this.data.CostCalculationGarment.Id, jsonPatch)
                .then(result => {
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    // unapproveCallback(event) {
    //     if (confirm(`UnApprove Data?`))
    //         this.service.unapprove({ Id: this.data.Id })
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }
}