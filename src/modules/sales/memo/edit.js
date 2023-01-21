import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../au-components/dialog/dialog';


@inject(Router, Service, Dialog)
export class Edit {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    isEdit = true;

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.dialog.prompt('Apakah anda yakin akan menyimpan perubahan data ini?', 'Ubah Data Memo')
            .then((response) => {
                if (response.ok) {
                    this.service.update(this.data)
                        .then(result => {
                            this.router.navigateToRoute('view', { id: this.data.Id });
                        })
                        .catch(e => {
                            this.error = e;
                        })
                }
            })

    }
}
