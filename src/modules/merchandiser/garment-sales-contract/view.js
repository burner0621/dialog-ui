import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasEdit = true;
    hasDelete = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        const byUser = parentInstruction.config.settings.byUser;

        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data && this.data.CostCalculationId) {
            let costCal = await this.service.getCostCalById(this.data.CostCalculationId);
            if (costCal.RO_GarmentId) {
                this.hasEdit = false;
                this.hasDelete = false;
            }
        }
        this.hasItems=true;

        if (!byUser) {
            this.hasEdit = false;
            this.hasDelete = false;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete() {
        if (confirm("Delete?")) {
            this.service.delete(this.data)
                .then(result => {
                    this.list();
                });
        }
    }
}