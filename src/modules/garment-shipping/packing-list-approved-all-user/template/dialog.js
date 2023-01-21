import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/merchandiser/packing-list/template/dialog.html")
export class Dialog {
    constructor(controller) {
        this.controller = controller;
        this.reason = null;
    }

    activate(params) {
        this.title = params.title;
    }
}