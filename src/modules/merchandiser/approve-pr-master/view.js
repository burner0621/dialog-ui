import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class View {
    hasApprove = false;
    hasUnApprove = false;

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        this.type = parentInstruction.config.settings.type;

        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPreSalesContract = {
                Id: this.data.SCId,
                SCNo: this.data.SCNo
            };

            if (this.data.PRType === "MASTER") {
                this.data.Unit = null;
            }

            if (this.data.Items) {
                let fabricItemsProductIds = this.data.Items
                    .filter(i => i.Category.Name === "FABRIC")
                    .map(i => i.Product.Id);

                if (fabricItemsProductIds.length) {
                    await this.coreService.getGarmentProductsByIds(fabricItemsProductIds)
                        .then(result => {
                            this.data.Items
                                .filter(i => i.Category.Name === "FABRIC")
                                .forEach(i => {
                                    const product = result.find(d => d.Id == i.Product.Id);

                                    i.Composition = product;
                                    i.Const = product;
                                    i.Yarn = product;
                                    i.Width = product;
                                });
                        });
                }
            }

            switch (this.type) {
                case "MD1":
                    this.hasApprove = !this.data.IsValidatedMD1;
                    // this.hasUnApprove = this.data.IsValidatedMD1 && !this.data.IsValidatedMD2 && !this.data.IsValidated;
                    break;
                case "Purchasing":
                    this.hasApprove = this.data.IsValidatedMD1 && !this.data.IsValidatedPurchasing;
                    break;
                case "MD2":
                    this.hasApprove = this.data.IsValidatedMD1 && this.data.IsValidatedPurchasing && !this.data.IsValidatedMD2;
                    // this.hasUnApprove = this.data.IsValidatedMD2;
                    break;
                default:
                    this.hasApprove = false;
                    this.hasUnApprove = false;
            }

            if (this.data.IsPosted === false) {
                this.hasApprove = false;
            }
            if (this.data.IsUsed === true) {
                this.hasUnApprove = false;
            }
        }
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    approveCallback(event) {
        if (confirm(`Approve Data?`)) {
            const jsonPatch = [
                { op: "replace", path: `/IsValidated${this.type}`, value: true },
                { op: "copy", path: `/Validated${this.type}By`, from: "/LastModifiedBy" },
                { op: "copy", path: `/Validated${this.type}Date`, from: "/LastModifiedUtc" },
            ];

            if (this.type === "MD2") {
                jsonPatch.push(
                    { op: "replace", path: `/IsValidated`, value: true },
                    { op: "copy", path: `/ValidatedBy`, from: "/LastModifiedBy" },
                    { op: "copy", path: `/ValidatedDate`, from: "/LastModifiedUtc" },
                );
            }

            this.service.patch(this.data.Id, jsonPatch)
                .then(result => {
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    unapproveCallback(event) {
        if (confirm(`UnApprove Data?`)) {
            const jsonPatch = [
                { op: "replace", path: `/IsValidated${this.type}`, value: false },
                { op: "replace", path: `/Validated${this.type}By`, value: null },
                { op: "replace", path: `/Validated${this.type}Date`, value: new Date('0001-01-01T00:00:00Z') }
            ];
            this.service.patch(this.data.Id, jsonPatch)
                .then(result => {
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}