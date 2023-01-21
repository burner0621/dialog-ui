import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    isView = true;
    isPosted = true;
    isUnposted = true;

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
        if(this.data.IsPosted==true){
            if(this.data.IsCC || this.data.IsPR){
                this.isUnposted = false;
            } else {
                this.isUnposted = true;
            }
        } else {
            this.isUnposted = false;
        }
        // this.isUnposted = this.data.IsPosted && (!this.data.IsCC && !this.data.IsPR);
        if (this.data.IsPosted) {
            this.isPosted = false;
        }

        if (!byUser) {
            this.isPosted = false;
            this.isUnposted = false;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }

    unpost(data) {
        if (confirm(`Unpost Data?`))
            this.service.unpost({ Id: this.data.Id })
                .then(result => {
                    this.list();
                });
    }
}