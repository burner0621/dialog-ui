import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("au-components/dialog/prompt.html")
export class Prompt {
    constructor(controller) {
        this.controller = controller;
        this.answer = null;
    }

    activate(data) {
        this.title = data.title;
        this.message = data.message;
    }
}