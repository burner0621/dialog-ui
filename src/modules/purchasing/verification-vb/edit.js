import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class Edit {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.submitContext = {
            verifiedAlert: false,
            position: 0,
        };
    }

    isEdit = true;

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.numberVB.Id });
    }

    Submit(context) {

        var Data = this.data;
        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.dialog.show(AlertView, this.submitContext)
            .then(response => {

                if (!response.wasCancelled) {
                    if (response.output.context == "Clearance") {
                        // Data.SubmitPosition = 5;
                    } else if (response.output.context == "Cashier") {
                        Data.isVerified = true;
                        Data.isNotVeridied = false;
                        // Data.SubmitPosition = 4;
                    } else {
                        // Data.SubmitPosition = 6;
                        Data.isVerified = false;
                        Data.isNotVeridied = true;
                        Data.Remark = response.output.Remark;
                        Data.Reason = response.output.Remark;
                    }
                    console.log(Data)
                    this.service.create(Data).then(result => {
                        alert("Data berhasil dibuat");
                        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                    });
                }
            });
    }
}
