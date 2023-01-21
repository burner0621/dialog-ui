import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
@useView("modules/sales/finishing-printing-cost-calculation/dialogs/utility-form.html")
export class UtilityForm {
    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }
    @bindable data;
    yearOptions = [];
    async activate(data) {
        console.log(data);
        this.data = data;
    }

    saveCallback() {
    

        let query = {
            month: this.month.MonthNumber,
            year: this.year,
        }

        this.service.getXlsAll(query);
        
    }
}