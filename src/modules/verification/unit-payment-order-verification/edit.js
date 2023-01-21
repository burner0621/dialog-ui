import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, MongoService } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, MongoService, Dialog)
export class Edit {

    constructor(router, service, mongoService, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.mongoService = mongoService;
        this.data = {};

        this.submitContext = {
            verifiedAlert: false,
            position: 0,
        };
    }

    context = ["Rincian Purchase Request"];

    selectSPB = [
        'division.name', 'division.code',
        'supplier.name', 'supplier.code',
        'currency.code',
        'category.code', 'category.name',
        'paymentMethod',
        'invoceNo',
        'invoceDate',
        'pibNo',
        'useVat', //pph
        'useIncomeTax', //ppn
        'no',
        'date',
        'remark',
        'items.unitReceiptNote.no',
        'items.unitReceiptNote.items.product.name',
        'items.unitReceiptNote.items.deliveredQuantity',
        'items.unitReceiptNote.items.deliveredUom.unit',
        'items.unitReceiptNote.items.pricePerDealUnit',
        'items.unitReceiptNote.items.correction.correctionNo',
        'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
        'items.unitReceiptNote.items.purchaseOrder.purchaseRequest.no',
        'items.unitReceiptNote.items.currency.code'
    ];

    async activate(params) {
        var id = params.id;
        this.dataExpedition = await this.service.getById(id);

        var arg = {
            filter: JSON.stringify({ UPONo: this.dataExpedition.UnitPaymentOrderNo })
        }

        var UnitPaymentOrder = await this.service.searchUPOByCode(arg);
        this.data = UnitPaymentOrder.data[0];
        this.data.VerifyDate = new Date();
        this.data.Id = id;
        this.data.Vat = this.dataExpedition.IncomeTax;
        this.data.IncomeTax = this.dataExpedition.Vat;
        this.data.TotalPaid = (this.dataExpedition.TotalPaid + this.dataExpedition.Vat);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.dataExpedition.Id });
    }

    Submit(context) {
        var Data = this.data;

        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.submitContext.position = this.dataExpedition.Position;

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
                        alert("Data berhasil diubah");
                        this.cancel();
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