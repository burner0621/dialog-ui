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
        this.error = {};
        this.data.DeletedRemark = "";
    }

    save(context) {
        this.data.context = context;
        if (this.data.DeletedRemark == undefined || this.data.DeletedRemark == "") {
                this.error.DeletedRemark = "alasan harus di isi"
        } else {
            this.error = {};
        }

        if (this.error.DeletedRemark == "" || this.error.DeletedRemark == undefined) {
            this.controller.ok(this.data);
        }
    }
}