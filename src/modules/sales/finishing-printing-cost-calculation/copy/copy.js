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
            "ImagePath",
            "ProductionOrderNo",
            "IsPosted",
            "ApprovalMD",
            "ApprovalPPIC"

        ]).forEach(prop => delete this.data[prop]);
        for(var item of this.data.Machines){
            this.identityProperties.concat([
                "Index",
                "CostCalculationId"
            ]).forEach(prop => delete item[prop]);
            for(var chemical of item.Chemicals){
                this.identityProperties.concat([
                    "CostCalculationMachineId",
                    "CostCalculationId"
                ]).forEach(prop => delete chemical[prop]);
            }
        }
        
    }
    
    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.copiedCCFrom = this.data.ProductionOrderNo;
        this.data.PreSCNoSource = this.data.PreSalesContract.No;
        
        
    }

    
    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.clearDataProperties();
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
