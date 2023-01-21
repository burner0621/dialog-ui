import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class View {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);

        this.sourceStorage = this.data.SourceStorage;
        this.targetStorage = this.data.TargetStorage;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.dialog.show(AlertView, { message: "<div>Apakah anda yakin akan menerima data ini?</div>" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.approveData(this.data.Id)
                        .then(result => {
                            this.list();
                        });
                }
            });

    }
}
