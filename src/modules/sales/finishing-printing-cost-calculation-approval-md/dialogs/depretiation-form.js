import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
@useView("modules/sales/finishing-printing-cost-calculation/dialogs/depretiation-form.html")
export class DepretiationForm {
    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }
    @bindable data;
    yearOptions = [];
    async activate(data) {
        this.data = data;
    }

}