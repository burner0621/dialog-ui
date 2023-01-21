import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
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
                        console.log(unitPaymentOrder);

                        for (let upoItem in unitPaymentOrder.items) {
                            for (let upoDetail in upoItem.unitReceiptNote.items) {
                                let correctionItem = correctionNote.items.find(item => item.uPODetailId == upoDetail.Id);

                                if (correctionItem)
                                    correctionItem.deliveredQuantity = upoDetail.deliveredQuantity;
                            }
                        }

                        return correctionNote;
                    })
            });
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}