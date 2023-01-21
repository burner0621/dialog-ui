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
        this.data.Remark = "";
    }

    save(context) {
        this.data.context = context;
        if (this.data.context == "NotVerified") {
            if (this.data.Remark == undefined || this.data.Remark == "") {
                this.error.Remark = "alasan harus di isi"
            } else {
                this.error = {};
            }
        }

        if (this.error.Remark == "" || this.error.Remark == undefined) {
            this.controller.ok(this.data);
        }
    }
}