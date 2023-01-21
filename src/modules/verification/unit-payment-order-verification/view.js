import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, MongoService } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

var moment = require("moment");

@inject(Router, Service, MongoService, Dialog)
export class View {

    constructor(router, service, mongoService, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.mongoService = mongoService;
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
        this.data.VerifyDate = this.dataExpedition.VerifyDate;
        this.data.Vat = this.dataExpedition.IncomeTax;
        this.data.IncomeTax = this.dataExpedition.Vat;
        this.data.TotalPaid = (this.dataExpedition.TotalPaid + this.dataExpedition.Vat);
        console.log(this);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.dataExpedition.Id });
    }

    async contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;

        switch (arg.name) {
            case "Rincian Purchase Request":
                // window.open(`${window.location.origin}/#/verification/unit-payment-order-verification/monitoring-purchase/${encodeURIComponent(data.purchaseRequestNo)}`);
                window.open(`${window.location.origin}/#/verification/unit-payment-order-verification/monitoring-purchase/${data.purchaseRequestId}`);
                break;
        }
    }

}