import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import moment from 'moment';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isEdit=true;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.data.unit.toString = function () {
            return [this.divisionName, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        };
        this.data.category.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        };
        this.data.details.forEach(item => {
            item.product.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
        });
        this.data.trDate = new Date(this.data.trDate);
        this.data.requestedArrivalDate = new Date(this.data.requestedArrivalDate);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        this.data.requestedArrivalDate = moment(this.data.requestedArrivalDate).format("DD MMM YYYY HH:mm");
        this.data.trDate = moment(this.data.trDate).format("DD MMM YYYY HH:mm");
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
