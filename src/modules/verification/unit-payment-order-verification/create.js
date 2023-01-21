import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class Create {

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.data.VerifyDate = new Date();
        this.submitContext = {
            verifiedAlert: false,
            position: 0,
        };
    }

    context = ["Rincian Purchase Request"];

    list() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    Submit(context) {

        var Data = this.data;
        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.dialog.show(AlertView, this.submitContext)
            .then(response => {

                if (!response.wasCancelled) {
                    if (response.output.context == "Finance") {
                        Data.SubmitPosition = 5;
                    } else if (response.output.context == "Cashier") {
                        Data.SubmitPosition = 4;
                    } else {
                        Data.SubmitPosition = 6;
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

    async contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;

        switch (arg.name) {
            case "Rincian Purchase Request":
                window.open(`${window.location.origin}/#/verification/unit-payment-order-verification/monitoring-purchase/${encodeURIComponent(data.purchaseRequestNo)}`);
                break;
        }
    }
}
