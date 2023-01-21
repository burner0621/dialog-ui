import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasDelete = true;
    hasEdit = true;
    isVoid = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        
        var id = params.id;
        this.data = await this.service.getById(id);
        
        if (!this.data.IsVoid) {
            this.isVoid = true;
        }
        this.filter={
                materialName:this.data.Material.Name,
                materialConstructionName: this.data.MaterialConstruction.Name,
                finishWidth: this.data.MaterialWidthFinish
            };
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    update() {
        this.data.IsVoid = true;
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            });
    }
}