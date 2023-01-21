import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
@useView("modules/sales/finishing-printing-cost-calculation/dialogs/chemical-list-form.html")
export class ChemicalListForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    }

    columns = [
        "Nama Chemical",
        "Jumlah",
        "Satuan",
        "Mata Uang",
        "Harga Satuan",
        "Total Harga"
    ]


    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    // @bindable data;
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