import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ProductionService } from './service';

@inject(Router, Service, ProductionService)
export class View {

    constructor(router, service, productionService) {
        this.router = router;
        this.service = service;
        this.productionService = productionService;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.selectedPackingList = this.data.invoiceNo;
        
        let exist = await this.productionService.getExpenditureGoodByInvoiceNo({ size: 1, filter: JSON.stringify({ Invoice: this.data.invoiceNo }) });
        if (exist.data.length > 0) {
          this.deleteCallback = undefined;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

}
