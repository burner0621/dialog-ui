import { inject, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
// @useView("modules/packing-sku-inventory/dyeing-printing-out-packaging-v2/dialogs/packing-details.html")
export class PackagingDetailsForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    }

    columns = [
        "Kode",
        "Jenis",
        "Packaging",
        "QTY",
        "Panjang"
    ]
    activate(context){
        this.context = context;
    }

    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }


}