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
        this.data.isSplit = true;
        this.data.purchaseRequest=this.data;

        this.data.purchaseRequest.toString = function () {
            return `${this.prNo}`
        }
        this.purchaseRequest=this.data.purchaseRequest;
        
        this.data.purchaseRequest.date=this.data.prDate;
        
        this.data.purchaseRequest.unit.toString = function () {
            return [this.division.name, this.name]
                .filter((item, index) => {
                    return item ;
                }).join(" - ");
        }

        this.data.purchaseRequest.category.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item ;
                }).join(" - ");
        }

        this.data.items.forEach(item => {
            item.product.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item ;
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

    split(event) {
        var newInternalPurchaseOrder = Object.assign({}, this.data);
        delete newInternalPurchaseOrder.purchaseRequest;
        delete newInternalPurchaseOrder.toString();
        delete newInternalPurchaseOrder._id;
        this.service.spliting(this.data._id, newInternalPurchaseOrder).then(result => {
            // console.log(this.data);
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
    // split(event) {
    //     this.service.split(this.copyForSplit(this.data)).then(result => {
    //         this.cancel();
    //     }).catch(e => {
    //         this.error = e;
    //     })
    // }

    // copyForSplit(purchaseOrder) {
    //     var newPurchaseOrder = Object.assign({}, purchaseOrder);
    //     delete newPurchaseOrder._id;
    //     newPurchaseOrder.sourcePurchaseOrderId = purchaseOrder._id;
    //     newPurchaseOrder.sourcePurchaseOrder = Object.assign({}, purchaseOrder);
    //     console.log(newPurchaseOrder);
    //     return newPurchaseOrder;
    // }
}