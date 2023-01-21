import { inject, Lazy, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async activate(params) {
        this.data = {};
        this.data.displayShippingProductionOrders = await this.service.getProductionOrderOutput();

    }

    back() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    @computedFrom("data.shippingType")
    get showReject() {
        return this.data && this.data.shippingType == "RETUR BARANG";
    }

    save() {
        if (this.data.shippingType == "ZONA GUDANG") {
            this.data.shippingProductionOrders = this.data.displayShippingProductionOrders.filter(s => s.IsSave === true);
        }

        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }

    reject() {
        if (this.data.shippingType == "ZONA GUDANG") {
            this.data.shippingProductionOrders = this.data.displayShippingProductionOrders.filter(s => s.IsSave === true);
        }

        this.service.reject(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }
}