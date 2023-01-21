import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class ViewInput {
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

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit-input', { id: this.data.Id });
    }

    createOutput() {
        this.router.navigateToRoute('create-output', { id: this.data.Id });
    }


    // editOutput() {
    //     this.router.navigateToRoute('output', { id: this.data._id });
    // }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}
