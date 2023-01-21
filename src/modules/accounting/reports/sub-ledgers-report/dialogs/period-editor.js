import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
@useView("modules/accounting/reports/sub-ledgers-report/dialogs/period-editor.html")
export class PeriodEditor {
    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }
    
    yearOptions = [];
    async activate(data) {
        this.year = (new Date()).getFullYear();
        for (var i = this.year; i > 2010; i--) {
            this.yearOptions.push(i);
        }

        let monthResult = await this.service.getMonths();
        this.monthOptions = monthResult.data;
        this.month = this.monthOptions[(new Date()).getMonth()];
    }

    saveCallback() {
    

        let query = {
            month: this.month.MonthNumber,
            year: this.year,
        }

        this.service.getXlsAll(query);
        
    }
}