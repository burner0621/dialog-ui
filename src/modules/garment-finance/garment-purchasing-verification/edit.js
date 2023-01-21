import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

import { Dialog } from '../../../components/dialog/dialog';
const ExpeditionLoader = require('../shared/expedition-loader');
import { CreateSubmit } from './dialog-template/create-submit';
import { PurchasingService } from '../shared/purchasing-service';

@inject(Router, Service, Dialog, PurchasingService)
export class Edit {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Verifikasi',
    };

    constructor(router, service, dialog, purchasingService) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.purchasingService = purchasingService;
        this.submitContext = {};
        this.data = {};
        this.error = {};
        this.verificationDate = new Date();

        // this.collection = {
        //     columns: ['No. Nota Intern', 'Tanggal Nota Intern', 'Tanggal Jatuh Tempo', 'Supplier', 'PPN', 'PPh', 'Total Bayar', 'Mata Uang', 'Keterangan'],
        //     onAdd: () => {
        //         this.data.Items.push({});
        //     },
        // };
    }

    async activate(params) {
        console.log(params);

        this.selectedExpedition = await this.service.getById(params.id);
        if (this.selectedExpedition) {
            this.verificationDate = this.selectedExpedition.VerificationAcceptedDate;

            let internalNote = await this.purchasingService.getInternalNoteById(this.selectedExpedition.InternalNoteId);
            this.items = internalNote.items
        }
    }

    invoiceNoteItem = {
        columns: [
            { header: "Nomor Invoice", value: "invoice.invoiceNo" },
            { header: "Tanggal Invoice" },
            { header: "Total Amount" }
        ],
        onAdd: function () {
            // this.context.ItemsCollection.bind();
            // this.data.items.push({});
        }.bind(this),
    };

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.selectedExpedition.Id });
    }

    get expeditionLoader() {
        return ExpeditionLoader;
    }

    @bindable selectedExpedition;
    async selectedExpeditionChanged(newValue, oldValue) {
        console.log(this);

        if (newValue) {
            var internalNote = await this.purchasingService.getInternalNoteById(newValue.InternalNoteId);
            console.log(internalNote);
            this.items = internalNote.items;
        } else {
            this.items = [];
        }
    }

    saveCallback(event) {
        /*
            let data = {
                SubmissionDate: this.data.SubmissionDate,
                UnitPaymentOrders: [],
            };
        */

        if (!this.selectedExpedition) {
            this.error.internalNote = "Nomor Nota Intern harus diisi";
        } else {
            this.error = {};

            this.submitContext.verifiedAlert = true;

            this.dialog.show(CreateSubmit, this.submitContext)
                .then((response) => {
                    if (!response.wasCancelled) {
                        if (response.output.context == 'Cashier') {
                            this.service.sendToCashier(this.selectedExpedition.Id)
                                .then(result => {
                                    alert("Data berhasil dibuat");
                                    this.router.navigateToRoute('view', { id: this.selectedExpedition.Id });
                                })
                                .catch(e => {
                                    this.error = e;
                                });
                        } else if (response.output.context == 'Accounting') {
                            this.service.sendToAccounting(this.selectedExpedition.Id)
                                .then(result => {
                                    alert("Data berhasil dibuat");
                                    this.router.navigateToRoute('view', { id: this.selectedExpedition.Id });
                                })
                                .catch(e => {
                                    this.error = e;
                                });
                        }
                    }
                })
        }
    }

    rejectCallback(event) {
        if (!this.selectedExpedition) {
            this.error.internalNote = "Nomor Nota Intern harus diisi";
        } else {
            this.error = {};

            this.submitContext.verifiedAlert = false;

            this.dialog.show(CreateSubmit, this.submitContext)
                .then((response) => {
                    console.log(response)
                    if (!response.wasCancelled) {
                        if (response.output.context == 'Not Verified') {
                            let remark = response.output.Remark;
                            this.service.sendToPurchasingRejected(this.selectedExpedition.Id, remark)
                                .then(result => {
                                    alert("Data berhasil dibuat");
                                    this.router.navigateToRoute('view', { id: this.selectedExpedition.Id });
                                })
                                .catch(e => {
                                    this.error = e;
                                });
                        }
                    }
                })
        }
    }
}