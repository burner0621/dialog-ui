import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { CoreService } from "./service";


@inject(Router, Service, CoreService)
export class Update {
    hasCancel = true;
    hasSave = true;
    isEdit = false;
    isUpdated = true;
    isCreate =false;


    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if(this.data.isUsed == true)
        {
           this.isUsed = true;
        }else
        {
            this.isUsed = false;
        }
       
    }
    

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}

