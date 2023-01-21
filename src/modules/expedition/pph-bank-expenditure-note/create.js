import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.data.PPHBankExpenditureNoteItems = [];

        for (let item of JSON.parse(JSON.stringify(this.data.UnitPaymentOrders.filter(p => p.Check === true)))) {
            item.PurchasingDocumentExpeditionId = item.Id;
            item.Id = 0;
            this.data.PPHBankExpenditureNoteItems.push(item);
        }

        if (this.data.Bank)
            this.data.Currency = this.data.Bank.Currency.Code;

        if (this.data.PPHBankExpenditureNoteItems.length > 0) {
            let totalDPP = 0, totalPPH = 0;

            for (let i of this.data.PPHBankExpenditureNoteItems) {
                totalDPP += i.TotalPaid - i.Vat;
                totalPPH += i.IncomeTax;
            }

            this.data.TotalDPP = totalDPP;
            this.data.TotalIncomeTax = totalPPH;
        }

        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }
}
