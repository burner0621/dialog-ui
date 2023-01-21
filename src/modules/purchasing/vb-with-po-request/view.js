import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    isVisible = true;
    isGarment = false;


    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        // console.log(this.data);

        if (this.data.ApprovalStatus == "Cancelled" || this.data.ApprovalStatus == "Approved") {
            this.hasDelete = false;
            this.hasEdit = false;
        }

        if (this.data.TypePurchasing) {
            this.isGarment = true;
            switch (this.data.TypePurchasing) {
                case "GARMENT":
                    this.TypePurchasing = "JOB";
                    break;
                case "UMUM":
                    this.TypePurchasing = "UMUM";
                    break;
                default:
                    this.TypePurchasing = null;
            }
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        // this.service.delete(this.data).then(result => {
        //     this.cancel();
        // });
        this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Permohonan VB dengan PO')
            .then(response => {
                if (response.ok) {
                    this.service.delete(this.data)
                        .then(result => {
                            this.cancel();
                        });
                }
            });
    }

}