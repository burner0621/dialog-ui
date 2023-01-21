import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-disposition-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;
    @bindable vatValue;
    @bindable incomeTaxValue;

    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["PRNo", "Unit", "Barang", "Jumlah Dipesan", "Satuan","Harga Total", "Jumlah Dibayar", "Harga Satuan",  "Harga Dibayar"],
        onRemove: function () {
            this.bind();
        }
    };
    
    constructor(service) {
        this.service = service;
    }

    

    async activate(context) {
        this.context=context;
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.filter = this.options.supplierId && this.options.currencyId && this.options.categoryId && this.options.divisionId ? 
                      { "supplierId": this.options.supplierId, 
                        "currencyId":this.options.currencyId, 
                        "divisionId": this.options.divisionId, 
                        "categoryId": this.options.categoryId,
                        "incomeTaxBy" : this.options.incomeTaxBy !=null ? this.options.incomeTaxBy : ""} : {};
        
        if(this.data.Id!=0 && this.data.Id!=null){
            this.isEdit=true;
        }
        if(this.data.EPONo){
            this.selectedEPO=this.data;
            console.log(this.data)
        }

        if(this.data.Details){
            this.isShowing=true;
        }
        if(this.data.UseIncomeTax){
            this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
        }
        
        this.GetDisposition();

        this.GetTax();

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
    
    async GetDisposition(){
        this.paidDisposition=0;
        this.createdDisposition=0;
        if(this.data.EPOId){
            var paid= await this.service.searchPaymentDispo(this.data.EPOId);
            if(paid){
                for(var pay of paid){
                    //this.paidDisposition+=pay.payToSupplier;
                    this.paidDisposition+=pay.SupplierPayment;
                }
                //this.paidDisposition=this.paidDisposition>0?this.paidDisposition+this.vatValue-this.incomeTaxValue:this.paidDisposition;
            }

            var filterDispo= {
                epoId:this.data.EPOId
            };
            

        return this.service.getDispositions(filterDispo)
            .then(result => {
                if(result.data){
                    for(var data of result.data){
                        if(data.Items){
                            for(var item of data.Items){
                                for(var detail of item.Details){
                                    this.createdDisposition+=detail.PaidPrice;
                                }
                            }
                        }
                    }
                }
            });

        }
    }

    async selectedEPOChanged(newValue) {
        if (newValue) {
            this.selectedEPO=newValue;
            if(newValue._id || newValue.EPOId){
                this.data.EPOId=newValue._id || this.data.EPOId;
                this.data.EPONo= newValue._id ? newValue.no : this.data.EPONo;
                this.data.UseVat= newValue._id ?newValue.useVat : this.data.UseVat;
                this.data.UseIncomeTax=newValue._id ? newValue.useIncomeTax : this.data.UseIncomeTax;
                if(this.data.UseIncomeTax){
                    this.data.IncomeTax=newValue.useIncomeTax ? newValue.incomeTax : this.data.IncomeTax;
                    this.data.IncomeTax.Name=newValue.incomeTax.name;
                    this.data.IncomeTax.Id=newValue.incomeTax._id;
                    this.data.IncomeTax.Rate=newValue.incomeTax.rate;
                    this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
                    
                }
                else{
                    this.data.IncomeTax={};
                    this.data.IncomeTax.name="";
                    this.data.IncomeTax._id="";
                    this.data.IncomeTax.rate=0;
                    this.incomeTax="-";
                }
                
                if(this.data.UseVat){
                    this.data.vatTax = newValue.vatTax;
                    // this.data.vatRate = newValue.vatTax.rate;
                }   
                // console.log(newValue.vatTax._id);
                console.log( this.data.vatTax);
                // console.log(newValue.vatTax.rate);
                var arg = {
                    epoId:this.data.EPOId
                }
                //var dataDisposition=await this.service.getDispositions(arg);
                var details=[];
                for(var item of newValue.items){
                    for(var detail of item.details){
                        var qty=detail.dealQuantity-detail.dispositionQuantity;

                        //===========MONGO==============
                        // if(dataDisposition.info.count>0){
                        //     for(var DispoData of dataDisposition.data){
                        //         for(var dispoItem of DispoData.Items){
                        //             for(var dispoDetail of dispoItem.Details){
                        //                 if(dispoDetail.PRId==item.purchaseRequest._id && dispoDetail.Product._id==detail.product._id){
                        //                     qty-=dispoDetail.PaidQuantity;
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }

                        //============================================================
                        //var qty=detail.dealQuantity-detail.dispositionQuantity;
                        // this.data.Unit=newValue.unit;
                        // this.data.Unit.Id=newValue.unit._id;
                        // this.data.Unit.Name=newValue.unit.name;
                        // this.data.Unit.Division=newValue.unit.division;
                        // this.data.Unit.Division.Name=newValue.unit.division.name;


                        details.push({
                            EPODetailId:detail._id,
                            PRNo: item.prNo,
                            UnitId:newValue.unit._id,
                            Unit:newValue.unit,
                            PRId: item.prId,
                            Product:detail.product,
                            DealQuantity:detail.dealQuantity,
                            DealUom:detail.dealUom,
                            Category: item.category,
                            CategoryId:item.categoryId,
                            PricePerDealUnit: detail.pricePerDealUnit,
                            PaidQuantity: qty,
                            PaidPrice: detail.pricePerDealUnit*qty
                        })
                        var ppn=0;
                        var pph=0;
                        if(this.data.UseIncomeTax){
                            pph= detail.pricePerDealUnit*qty*(this.data.IncomeTax.rate/100);
                        }
                        if(this.data.UseVat){
                            ppn= detail.pricePerDealUnit*qty*(this.data.vatTax.rate / 100);
                        }
                        this.incomeTaxValue+=pph;
                        this.vatValue+=ppn;
                    }
                    // if(this.data.UseIncomeTax){
                    //     this.incomeTaxValue+=
                    // }
                    
                }
                this.data.Details=details;
                
                this.GetDisposition();
            }
            this.isShowing =true;
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
        return EPOLoader;
    }

    epoView = (epo) => {
        var no= epo.no || this.data.EPONo;
        return `${no}`;
    }

    GetTax(){
        this.incomeTaxValue=0;
        this.vatValue=0;
        if(this.data.Details){
            for(var detail of this.data.Details){
                var ppn=0;
                var pph=0;
                if(this.data.UseIncomeTax){
                    pph=parseFloat(detail.PaidPrice) *(parseFloat(this.data.IncomeTax.rate)/100);
                }
                if(this.data.UseVat){
                    ppn= parseFloat(detail.PaidPrice)*(this.data.vatTax.rate / 100);
                }
                this.incomeTaxValue+=pph;
                this.vatValue+=ppn;
            }

        }
    }

    detailChanged(e){
        this.GetTax();
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            var details=[];
            for(var a of this.data.Details){
                details.push(a);
            }
            this.data.Details=details;
            this.GetTax();
            //this.detailChanged(event);
        }
    }
}