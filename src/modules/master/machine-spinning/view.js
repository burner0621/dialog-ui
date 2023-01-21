import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, SpinningService } from './service';


@inject(Router, Service, SpinningService)
export class View {
    constructor(router, service, spinningService) {
        this.router = router;
        this.service = service;
        this.spinningService = spinningService;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    async deleteCallback(event) {
        var inputFlag = await this.spinningService.validateInInput(this.data.Id);
        var outputFlag = await this.spinningService.validateInOutput(this.data.Id);

        if (inputFlag || outputFlag) {
            alert("Data ini tidak bisa dihapus, data ini sudah terpakai di Machine Output atau Input");
        } else {
            this.service.delete(this.data)
                .then(result => {
                    this.list();
                });
        }
    }
}
