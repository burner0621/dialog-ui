import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
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
    collection = {
        columns: ['No Disposisi', 'Tanggal Disposisi', 'Tanggal Jatuh Tempo', 'Supplier', 'PPH', 'PPN', 'Total Bayar', 'Mata Uang'],
        onAdd: function () {
            this.data.PurchaseDisposition.push({});
        }.bind(this)
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        this.datatemp = [];
        for (var data of this.data.PurchaseDisposition) {

            var datatemp = {
                dispositionDate: data.dispositionDate,
                currency: data.currency,
                supplier: data.supplier,
                paymentDueDate: data.paymentDueDate,
                incomeTaxVm: data.incomeTaxVm,
                incomeTax: data.incomeTax,
                vat: data.vat,
                totalPaid: data.totalPaid,
                proformaNo: data.proformaNo,
                dispositionId: data.dispositionId,
                dispositionNo: data.dispositionNo,
                useIncomeTax: data.useIncomeTax,
                useVat: data.useVat,
                paymentMethod: data.paymentMethod,
                paymentCorrection: data.paymentCorrection,
                category: data.category,
                division: data.division,
                incomeTaxValue: data.incomeTaxValue,
                vatValue: data.vatValue,
                dpp: data.dpp,
                payToSupplier: data.payToSupplier,
                items: data.items,

            };
            this.datatemp.push(datatemp)
        }
        this.service.create(this.datatemp)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }
}
