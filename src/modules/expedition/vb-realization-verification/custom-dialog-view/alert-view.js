import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./alert-view.html")
export class AlertView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {

        // this.data = data;
        this.error = {};
        this.data = {};
        // this.data.Reason = "";
    }

    save(context) {
        this.data.context = context;
        // if (this.data.context == "NotVerified") {
        // if (this.data.Reason == undefined || this.data.Reason == "") {
        //     this.error.Reason = "alasan harus di isi"
        // } else {
        //     this.error = {};
        // }
        // // }

        // if (this.error.Reason == "" || this.error.Reason == undefined) {
        //     this.controller.ok(this.data);
        // }

        if(this.data.Remark == undefined || this.data.Remark == ""){
            this.error.Remark = "alasan harus di isi";
        }else{
            this.error = {};
            this.controller.ok(this.data);
        }
    }
}