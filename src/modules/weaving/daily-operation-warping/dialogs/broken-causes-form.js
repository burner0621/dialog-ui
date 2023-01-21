import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
@useView("modules/weaving/daily-operation-warping/dialogs/broken-causes-form.html")
export class BrokenCausesForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    }

    columns = [
        "Nama Penyebab Putus",
        "Total Putus"
    ]


    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    async activate(data) {
        this.data = data;
    }
}