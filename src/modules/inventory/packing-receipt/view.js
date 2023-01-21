import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.packingReadOnly = true;
        this.Packing = this.data;
        this.Packing.Code = this.data.PackingCode;
        this.data.Packing = this.data;
        this.data.Packing.OrderTypeName = this.data.Packing.OrderType

        if (this.data.Items.length > 0) {
            var delivered;
            for (var item of this.data.Items) {
                var properties = Object.getOwnPropertyNames(item);
                delivered = properties.find((property) => property.toString().toLowerCase() === "isdelivered");

                if (delivered) {
                    if (item.IsDelivered || this.data.IsVoid) {
                        this.isVoid = false;
                        break;
                    } else {
                        this.isVoid = true;
                    }
                } else {
                    this.isVoid = false;
                    break;
                }
            }
        }
    }

    update() {
        delete this.data.Packing;
        this.data.IsVoid = true;
        // remove total jumlah object
        this.data.Items = this.data.Items.slice(0, -1);
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }


    attached() {

        var total = {
            Product: "Total Jumlah",
            Quantity: 0,
            AvailableQuantity: 0,
            WeightTotalAmount: 0,
            Weight: 0,
            LengthTotalAmount: 0,
            Length: 0,

        };

        for (var item of this.data.Items) {

            total.Quantity += item.Quantity;
            total.AvailableQuantity += item.AvailableQuantity;
            total.Weight += item.Weight;
            total.Length += item.Length;
            total.WeightTotalAmount += item.Weight * item.Quantity;
            total.LengthTotalAmount += item.Length * item.Quantity;
        }

        this.data.Items.push(total);
    }
}