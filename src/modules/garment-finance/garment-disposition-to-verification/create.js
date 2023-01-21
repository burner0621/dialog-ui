import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

import { Dialog } from '../../../components/dialog/dialog';

@inject(Router, Service, Dialog)
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
        saveText: 'Simpan',
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.error = {};

        this.collection = {
            columns: ['No. Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Supplier', 'PPN', 'PPh', 'Total Bayar', 'Mata Uang', 'Keterangan'],
            onAdd: () => {
                this.data.Items.push({});
            },
        };
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        /*
            let data = {
                SubmissionDate: this.data.SubmissionDate,
                UnitPaymentOrders: [],
            };
        */

        console.log(this.data);

        this.service.createVerification(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });

        // this.service.create(this.data)
        //     .then(result => {
        //         alert('Data berhasil dibuat');
        //         this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
        //     })
        //     .catch(e => {
        //         this.error = e;
        //     });
    }
}