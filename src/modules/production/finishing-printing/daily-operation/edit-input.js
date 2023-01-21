import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class EditInput {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getData(id);
        this.machine = this.data.Machine;
        this.step = this.data.Step;
        this.kanban = this.data.Kanban;

        if (this.data.DateOutput == null)
            delete this.data.DateOutput;

        if (this.data.TimeOutput == null)
            delete this.data.TimeOutput;
    }

    view() {
        this.router.navigateToRoute('view-input', { id: this.data.Id });
    }

    save(event) {
        event.toElement.disabled = true;
        this.data.IsEdit = true;
        this.service.update(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                event.toElement.disabled = false;
                this.error = e;
            })
    }
}