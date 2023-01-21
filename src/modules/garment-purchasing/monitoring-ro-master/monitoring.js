import { inject } from 'aurelia-framework'
import { Service } from "./service";
const PurchaseRequestLoader = require('../../../loader/garment-purchase-request-loader');

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    purchaseRequestFilter = {
        "IsValidated": true,
        "PRType": "MASTER"
    }

    get purchaseRequestLoader() {
        return PurchaseRequestLoader;
    }

    tableData = []

    search() {
        if (this.selectedPurchaseRequest) {
            this.service.search({ prid: this.selectedPurchaseRequest.Id })
                .then(result => this.tableData = result.data.map(data => {
                    if ((data.DeliveryOrders || []).length < 1) {
                        data.DeliveryOrders = [ { Distributions: [ {} ] } ]
                    } else {
                        data.DeliveryOrders.forEach(deliveryOrder => {
                            if ((deliveryOrder.Distributions || []).length < 1) {
                                deliveryOrder.Distributions = [ {} ]
                            }
                        });
                    }
                    data.rowSpan = data.DeliveryOrders.reduce((acc, cur) => acc += cur.Distributions.length || 1, 0) || 1;
                    return data;
                }));
        } else {
            alert("Nomor RO harus diisi!");
        }
    }

    xls() {
        if (this.selectedPurchaseRequest) {
            this.service.xls({ prid: this.selectedPurchaseRequest.Id });
        } else {
            alert("Nomor RO harus diisi!");
        }
    }
}