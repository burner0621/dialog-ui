import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/merchandiser/cost-calculation/template/dialog/unpost.html")
export class UnpostDialog {
    constructor(controller) {
        this.controller = controller;
        this.reason = null;
    }
}