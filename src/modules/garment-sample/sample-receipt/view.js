import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from "../../../au-components/dialog/dialog";
import { RejectDialog } from "./template/dialog/reject";

@inject(Router, Service, Dialog)
export class View {
    isView = true;
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        if (this.data.IsPosted) {
            this.deleteCallback = null;
            this.editCallback = null;
            this.hasReceived = true;
            this.hasRejected = true;
            this.hasRevised = false;
        }
        if (this.data.IsReceived || this.data.IsRejected) {
            this.hasReceived = false;
            this.hasRejected = false;
            this.hasRevised = !this.data.IsRevised;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    receivedCallback(event) {
        if (confirm(`Terima ${this.data.SampleRequestNo}?`)) {
            var dataToBeReceived = {
                Id: this.data.Id,
                IsReceived: true,
            }
            this.service.receivedSample(dataToBeReceived)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                    if (typeof (this.error) == "string") {
                        alert(this.error);
                    } else {
                        alert("Missing Some Data");
                    }
                })
        }
    }

    rejectedCallback(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Reject" })
            .then(response => {
                if (!response.wasCancelled) {
                    var dataToBeRejected = {
                        Id: this.data.Id,
                        IsRejected: true,
                        RejectedReason: response.output,
                    }
                    this.service.rejectedSample(dataToBeRejected)
                        .then(result => {
                            alert('Penerimaan Sample berhasil di Reject');
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

    revisedCallback(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Revisi" })
            .then(response => {
                console.log(response);
                if (!response.wasCancelled) {
                    var dataToBeRevised = {
                        Id: this.data.Id,
                        IsRevised: true,
                        RevisedReason: response.output,
                    }
                    this.service.revisedSample(dataToBeRevised)
                        .then(result => {
                            alert('Penerimaan Sample berhasil di Revisi');
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