import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PurchasingDispositionService } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

var moment = require("moment");

@inject(Router, Service, PurchasingDispositionService, Dialog)
export class View {

    constructor(router, service, purchasingDispositionService, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.purchasingDispositionService = purchasingDispositionService;
    }
    totalPaid=0;
    canEdit=true;
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
        'Amount',
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
    
    //context = ["Rincian Purchase Request"];
    async activate(params) {
        var id = params.id;
        this.dataExpedition = await this.service.getById(id);
        let info = {
            page: 1,
            size: 255,
            filter: JSON.stringify({DispositionNo : this.dataExpedition.dispositionNo}),
        };

        var expeditions= await this.service.search(info);
        
        var lastExpedition=null;
        for(var a of expeditions.data){
            if(lastExpedition==null){
                lastExpedition=a;
            }
            else{
                if(lastExpedition.LastModifiedUtc<a.LastModifiedUtc){
                    lastExpedition=a;
                }
            }
            
        }
        
        if(this.dataExpedition.Id!=lastExpedition.Id){
                this.canEdit=false;
        }
        if(this.dataExpedition.isPaid){
                this.canEdit=false;
        }
        var arg = {
            filter: JSON.stringify({ DispositionNo : this.dataExpedition.dispositionNo })
        }
        var PurchasingDisposition = await this.purchasingDispositionService.search(arg);
        
        this.data = PurchasingDisposition.data[0];
        this.data.VerifyDate = this.dataExpedition.verifyDate;
        this.data.PayToSupplier=this.dataExpedition.payToSupplier;

        this.DispositionNo = this.data;
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
                window.open(`${window.location.origin}/#/verification/unit-payment-order-verification/monitoring-purchase/${encodeURIComponent(data.purchaseRequestNo)}`);
                break;
        }
    }

}