import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PurchasingService } from './service';


@inject(Router, Service, PurchasingService)
export class Edit {
    constructor(router, service, prService) {
        this.router = router;
        this.service = service;
        this.prService = prService;
        this.data = {};
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        console.log(this.data);

        if (this.data) {
            this.selectedPreSalesContract = {
                SCNo: this.data.PreSCNo
            }

            this.selectedBookingOrder = {
                BookingOrderId :this.data.BookingOrderId,
                BookingOrderItemId : this.data.BookingOrderItemId,
                BookingOrderNo : this.data.BookingOrderNo, 
                ConfirmDate : this.data.ConfirmDate,
                ConfirmQuantity : this.data.BOQuantity,
                ComodityName : this.data.Comodity.Name,
            }

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

                let materialsFilter = {};
                materialsFilter[`(CostCalculationGarmentId == ${id})`] = false;

                const ccMaterialsResults = await this.service.getMaterials({
                    size: 0,
                    select: "new(PRMasterId, PRMasterItemId, BudgetQuantity)",
                    prmasteritemids: JSON.stringify(prMasterItemIds),
                    filter: JSON.stringify(materialsFilter)
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
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.Id });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
