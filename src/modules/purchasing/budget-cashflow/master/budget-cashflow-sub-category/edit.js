import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { MasterService } from './master-service';


@inject(Router, Service, MasterService)
export class Edit {
    constructor(router, service, masterService) {
        this.router = router;
        this.service = service;
        this.masterService = masterService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id)
            .then((subCategory) => {
                return this.service.getBudgetCashflowCategoryById(subCategory.CashflowCategoryId)
                    .then((cashflowCategory) => {
                        let itemPromises = subCategory.PurchasingCategoryIds.map((purchasingCategoryId) => {
                            return this.masterService.getCategoryById(purchasingCategoryId)
                                .then((purchasingCategory) => {
                                    return { Category: purchasingCategory }
                                })
                        })
                        return Promise.all(itemPromises)
                            .then((items) => {
                                subCategory.Items = items;
                                subCategory.CashflowCategory = cashflowCategory;

                                return subCategory;
                            })
                    })
            });
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {

        this.data.PurchasingCategoryIds = this.data.Items.map((item) => {
            return item.Category && item.Category._id ? item.Category._id : 0;
        });
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
            })
            .catch(e => {
                this.error = e;
            })
    }
}
