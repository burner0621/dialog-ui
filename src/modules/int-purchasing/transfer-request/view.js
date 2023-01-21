import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    prId = "";

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.prId = id;
        this.data = await this.service.getById(id);
        this.data.isUsed= false;
        if(this.data.details){
            for(var detail of this.data.details){
                if(detail.status != "Belum diterima Pembelian"){
                    this.data.isUsed=true;
                }
                break;
            }
        }
        //console.log(this.data);
        // this.data.date = moment(this.data.date).format("DD MMMM YYYY");
        // this.data.expectedDeliveryDate = moment(this.data.expectedDeliveryDate).format("DD MMMM YYYY");
        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        } 
        else {
            if (!this.data.isUsed && this.data.isPosted) {
                this.hasUnpost = true;
            }
        }

        this.data.unit.toString = function () {
            return [this.divisionName, this.name]
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
        this.data.details.forEach(item => {
            item.product.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
        });
        
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    unpost(event) {
        this.service.unpost(this.prId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}