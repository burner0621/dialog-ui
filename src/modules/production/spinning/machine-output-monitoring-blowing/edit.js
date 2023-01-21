import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");

@inject(Router, Service)
export class Edit {
    isEdit = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }


    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        var countRes = await this.service.getCountById(this.data.CountConfiguration.Id);
        this.data.countRes = countRes;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        
        this.data.Date = this.data.Date ? moment(this.data.Date).format("DD MMM YYYY") : null;
        
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            });
        
    }
}
