import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../../components/dialog/dialog';
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

        this.unit = this.data.Unit;
        this.type = this.data.Type;

        for (let d of this.data.MaterialDistributionNoteItems) {
            let exists = d.MaterialDistributionNoteDetails.find(p => p.IsCompleted === true);

            if (exists) {
                this.deleteCallback = null;
                break;
            }
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    deleteCallback(event) {
        this.dialog.show(AlertView, { message: "<div>Apakah anda yakin akan menghapus data ini?</div>" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.delete(this.data)
                        .then(result => {
                            this.list();
                        });
                }
            });

    }
}
