import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from '../service';

@inject(Router, Service)
export class Edit {

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    identityProperties = [
        "Id",
        "Active",
        "CreatedUtc",
        "CreatedBy",
        "CreatedAgent",
        "LastModifiedUtc",
        "LastModifiedBy",
        "LastModifiedAgent",
        "IsDeleted",
    ];

    async activate(params) {
        const id = params.id;
        this.data = await this.service.getById(id);
        this.copiedFrom = { RONoSample: this.data.RONoSample };
        this.data.IsPosted = false;
        this.data.IsReceived = false;
        this.data.ReceivedBy = null;
        this.data.ReceivedDate = this.data.CreatedDate;
        this.data.IsRejected = false;
        this.data.RejectedBy = null;
        this.data.RejectedDate = null;
        this.data.IsRevised = false;
        this.data.RevisedBy = null;
        this.data.RevisedDate = null;
        this.data.RevisedReason = null;
        this.data.RejectedReason = null;
        this.data.SampleSpecifications.map(x => {
            if (x.Uom == null) {
                x.Uom = {
                    Id: 0,
                    Unit: ""
                }
            }
        })
        console.log(this.data);
        //this.clearDataProperties();

    }

    clearDataProperties() {
        this.identityProperties.concat([

            "DocumentsPath"
        ]).forEach(prop => delete this.data[prop]);
        (this.data.SampleProducts || {}).RONoSample = null;

        this.data.SampleProducts.forEach(item => {
            this.identityProperties.concat([
                "Id",
            ]).forEach(prop => delete item[prop]);
            item.SampleSpecifications.forEach(detail => {
                this.identityProperties.concat([
                    "Id",
                ]).forEach(prop => delete detail[prop]);
            });
        });
    }

    cancelCallback() {
        this.router.navigateToRoute("list");
    }

    saveCallback() {
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}