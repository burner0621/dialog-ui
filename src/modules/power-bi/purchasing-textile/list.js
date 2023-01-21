import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "Durasi PR",
        "Durasi PO Internal - PO Eksternal",
        "Durasi PO Eksternal - Surat Jalan",
        "Durasi Rencana Datang-Barang Tiba",
        "Durasi Bon Terima Unit - Surat Perintah Bayar",
        "Total Nilai Pembelian",
        "Supplier Tepat Waktu",
        "Perbandingan Purchase Order",
        "Top Ten Supplier per Total SPB",
        "Top Ten Supplier per Kategori",
        "PR belum dibuat PO internal"
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
