import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    isComplete = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    complete() {

        // var completedData = 0;

        // this.data.MaterialsRequestNote_Items.map((item) => {
        //     item.ProductionOrder.isCompleted = item.toBeCompleted;

        //     completedData += item.toBeCompleted ? 1 : 0;
        // })

        // if (completedData > 0) {
            this.service.complete(this.data).then(result => {
                this.view();
            }).catch(e => {
                this.error = e;
            })
            // alert("Test");
        // } else {
        //     alert("Anda belum memilih data!");
        // }
    }
}