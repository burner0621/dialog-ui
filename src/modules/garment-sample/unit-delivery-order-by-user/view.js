import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data) {
            if (this.data.UnitRequest) {
                this.unitRequest = this.data.UnitRequest;
            }

            if (this.data.UnitSender) {
                this.unitSender = this.data.UnitSender;
            }

            if (this.data.Storage) {
                this.storage = this.data.Storage;
            }

            if (this.data.StorageRequest) {
                this.storageRequest = this.data.StorageRequest;
            }

            if (this.data.RONo) {
                this.RONoSample = this.data.RONo
            }

            if (this.data.Items) {
                for (let item of this.data.Items) {
                    item.IsSave = true;
                }
            }
            if (this.data.IsUsed) {
                this.hasDelete = false;
                this.hasEdit = false;
            }

            if(this.data.UnitDOType)
            {
                this.unitDOType = this.data.UnitDOType;
            }

            if(this.data.StorageRequest.code==null){
                this.data.StorageRequest=this.data.Storage;
                this.storageRequest = this.data.StorageRequest;
            }
        }
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

}