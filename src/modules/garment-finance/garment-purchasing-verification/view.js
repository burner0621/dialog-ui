import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

import { Dialog } from '../../../components/dialog/dialog';
const ExpeditionLoader = require('../shared/expedition-loader');
import { CreateSubmit } from './dialog-template/create-submit';
import { PurchasingService } from '../shared/purchasing-service';

@inject(Router, Service, Dialog, PurchasingService)
export class View {
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
        this.router.navigateToRoute('list');
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

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.selectedExpedition.Id });
    }
}