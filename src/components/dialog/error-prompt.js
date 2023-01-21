import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("components/dialog/error-prompt.html")
export class ErrorPrompt {
    constructor(controller) {
        this.controller = controller;
        this.answer = null;
    }

    activate(data) {
        this.message = data.message;
    }
}