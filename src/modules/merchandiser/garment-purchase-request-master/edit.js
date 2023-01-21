import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class Edit {
    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPreSalesContract = {
                Id: this.data.SCId,
                SCNo: this.data.SCNo
            };

            if (this.data.Items) {
                let fabricItemsProductIds = this.data.Items
                    .filter(i => i.Category.Name === "FABRIC")
                    .map(i => i.Product.Id);

                if (fabricItemsProductIds.length > 0) {
                    const products = await this.coreService.getGarmentProductsByIds(fabricItemsProductIds);
                    this.data.Items
                        .filter(i => i.Category.Name === "FABRIC")
                        .forEach(i => {
                            const product = products.find(d => d.Id == i.Product.Id);

                            i.Composition = product;
                            i.Const = product;
                            i.Yarn = product;
                            i.Width = product;
                        });
                }
            }
        }
    }

    backToView() {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    cancelCallback(event) {
        this.backToView();
    }

    saveCallback(event) {
        this.service.update(this.data).then(result => {
            this.backToView();
        }).catch(e => {
            this.error = e;
        })
    }
}
