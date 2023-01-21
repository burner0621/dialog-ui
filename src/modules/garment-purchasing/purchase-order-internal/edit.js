import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSplit = true;

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
        // var items = this.data.items.filter(function (item) {
        //     return !item.isClosed
        // });
        // this.data.items = items
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

    split(event) {
        this.service.split(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    copyForSplit(purchaseOrder) {
        var newPurchaseOrder = Object.assign({}, purchaseOrder);
        delete newPurchaseOrder.Id;

        // newPurchaseOrder.sourcePurchaseOrderId = purchaseOrder._id;
        // newPurchaseOrder.sourcePurchaseOrder = Object.assign({}, purchaseOrder);
        console.log(newPurchaseOrder);
        return newPurchaseOrder;
    }
}