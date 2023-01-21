import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    prId = "";

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;
        this.prId = id;
        this.data = await this.service.getById(id);
        // this.data.date = moment(this.data.date).format("DD MMMM YYYY");
        // this.data.expectedDeliveryDate = moment(this.data.expectedDeliveryDate).format("DD MMMM YYYY");
        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        } else {
            if (!this.data.isUsed) {
                this.hasUnpost = true;
            }
        }

        this.data.unit.toString = function () {
            return [this.division.name, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.budget.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.category.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.items.forEach(item => {
            item.product.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
        })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        if(confirm('Apakah anda ingin merubah data ini?') == true) {
            this.router.navigateToRoute('edit', { id: this.data._id });
        }
    }

    delete(event) {
        this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Purchase Request')
        .then(response => {
            if (response.ok) {
                this.service.delete(this.data).then(result => {
                    alert("Data berhasil dihapus");
                    this.cancel();
                });
            }
        })
    }

    unpost(event) {
        this.service.unpost(this.prId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}