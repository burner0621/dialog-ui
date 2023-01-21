import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, PurchasingService } from "../service";
import { RateService } from '../service-rate';

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const rateNumberFormat = "0,0.000";

@inject(Router, Service, PurchasingService, RateService)
export class Copy {
    constructor(router, service, prService, rateService) {
        this.router = router;
        this.service = service;
        this.prService = prService;
        this.rateService = rateService;
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
        this.copiedROFrom = this.data.RO_Number;
        this.data.PreSCNoSource = this.data.PreSCNo;

        if (this.data) {
            let promises = [];

            let wage = this.rateService.search({ filter: "{Name:\"OL\"}" })
                .then(results => {
                    let result = results.data[0] ? results.data[0] : this.defaultRate;
                    result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
                    return result;
                });
            promises.push(wage);

            let THR = this.rateService.search({ filter: "{Name:\"THR\"}" })
                .then(results => {
                    let result = results.data[0] ? results.data[0] : this.defaultRate;
                    result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
                    return result;
                });
            promises.push(THR);

            let rate = this.rateService.search({ filter: "{Name:\"USD\"}" })
                .then(results => {
                    let result = results.data[0] ? results.data[0] : this.defaultRate;
                    result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
                    return result;
                });
            promises.push(rate);

            let all = await Promise.all(promises);
            this.data.Wage = all[0];
            this.data.Wage.Value = this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            this.data.THR = all[1];
            this.data.Rate = all[2];

            const prMasterIds = this.data.CostCalculationGarment_Materials
                .filter((m, i) => m.PRMasterId > 0 && this.data.CostCalculationGarment_Materials.findIndex(d => d.PRMasterId === m.PRMasterId) === i)
                .map(m => `Id==${m.PRMasterId}`);

            const prMasterItemIds = this.data.CostCalculationGarment_Materials
                .filter((item, index) => item.PRMasterItemId > 0 && this.data.CostCalculationGarment_Materials.findIndex(d => d.PRMasterItemId === item.PRMasterItemId) === index)
                .map(item => item.PRMasterItemId);

            if (prMasterIds.length > 0) {
                let prMasterFilter = {};
                prMasterFilter[`(${prMasterIds.join("||")})`] = true;

                const prMasterResult = await this.prService.search({
                    size: 10000,
                    select: JSON.stringify({ "Id": "1", "Items.Id": "1", "Items.Quantity": "1" }),
                    filter: JSON.stringify(prMasterFilter)
                });
                let prMasters = [];
                for (const d of prMasterResult.data) {
                    for (const i of d.Items) {
                        prMasters.push({
                            PRMasterId: d.Id,
                            PRMasterItemId: i.Id,
                            Quantity: i.Quantity
                        });
                    }
                }

                const ccMaterialsResults = await this.service.getMaterials({
                    size: 0,
                    select: "new(PRMasterId, PRMasterItemId, BudgetQuantity)",
                    prmasteritemids: JSON.stringify(prMasterItemIds),
                });
                const ccMaterials = ccMaterialsResults.data;

                this.data.CostCalculationGarment_Materials.forEach(material => {
                    if (material.PRMasterItemId > 0) {
                        const quantity = prMasters.find(pr => pr.PRMasterItemId === material.PRMasterItemId).Quantity;
                        const budgetQuantities = ccMaterials.filter(m => m.PRMasterItemId === material.PRMasterItemId).reduce((acc, cur) => acc + cur.BudgetQuantity, 0);
                        material.AvailableQuantity = quantity - budgetQuantities;
                    }
                });
            }
        }

        this.clearDataProperties();
    }

    clearDataProperties() {
        this.identityProperties.concat([
            "PreSCId",
            "PreSCNo",
            "Code",
            "RO_Number",
            "ImagePath",
            "RO_GarmentId",
            "RO_RetailId",
            "Article",
            "AutoIncrementNumber",
            "SCGarmentId",
            "ApprovalIE",
            "ApprovalMD",
            "ApprovalPPIC",
            "ApprovalPurchasing",
            "ApprovalKadivMD",
            "IsPosted",
            "IsROAccepted",
            "IsROAvailable",
            "IsRODistributed",
            "IsValidatedROPPIC",
            "IsValidatedROSample",
            "IsValidatedROMD",
            "ROAcceptedBy",
            "ROAcceptedDate",
            "ROAvailableBy",
            "ROAvailableDate",
            "RODistributionBy",
            "RODistributionDate",
            "ValidationPPICBy",
            "ValidationPPICDate",
            "ValidationSampleBy",
            "ValidationSampleDate",
            "ValidationMDBy",
            "ValidationMDDate"
        ]).forEach(prop => delete this.data[prop]);
        this.data.CostCalculationGarment_Materials.forEach(ccm => {
            ccm.isCopy = true;
            this.identityProperties.concat([
                "AutoIncrementNumber",
                "Code",
                "PO",
                "PO_SerialNumber",
                "Information",
                "IsPosted",
                "IsPRMaster"
            ]).forEach(prop => delete ccm[prop]);
        });
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
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
