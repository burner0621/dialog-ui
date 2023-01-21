import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

import BankLoader from '../../../../loader/account-banks-loader';

@inject(DialogController)
@useView("./create-view.html")
export class CreateView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {
        this.error = {};
        this.data = {};
    }

    get bankLoader() {
        return BankLoader;
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - ${bank.AccountNumber}` : '';
    }

    save(context) {
        this.data.context = context;
        if (!this.data.Bank) {
            this.error.Bank = "bank harus di isi";
        } else {
            this.error = {};
            this.controller.ok(this.data);
        }
    }
}