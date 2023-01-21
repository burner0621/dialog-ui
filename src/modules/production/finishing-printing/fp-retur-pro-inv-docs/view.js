import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
var moment = require("moment");

@inject(Router, Service, Dialog)
export class View {

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.NoBon = this.data ? this.data.Bon : {};
        this.Product = this.data ? this.data.Product.Code + " - " + this.data.Product.Name : {};
        this.Machine = this.data ? this.data.Machine : {};
        // this.Product = this.data ? this.data.Product
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    deleteCallback(event) {
        this.dialog.show(AlertView, { message: "<div>Apakah anda yakin akan menghapus data ini?</div>" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.delete(this.data).then(result => {
                        alert(`delete data success`);
                        this.cancelCallback();
                    });
                }
            });
    }

}