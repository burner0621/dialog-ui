import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

import { Dialog } from '../../../components/dialog/dialog';
const ExpeditionLoader = require('../shared/disposition-expedition-loader');
import { CreateSubmit } from './dialog-template/create-submit';
import { PurchasingService } from '../shared/purchasing-service';

@inject(Router, Service, Dialog, PurchasingService)
export class Create {
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
        //     columns: ['No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Supplier', 'PPN', 'PPh', 'Total Bayar', 'Mata Uang', 'Keterangan'],
        //     onAdd: () => {
        //         this.data.Items.push({});
        //     },
        // };
    }

    collection = {
        columns: ["Nomor External PO", "Kena PPN", "Nominal PPN", "Kena PPh", "PPh", "Nominal PPh", "Verified Amount", ""],
        onAdd: function () {
            // this.context.ItemsCollection.bind();
            // this.data.items.push({});
        }.bind(this),
    };

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    get expeditionLoader() {
        return ExpeditionLoader;
    }

    @bindable selectedExpedition;
    dispositionNote = null;
    async selectedExpeditionChanged(newValue, oldValue) {
        console.log(this);

        if (newValue && newValue.Id) {
            var dispositionNote = await this.purchasingService.getDispositionNoteByIdVerifiedCalculated(newValue.DispositionNoteId);
            this.dispositionNote = dispositionNote;
            console.log(dispositionNote);
            this.items = dispositionNote.Items;
        } else {
            this.items = [];
            this.dispositionNote = null;
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
            this.error.dispositionNote = "Nomor Disposisi harus diisi";
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
                                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                                })
                                .catch(e => {
                                    this.error = e;
                                });
                        } else if (response.output.context == 'Accounting') {
                            this.service.sendToAccounting(this.selectedExpedition.Id)
                                .then(result => {
                                    alert("Data berhasil dibuat");
                                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
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
            this.error.dispositionNote = "Nomor Disposisi harus diisi";
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
                                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
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