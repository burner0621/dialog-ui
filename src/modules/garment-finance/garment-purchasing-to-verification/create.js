import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

import { Dialog } from '../../../components/dialog/dialog';
import { CreateSubmit } from './dialog-template/create-submit';

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
            columns: ['No. Nota Intern', 'Tanggal Nota Intern', 'Tanggal Jatuh Tempo', 'Supplier', 'DPP', 'PPN', 'PPh', 'Total Bayar', 'Mata Uang', 'Keterangan'],
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

        let filledData = this.data.Items.filter(function (item) {
            return item.InternalNote.DocumentNo != undefined;
        });

        var valueArr = filledData.map(function (item) { return item.InternalNote.DocumentNo });

        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item, idx + 1) !== -1
        });
        

        if (!isDuplicate) {
            this.dialog.show(CreateSubmit)
            .then((response) => {
                console.log(response)
                if (!response.wasCancelled) {
                    if (response.output.context == 'Verification') {
                        this.service.createVerification(this.data)
                            .then(result => {
                                alert("Data berhasil dibuat");
                                this.router.navigateToRoute('list');
                            })
                            .catch(e => {
                                this.error = e;
                            });
                    } else if (response.output.context == 'Accounting') {
                        this.service.createAccounting(this.data)
                            .then(result => {
                                alert("Data berhasil dibuat");
                                this.router.navigateToRoute('list');
                            })
                            .catch(e => {
                                this.error = e;
                            });
                    }
                }
            })
        } else {
            alert("Terdapat No. Nota Intern yang Sama");
        }


        

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