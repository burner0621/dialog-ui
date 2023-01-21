import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "Top Ten Konstruksi",
        "Top Ten Buyer",
        "Total Order Produksi",
        "Status Order Produksi",
        "Sales Contract Aktif",
        "Summary Sales Contract Berdasarkan Tanggal Dibuat",
        "Summary Sales Contract Berdasarkan Tanggal Pengiriman",
        "Sales Contract Per Tanggal Dibuat",
        "Sales Contract Per Tanggal Delivery"
    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                for (var report of this.listReport) {
                    var _data = data.find((_data) => _data.name === report);
                    if (_data) {
                        this.data.push(_data);
                    }
                }
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.id });
    }
}
