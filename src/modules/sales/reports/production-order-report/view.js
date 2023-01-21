import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    listSPPColumns = [
        { value: "index", header: "No." },
        { value: "orderNo", header: "Nomor Order" },
        { value: "orderQuantity", header: "Jumlah Order" },
        { value: "uom", header: "Satuan" }
    ];

    listQCColumns = [
        { value: "index", header: "No." },
        { value: "orderNo", header: "Nomor Order" },
        { value: "grade", header: "Grade" },
        { value: "orderQuantity", header: "Panjang" }
    ];

    listDOColumns = [
        { value: "index", header: "No." },
        { value: "orderNo", header: "Nomor Order" },
        { value: "color", header: "Warna yang Diminta" },
        { value: "machine", header: "Mesin" },
        { value: "step", header: "Step" },
        { value: "area", header: "Area" },
        { value: "orderQuantity", header: "Input" }
    ];

    orderNo = "";
    dailyOperations = [];
    productionOrders = [];
    async activate(params) {
        this.orderNo = params.id ? decodeURIComponent(params.id) : 0;
        // this.orderNo = params.id;
        this.data = await this.service.getDetailReport(params.id);
        console.log(this.data)
        this.productionOrders = this.data.SPPList;
        this.dailyOperations = this.data.DailyOPList;
        this.qualityControls = this.data.QCList;

    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancel() {
        this.service.cancel(this.poExId).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }
}