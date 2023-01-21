import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
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
                if(this.data.UnitDOType=="TRANSFER"){
                    var RO="";
                    for(var a of this.data.Items){
                        RO=a.RONo; break;
                    }
                    this.RONoJob = {
                        RONo: this.data.RONo,
                        Items: []
                    };
                    this.RONo = {
                        RONo: RO,
                        Items: []
                    };
                }
                else{
                    this.RONo = {
                        RONo: this.data.RONo,
                        Items: []
                    };
                }
            }

            if (this.data.Items) {
                for (let item of this.data.Items) {
                    item.IsSave = true;
                    item.IsDisabled = false;
                }
            }

            if(this.data.UnitDOType)
            {
                this.unitDOType = this.data.UnitDOType;
            }
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}

