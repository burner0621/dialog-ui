import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./alert-view.html")
export class AlertView {
    constructor(controller) {
        this.controller = controller; 
    }
    
    activate(data) {
        this.data = data;
    }

    save()
    {
        this.controller.ok(this.data);
    }
}