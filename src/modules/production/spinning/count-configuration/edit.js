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
        if (this.data.ProcessType != "Mix Drawing") {
            this.data.MaterialComposition = [];
            var itemDetail = {};
            itemDetail.LotId = this.data.LotId;
            itemDetail.LotNo = this.data.LotNo;
            itemDetail.YarnId = this.data.YarnMaterialTypeId;
            itemDetail.YarnCode = this.data.YarnMaterialTypeCode;
            itemDetail.Composition = 100;
            this.data.MaterialComposition.push(itemDetail);
        }
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
            alert("Missing Some Data");
        })
        // }
    }
}