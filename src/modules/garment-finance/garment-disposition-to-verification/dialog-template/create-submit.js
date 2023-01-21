import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./create-submit.html")
export class CreateSubmit {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {

        this.data = data || {};
    }

    save(context) {
        this.data.context = context;

        this.controller.ok(this.data);
    }
}