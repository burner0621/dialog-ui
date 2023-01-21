import { inject } from 'aurelia-framework'
import { Service } from "./service";
const GarmentPurchaseRequestLoader = require('../../../../loader/garment-purchase-request-loader');

@inject(Service)
export class List {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    garmentPurchaseRequestFilter = {
        "PRType == \"MASTER\" || PRType == \"SAMPLE\"": true
    }

    get garmentPurchaseRequestLoader() {
        return GarmentPurchaseRequestLoader;
    }

    tableData = []

    search() {
        if (this.selectedGarmentPurchaseRequest) {
            this.service.search({prid: this.selectedGarmentPurchaseRequest.Id})
                .then(result => this.tableData = result.data);
        } else {
            alert("Nomor RO harus diisi!");
        }
    }

    xls() {
        if (this.selectedGarmentPurchaseRequest) {
            this.service.xls({prid: this.selectedGarmentPurchaseRequest.Id});
        } else {
            alert("Nomor RO harus diisi!");
        }
    }
}