import { inject, bindable } from 'aurelia-framework';
import { Service,PurchasingDispositionService } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-all-loader');

var moment = require('moment');

@inject(Service,PurchasingDispositionService)
export class PurchasingDispositionItem {
    @bindable selectedEPO;

    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["PRNo", "Unit", "Kategori", "Barang", "Jumlah Dipesan", "Satuan", "Jumlah Dibayar", "Harga Satuan", "Harga Total", "Harga Dibayar"],
        onRemove: function () {
            this.bind();
        }
    };
    
    constructor(service,purchasingDispositionService) {
        this.service = service;
        this.purchasingDispositionService=purchasingDispositionService;
    }

    async activate(context) {
        this.context=context;
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        if(this.data.EPONo){
            this.selectedEPO=this.data;

            var EPOPrice= await this.service.searchPaymentDispo(this.data.EPOId);
            
            this.TotalPaidPrice=0;
            for(var a of EPOPrice){
                this.TotalPaidPrice+=a.payToSupplier;
            }
            
            this.VerifiedPaidPrice=0;

            var arg = {
                epoId: this.data.EPOId,
                filter: JSON.stringify({ "Position >= 4 && Position!=6" : true })
            }
            var verifiedEPO= await this.purchasingDispositionService.searchByEPO(arg);
            
            if(verifiedEPO){
                if(verifiedEPO.data.length>0){
                    for(var verifiedEPOData of verifiedEPO.data){
                        for(var verifiedEPOItem of verifiedEPOData.Items){
                            for(var verifiedEPODetail of verifiedEPOItem.Details ){
                                this.VerifiedPaidPrice+=verifiedEPODetail.PaidPrice;
                            }
                        }
                    }
                }
            }
            
        }

        if(this.data.Details){
            this.isShowing=true;
        }
        if(this.data.UseVat){
            this.vatValue=0;
            for(var detail of this.data.Details){
                // this.vatValue+=detail.PaidPrice*10/100;                
                this.vatValue+=detail.PaidPrice*parseFloat(this.data.vatTax.rate)/100; 
            }
        }
        if(this.data.UseIncomeTax){
            this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
            this.incomeTaxValue=0;
            for(var detail of this.data.Details){
                this.incomeTaxValue+=detail.PaidPrice*parseFloat(this.data.IncomeTax.rate)/100;
            }
        }
        
    }
    // @computedFrom("data.EPONo")
    // get incomeTax() {
    //     if(this.data.UseIncomeTax){
    //         return `${this.data.IncomeTax.name}-${this.data.IncomeTax.rate}`;
    //     }
    //     else{
    //         return "-";
    //     }
    // }
    
    

    // @computedFrom("selectedEPO._id")
    // get incomeTax() {
    //     return `${this.data.IncomeTax.Name} - ${this.data.IncomeTax.Rate}`;
    // }
    toggle() {
        this.isShowing = !this.isShowing;
    }

    get epoLoader() {
        return EPOLoader;
    }

    epoView = (epo) => {
        var no= epo.no || this.data.EPONo;
        return `${no}`;
    }
}