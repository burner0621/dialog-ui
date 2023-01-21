import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    readOnly = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        saveText: "Unpost",
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        const byUser = parentInstruction.config.settings.byUser;

        var id = params.id;
        this.data = await this.service.getById(id);

        if (this.data.IsPosted) {
            this.editCallback = null;
            this.deleteCallback = null;
        }
        else {
            this.saveCallback = null;
        }

        if(this.data.CostCalculationGarment){
            if(this.data.CostCalculationGarment.IsValidatedROSample && this.data.CostCalculationGarment.IsValidatedROPPIC) {
                this.editCallback = null;
                this.deleteCallback = null;
                this.saveCallback = null;
            }
        }

        if (!byUser) {
            this.editCallback = null;
            this.deleteCallback = null;
            this.saveCallback = null;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        if (confirm("Delete?")) {
            this.service.delete(this.data)
            .then(result => {
                this.list();
            });
        }
    }

    saveCallback(event) {
        if (confirm("Unpost?")) {
            this.service.unpostRO(this.data.Id)
                .then(result => {
                    this.list();
                })
                .catch(error => {
                    if (typeof error === 'string') {
                        alert(`Unpost dibatalkan : ${error}`);
                    } else {
                        alert(`Error : ${error.message}`);
                    }
                });
        }
    }
}