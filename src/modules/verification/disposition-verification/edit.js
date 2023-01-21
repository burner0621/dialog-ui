import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PurchasingDispositionService } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
import moment from 'moment';
@inject(Router, Service, PurchasingDispositionService, Dialog)
export class Edit {

    constructor(router, service, purchasingDispositionService, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.purchasingDispositionService = purchasingDispositionService;
        this.data = {};

        this.submitContext = {
            verifiedAlert: false,
            position: 0,
        };
    }

    // context = ["Rincian Purchase Request"];

    selectDispositionNo = [
            'DispositionNo',
            'Supplier.name', 'Supplier.code',
            'Currency.code',
            'Bank',
            'ConfirmationOrderNo',
            'InvoiceNo',
            'PaymentMethod',
            'PaymentDueDate',
            'Calculation',
            'Remark',
            'ProformaNo',
            'Investation',
            'DPP',
            'VatValue',
            'IncomeTaxValue',
            'Amount',
            'IncomeTaxBy',
            'PaymentCorrection',
            'Items.EPOId',
            'Items.EPONo',
            'Items.UseVat',
            'Items.UseIncomeTax',
            'Items.IncomeTax.name',
            'Items.IncomeTax.rate',
            'Items.Details.PRNo',
            'Items.Details.Category.name',
            'Items.Details.Product.name', 'Items.Details.Product.code',
            'Items.Details.DealQuantity',
            'Items.Details.DealUom.unit',
            'Items.Details.PaidQuantity',
            'Items.Details.PricePerDealUnit',
            'Items.Details.PriceTotal',
            'Items.Details.PaidPrice',
            'Items.Details.Unit.name',
        ];

    async activate(params) {
        var id = params.id;
        this.dataExpedition = await this.service.getById(id);

        var arg = {
            filter: JSON.stringify({ DispositionNo: this.dataExpedition.dispositionNo })
        }
        var PurchasingDisposition = await this.purchasingDispositionService.search(arg);
        this.data = PurchasingDisposition.data[0];
        this.data.VerifyDate = moment(new Date()).format("DD-MMM-YYYY");
        this.data.PayToSupplier=this.dataExpedition.payToSupplier;
        this.data.Id = id;
        this.DispositionNo = this.data;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.dataExpedition.Id });
    }

    Submit(context) {
        var Data = this.data;
        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.submitContext.position = this.dataExpedition.position;
        if (this.submitContext.verifiedAlert == true) {
            Data.SubmitPosition = 4;
            this.service.create(Data).then(result => {
                alert("Data berhasil dibuat");
                this.cancel();
            });
        } else {
            this.dialog.show(AlertView, this.submitContext)
                .then(response => {

                    if (!response.wasCancelled) {
                        if (response.output.context == "Finance") {
                            Data.SubmitPosition = 5;
                        } else if (response.output.context == "Cashier") {
                            Data.SubmitPosition = 4;
                        } else {
                            Data.SubmitPosition = 6;
                            Data.Reason = response.output.Remark;
                        }
                        this.service.create(Data).then(result => {
                            alert("Data berhasil dibuat");
                            this.cancel();
                        });
                    }
                });
        }
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