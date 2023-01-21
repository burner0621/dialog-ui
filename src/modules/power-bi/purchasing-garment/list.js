import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "Durasi PR Garment",
        "Durasi PO Internal - PO Eksternal Garment",
        "Durasi PO Eksternal - Surat Jalan Garment",
        "Durasi Rencana Datang-Barang Tiba Garment",
        "Durasi Bon Terima Unit - Surat Perintah Bayar Garment",
        "Total Nilai Pembelian Garment",
        "Supplier Tepat Waktu Garment",
        "Perbandingan Purchase Order Garment",
        "Top Ten Supplier per Total NI Garment",
        "Top Ten Supplier per Kategori Garment",
        "PR belum dibuat PO internal Garment",
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
