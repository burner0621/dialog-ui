import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    isEdit=true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.date = moment(this.data.date).format("YYYY-MM-DD");
        this.data.expectedDeliveryDate = moment(this.data.expectedDeliveryDate).format("YYYY-MM-DD");

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
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            alert("Data berhasil diubah");
            this.cancel();
        }).catch(e => {
            if (e.statusCode == 500) {
                alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
            } else if (e.statusCode == 400){
                alert("Terdapat data yang tidak valid, mohon dicek kembali");
            } else {
                this.error = e;
            }
        })
    }
}
