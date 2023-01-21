import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport  =  [
        "Top Ten Event Monitoring",
        "Kapasitas Mesin vs Kuantiti Kanban vs Kuantiti Output Produksi",
        "Perbandingan Hasil QC",
        "Progres Lot Warna",
        "Top Ten Defect",
        "Good Output vs Bad Output All",
        "Good Output vs Bad Output Per Jenis Order",
        "Produksi vs Reproses",
        //"Kanban Aktif",
        "Monitoring Lead Time Real Time",
        "Monitoring Lead Time Historical",
        "Monitoring Penjualan Per Sales",
        "Monitoring Bad Output Produksi"
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

