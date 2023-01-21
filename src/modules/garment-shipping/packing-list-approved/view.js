import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';
import { DialogService } from 'aurelia-dialog';
import { Dialog } from "./template/dialog";

@inject(Router, Service, CoreService, DialogService)
export class View {

    constructor(router, service, coreService, dialogService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
        this.dialogService = dialogService;
    }

    formOptions = {
        cancelText: "Back",
        editText: "Edit",
        deleteText: "Cancel",
        saveText: "Revisi",
        
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
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
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

    revisiUnit(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Revisi" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.revise({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Revisi');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Revisi dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }
    revisiMD(event) {
        this.dialogService.open({ viewModel: Dialog, model: { title: "Alasan Revisi" } })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.reviseToMD({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil di-Revisi');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Revisi dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }
}
