import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

const PackingListLoader = require('../../../loader/garment-packing-list-loader');

@inject(Router, Service)
export class Create {

    @bindable packingList;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Buat"
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    get packingListLoader() {
        return PackingListLoader;
    }

    get packingListFilter() {
        var filter = {
            "(Status == \"DRAFT\" || Status == \"DRAFT_APPROVED_SHIPPING\")": true
        };

        return filter;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        if (this.packingList) {
            this.router.navigateToRoute('edit', { id: this.packingList.id });
        } else {
            alert("Pilih Nomor Invoice");
        }
    }
}