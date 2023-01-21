import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    // hasEdit = false;
    // hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id)
            .then((correctionNote) => {
                return this.service.getUnitPaymentOrderById(correctionNote.uPOId)
                    .then((unitPaymentOrder) => {
                        console.log(correctionNote);

                        for (let upoItem of unitPaymentOrder.items) {
                            for (let upoDetail of upoItem.unitReceiptNote.items) {
                                let correctionItem = correctionNote.items.find(item => item.uPODetailId == upoDetail.Id);

                                if (correctionItem)
                                    correctionItem.deliveredQuantity = upoDetail.deliveredQuantity;
                            }
                        }

                        return correctionNote;
                    })
            });
        // if (this.data.items) {
        //     this.data.items.forEach(item => {
        //         item.showDetails = false
        //     })
        // }

    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    // edit() {
    //     this.router.navigateToRoute('edit', { id: this.data._id });
    // }

    // delete() {
    //     this.service.delete(this.data).then(result => {
    //         this.list();
    //     });
    // }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}