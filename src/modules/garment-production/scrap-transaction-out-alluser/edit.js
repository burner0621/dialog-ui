import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    isEdit = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.read(id);
    
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.hasCancel=true;
        this.hasSave=true;
        this.isEdit=true;
       
        // this.cancelCallback = this.context.cancelCallback;
        // this.deleteCallback = this.context.deleteCallback;
        // this.editCallback = this.context.editCallback;
        // this.saveCallback = this.context.saveCallback;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancel(event) {
        this.list();
    }

    save(event) {
               this.service.update(this.data)
            .then(result => {
                this.cancel();
            })
            .catch(e => {
                this.error = e;
            })
    }

}

