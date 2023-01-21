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
    ];

    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.copiedFrom = { SCNo: this.data.SalesContractNo, RONo: this.data.RONumber };
        this.clearDataProperties();

        this.selectedRo = { RO_Number: "" };
        this.data.comodity = this.data.ComodityCode + " - " + this.data.ComodityName;
        this.data.buyer = this.data.BuyerBrandCode + " - " + this.data.BuyerBrandName;
        this.data.UomUnit = this.data.Uom.Unit;
        if (this.data.AccountBankId || this.data.AccountBank.Id) {
            const accId = this.data.AccountBankId ? this.data.AccountBankId : this.data.AccountBank.Id;
            this.selectedAccountBank = await this.service.getAccountBankById(accId);
        }
    }

    clearDataProperties() {
        this.identityProperties.concat([
            "SalesContractNo",
            "RONumber",
            "CostCalculationId"
        ]).forEach(prop => delete this.data[prop]);
    }

    list() {
        this.router.navigateToRoute("list");
    }

    copy() {
        this.service
            .create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.list();
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            });
    }
}
