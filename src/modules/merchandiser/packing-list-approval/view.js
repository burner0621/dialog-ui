import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';
import { DialogService } from 'aurelia-dialog';
import { Dialog } from "./template/dialog";

@inject(Router, Service, CoreService, DialogService)
export class View {

    isEdit = false;
    constructor(router, service, coreService, dialogService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
        this.dialogService = dialogService;
    }

    formOptions = {
        cancelText: "Back",
        editText: "Approve",
        deleteText: "Cancel",
        saveText: "Reject",
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        var idx = 0;
        if (this.data.measurements) {
            for (var i of this.data.measurements) {
                i.MeasurementIndex = idx;
                idx++;
            }
        }

        if (this.data.items) {
            this.data.items.map((item)=>{
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            });
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        if (confirm("Isi form untuk Approve")) {
            this.router.navigateToRoute('approve', { id: this.data.id });
        }
    }

    deleteCallback(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Cancel" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.cancel({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Cancel');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Cancel dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }

    saveCallback(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Reject" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.reject({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Reject');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Reject dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }
}
