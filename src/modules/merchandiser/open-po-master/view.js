import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPRNo = {
                PRNo: this.data.PRNo,
            };

            if (this.data.Items) {
                this.data.Items = this.data.Items.filter(i => i.IsOpenPO === true);

                if (this.data.Items.length < 1) {
                    this.editCallback = null;
                }
            } else {
                this.editCallback = null;
            }
        }
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }
}