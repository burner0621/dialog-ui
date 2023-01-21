import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class List {
    context = ["Detail"];
    columns = [
        { field: "PreSCNo", title: "No Sales Contract" },
        { field: "RO_Number", title: "No RO" },
        { field: "Article", title: "Artikel" },
        { field: "UnitName", title: "Unit" },
        { field: "Quantity", title: "Kuantitas" },
        { field: "ConfirmPrice", title: "Harga Konfirmasi" }
    ];
    filter = {};

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }

        switch (type) {
            case "md":
                this.filter = {
                    IsApprovedMD: false,
                    IsPosted: true,
                    ApprovalCC: username
                };
                break;
            case "ie":
                this.filter = {
                    IsApprovedMD: true,
                    IsApprovedIE: false
                };
                break;
            case "kadivmd":
                this.filter = {
                    "CostCalculationGarment_Materials.All(IsPosted == false)": true,
                    IsApprovedMD: true,
                    IsApprovedPurchasing: true,
                    IsApprovedIE: true,
                    IsApprovedKadivMD: false,
                    ApprovalKadiv: username
                };
                break;
            default:
                break;
        }
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
}