import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./create-submit.html")
export class CreateSubmit {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {

        this.data = data;
        this.error = {};
        this.data.Remark = "";
    }

    datadisposisi(isOk){
        // console.log("choice",yesOrNo);
        if(isOk){
            this.save('Cashier');
            // console.log("saved to Cashier");
        }else{
            this.data.verifiedAlert = false;
        }
    }

    back(){
        this.data.Remark = "";
        this.data.verifiedAlert = true;
    }

    save(context) {
        // this.data.context = context;

        // this.controller.ok(this.data);

        this.data.context = context;
        if (this.data.context == "Not Verified") {
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