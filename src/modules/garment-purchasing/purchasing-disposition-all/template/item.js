import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/garment-purchase-order-external-simply-str-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;
    @bindable vatValue;
    @bindable vatValueView;
    @bindable incomeTaxValue;
    @bindable incomeTaxValueView;
    @bindable dppValue;
    @bindable isOver;
    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["No Ro", "PO Internal", "Barang", "Unit", "QTY Dipesan", "Satuan", "QTY Sisa", "Harga Satuan", "Harga Total", "QTY Dibayar", "Harga Dibayar", "% Over QTY"],
        onRemove: function () {
            this.bind();
        }
    };

    constructor(service) {
        this.service = service;
    }



    async activate(context) {
        this.context = context;
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.filter = this.options.supplierId && this.options.currencyId && this.options.categoryId && this.options.divisionId ?
            {
                "supplierId": this.options.supplierId,
                "currencyId": this.options.currencyId,
                "divisionId": this.options.divisionId,
                "categoryId": this.options.categoryId,
                "currencyCode": this.options.currencyCode,
                "incomeTaxBy": this.options.incomeTaxBy != null ? this.options.incomeTaxBy : ""
            } : {};
        if (this.data.Id == 0) {
            this.isOver = false
        } else {
            this.isOver = true;
        }

        if (this.data.Id != 0 && this.data.Id != null) {
            this.isEdit = true;
        }
        if (this.data.EPONo) {
            this.selectedEPO = this.data;
        }

        if (this.data.Details) {
            this.isShowing = true;
        }
        if (this.data.IsUseIncomeTax) {
            this.incomeTax = `${this.data.IncomeTax.Name} - ${this.data.IncomeTax.Rate}`;
        }
        // this.data.IsUseIncomeTax = false;
        // this.data.IsUseVat = false;

        this.vatValue = this.data.VatValue;
        this.vatValueView = this.data.VatValueView;
        this.incomeTaxValue = this.data.IncomeTaxValue;
        this.incomeTaxValueView = this.data.IncomeTaxValueView;
        this.dppValue = this.data.DPPValue ? this.data.DPPValue : 0;
        // console.log("epono not null")
        // console.log("items",this);
        // this.GetDisposition();

        // this.GetTax();
        // console.log(this);
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

    // async GetDisposition(){
    //     console.log(this.data);
    //     this.paidDisposition=0;
    //     this.createdDisposition=0;
    //     if(this.data.EPOId){
    //         var paid= await this.service.searchPaymentDispo(this.data.EPOId);
    //         if(paid){
    //             for(var pay of paid){
    //                 this.paidDisposition+=pay.payToSupplier;
    //             }
    //             //this.paidDisposition=this.paidDisposition>0?this.paidDisposition+this.vatValue-this.incomeTaxValue:this.paidDisposition;
    //         }

    //         var filterDispo= {
    //             epoId:this.data.EPOId
    //         };


    //     return this.service.getDispositions(filterDispo)
    //         .then(result => {
    //             if(result.data){
    //                 for(var data of result.data){
    //                     if(data.Items){
    //                         for(var item of data.Items){
    //                             // for(var detail of item.Details){
    //                                 this.createdDisposition+=item.PaidPrice;
    //                             // }
    //                         }
    //                     }
    //                 }
    //             }
    //         });

    //     }
    // }

    async selectedEPOChanged(newValue, oldValue) {
        if (newValue) {
            // console.log("newvalue",newValue);
            // console.log("oldValue",oldValue);
            // console.log(this);
            if (newValue.Id != (oldValue ? oldValue.Id : 0) || oldValue == null) {
                var param = {
                    Id: newValue.Id,
                    supplierId: this.data.SupplierId,
                    currencyCode: this.data.CurrencyCode
                }
                this.selectedEPO = await this.service.getEPOById(param);
                console.log(this.selectedEPO);

            }

            if (this.selectedEPO.Id) {
                this.incomeTaxValue = 0;
                this.incomeTaxValueView = 0;
                this.vatValue = 0;
                this.vatValueView = 0;
                this.dppValue = 0;
                this.data.EPOId = this.selectedEPO.Id || this.data.EPOId;
                this.data.EPONo = this.selectedEPO.Id ? this.selectedEPO.EPONo : this.data.EPONo;
                this.data.IsUseVat = this.selectedEPO.Id ? this.selectedEPO.IsUseVat : this.data.IsUseVat;
                this.data.IsPayVAT = this.selectedEPO.Id ? this.selectedEPO.IsPayVAT : this.data.IsPayVAT;
                this.data.IsIncomeTax = this.selectedEPO.Id ? this.selectedEPO.IsIncomeTax : this.data.IsIncomeTax;
                this.data.IsPayIncomeTax = this.selectedEPO.Id ? this.selectedEPO.IsPayIncomeTax : this.data.IsPayIncomeTax;
                this.data.IsUseIncomeTax = this.selectedEPO.Id ? this.selectedEPO.IsIncomeTax : this.data.IsIncomeTax;
                this.data.DispositionAmountCreated = this.selectedEPO.Id ? this.selectedEPO.DispositionAmountCreated : this.data.DispositionAmountCreated;
                this.data.DispositionPaidCreated = this.selectedEPO.Id ? this.selectedEPO.DispositionAmountPaid : this.data.DispositionAmountPaid;
                // this.data.CurrencyId =  this.selectedEPO.Id? this.selectedEPO.Currency.Id: this.data.CurrencyId;
                // this.data.CurrencyCode =  this.selectedEPO.Id? this.selectedEPO.Currency.Code: this.data.CurrencyCode;
                this.data.CurrencyRate = this.selectedEPO.Id ? this.selectedEPO.Currency.Rate : this.data.CurrencyRate;
                this.data.Vat = this.selectedEPO.Id ? this.selectedEPO.Vat : this.data.Vat;
                if (this.selectedEPO.IsIncomeTax) {
                    this.data.IncomeTax = this.selectedEPO.IsIncomeTax ? this.selectedEPO.IncomeTax : this.data.IncomeTax;
                    this.data.IncomeTaxName = this.selectedEPO.IncomeTax.Name;
                    this.data.IncomeTaxId = this.selectedEPO.IncomeTax.Id;
                    this.data.IncomeTaxRate = this.selectedEPO.IncomeTax.Rate;
                    this.incomeTax = `${this.data.IncomeTax.Name} - ${this.data.IncomeTax.Rate}`;

                }
                else {
                    this.data.IncomeTax = {};
                    this.data.IncomeTaxName = "";
                    this.data.IncomeTaxId = 0;
                    this.data.IncomeTaxRate = 0;
                    this.incomeTax = "-";
                }

                if(this.selectedEPO.IsUseVat){
                    this.data.VatId = this.selectedEPO.Vat.Id;
                    this.data.VatRate = this.selectedEPO.Vat.Rate;
                }

                var arg = {
                    epoId: this.data.EPOId
                }

                var details = [];
                for (var item of this.selectedEPO.Items) {
                    var qtyRemains = item.DealQuantity - item.DispositionQuantityCreated;
                    var OverQty = 0;
                    if (qtyRemains < 0) {
                        OverQty = (qtyRemains / item.DealQuantity) * 100;
                    } else {
                        OverQty = 0;
                    }


                    details.push({
                        ROId: 0,
                        RONo: item.RONo,
                        IPONo: item.PO_SerialNumber,
                        IPOId: item.POId,
                        ProductId: item.Product.Id,
                        ProductName: item.Product ? item.Product.Name : "",
                        UnitId: item.Unit ? item.UnitId : 0,
                        UnitName: item.Unit ? item.UnitName : "",
                        QTYOrder: item.DealQuantity,
                        QTYUnit: item.DealUom.Unit,
                        QTYRemains: qtyRemains - qtyRemains,
                        PricePerQTY: item.PricePerDealUnit,
                        PriceTotal: parseFloat(item.PricePerDealUnit * qtyRemains).toFixed(3),
                        QTYPaid: qtyRemains,
                        PaidPrice: parseFloat(item.PricePerDealUnit * qtyRemains).toFixed(3),
                        PercentageOverQTY: OverQty < 0 ? 0 : OverQty,
                        UnitId: item.UnitId,
                        UnitCode: item.UnitCode,
                        UnitName: item.UnitName,
                        EPO_POId: item._id,
                        DispositionAmountCreated: item.DispositionAmountCreated,
                        DispositionAmountPaid: item.DispositionAmountPaid,
                        DispositionQuantityCreated: item.DispositionQuantityCreated,
                        DispositionQuantityPaid: item.DispositionQuantityPaid
                    })
                    var ppn = 0;
                    var pphView = 0;
                    var pph = 0;
                    var ppnView = 0;
                    if (this.data.IsIncomeTax) {
                        pphView = item.PricePerDealUnit * qtyRemains * (this.data.IncomeTax.Rate / 100);
                    }
                    if (this.data.IsPayIncomeTax) {
                        pph = item.PricePerDealUnit * qtyRemains * (this.data.IncomeTax.Rate / 100);
                    }
                    if (this.data.IsPayVAT) {  
                        ppn = item.PricePerDealUnit * qtyRemains *( this.selectedEPO.Vat.Rate / 100);                      
                    }
                    if (this.data.IsUseVat) {  
                        ppnView = item.PricePerDealUnit * qtyRemains * (this.selectedEPO.Vat.Rate / 100);
                    }
                    this.incomeTaxValue += pph;
                    this.incomeTaxValueView += pphView;
                    this.vatValue += ppn;
                    this.vatValueView += ppnView;
                    this.dppValue += (item.PricePerDealUnit * qtyRemains);
                    // console.log("ppn",ppn);
                    // this.data.DPP+=item.PricePerDealUnit * qtyRemains;
                }
                this.data.Details = details;
                this.data.IncomeTaxValue = this.incomeTaxValue;
                this.data.IncomeTaxValueView = this.incomeTaxValueView;
                this.data.VatValue = this.vatValue;
                this.data.DPPValue = this.dppValue;
                this.data.VatValueView = this.vatValueView;
            }
            this.isShowing = true;
        }
    }

    // @computedFrom("selectedEPO._id")
    // get incomeTax() {
    //     return `${this.data.IncomeTax.Name} - ${this.data.IncomeTax.Rate}`;
    // }
    toggle() {
        this.isShowing = !this.isShowing;
    }

    get epoLoader() {
        // console.log("loader",EPOLoader);
        this.filter = this.data.SupplierId && this.data.CurrencyId && this.data.Category && this.data.PaymentType ?
            {
                "supplierId": this.data.SupplierId,
                "currencyCode": this.data.CurrencyCode,
                "category": this.data.Category,
                "paymentType": this.data.PaymentType
            } : {};
        // console.log("filter",this.filter);
        // console.log("filterData",this.data);
        var loader = EPOLoader;
        // console.log(loader);
        return loader;
    }

    epoView = (epo) => {
        var no = epo.EPONo || this.data.EPONo;
        return `${no}`;
    }

    GetTax() {
        console.log("getax");
        this.incomeTaxValue = 0;
        this.incomeTaxValueView = 0;
        this.vatValue = 0;
        this.vatValueView = 0;

        
        this.dppValue = 0;
        console.log("before gettax", this.data);
        if (this.data.Details) {
            for (var detail of this.data.Details) {
                var ppn = 0;
                var pph = 0;
                var pphView =0;
                var ppnView = 0;
                if (this.data.IsIncomeTax) {
                    pphView = parseFloat(detail.PaidPrice) * (parseFloat(this.data.IncomeTax.Rate) / 100);
                }
                if (this.data.IsPayIncomeTax) {
                    pph = parseFloat(detail.PaidPrice) * (parseFloat(this.data.IncomeTax.Rate) / 100);
                }
                if (this.data.IsPayVAT) {
                    ppn = parseFloat(detail.PaidPrice) * (this.data.Vat.Rate / 100);
                }
                if (this.data.IsUseVat) {
                    console.log(this.selectedEPO);
                    ppnView = parseFloat(detail.PaidPrice) * (this.data.Vat.Rate / 100);
                }
                this.incomeTaxValue += pph;
                this.incomeTaxValueView += pphView;
                this.vatValue += ppn;
                this.vatValueView += ppnView;
                this.dppValue += parseFloat(detail.PaidPrice);
 
            }
            this.data.IncomeTaxValue = this.incomeTaxValue;
            this.data.IncomeTaxValueView = this.incomeTaxValueView;
            this.data.VatValue = this.vatValue;
            this.data.VatValueView = this.vatValueView;
            this.data.DPPValue = this.dppValue;
        }
        console.log("after gettax", this.data);
    }

    detailChanged(e) {
        console.log("detttailchanged");
        this.GetTax();
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            var details = [];
            for (var a of this.data.Details) {
                details.push(a);
            }
            this.data.Details = details;
            this.GetTax();
            //this.detailChanged(event);
        }
    }
}
