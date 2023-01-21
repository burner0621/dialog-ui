import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";

@inject(Router, Service)
export class Copy {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    identityProperties = [
        "Id",
        "Active",
        "CreatedUtc",
        "CreatedBy",
        "CreatedAgent",
        "LastModifiedUtc",
        "LastModifiedBy",
        "LastModifiedAgent",
        "IsDeleted",
        "UId"
    ];

    clearDataProperties() {
        this.identityProperties.concat([
            "Code",
            "AutoIncrementNumber",
            "RemainingQuantity",
            "UseIncomeTax"
        ]).forEach(prop => delete this.data[prop]);
        for (var item of this.data.Details) {
            this.identityProperties.concat([

            ]).forEach(prop => delete item[prop]);

        }

    }

    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.data.Date = new Date().toLocaleString();
        this.data.isCopy = true;
        this.data.SCNoSource = this.data.SalesContractNo;
        this.data.dataCC = await this.service.getCCbyPreSC(this.data.PreSalesContract.Id);
        

    }


    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    back() {
        this.cancelCallback();
    }

    save() { 
        this.saveCallback();
    }

    saveCallback(event) {
        this.clearDataProperties();
        this.data.RemainingQuantity = this.data.PreSalesContract.OrderQuantity + (this.data.PreSalesContract.OrderQuantity * this.data.ShippingQuantityTolerance / 100);
        this.service
            .create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.list();
            })
            .catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal menyimpan, silakan coba lagi!");
                } else {
                    this.error = e;
                }
            });
    }
}
