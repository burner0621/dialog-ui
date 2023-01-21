import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';
import { Dialog } from "../../../au-components/dialog/dialog";
import { RejectDialog } from "./template/dialog/reject";

@inject(Router, Service, CoreService, Dialog)
export class View {

    constructor(router, service, coreService, dialog) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
        this.dialog = dialog;
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

    cancel(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Cancel" })
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

    rejectUnit(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Reject Unit" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.rejectUnit({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil diReject');
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

    rejectMd(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Reject Md" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.rejectMd({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil diReject');
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
