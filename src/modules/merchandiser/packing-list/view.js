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

        if (this.data.section) {
            this.selectedSection = await this.coreService.getSectionById(this.data.section.id);
        }

        switch (this.data.status) {
            case "APPROVED_SHIPPING":
                this.deleteCallback = null;
                this.editCallback = null;
            case "REJECTED_SHIPPING_MD":
                this.saveCallback = null;
                break;
        }

        switch (this.data.status) {
            case "REJECTED_SHIPPING_MD":
                this.statusActivityRemark = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                this.statusActivityAlert = "alert-danger";
                break;
                case "REVISED_TO_MD":
                    this.statusActivityRemark = "<strong>Alasan Reject :</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                    this.statusActivityAlert = "alert-info";
                  
                    break;
            default:
                break;
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

    saveCallback(event) {
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

    

}
