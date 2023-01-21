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
        var id = params.id;
        this.data = await this.service.getById(id);

    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.data.IsMixDrawing = true;
        
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
            if (typeof (this.error) == "string") {
                alert(this.error);
            } else {
                alert("Missing Some Data");
            }
        })
        // }
    }
}