import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.isView=false;
  }

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    if(this.data.Currency){
        this.selectedCurrency=this.data.Currency;
    }

    if(this.data.Supplier){
        this.selectedSupplier=this.data.Supplier;
    }

    if(this.data.Division){
        this.selectedDivision=this.data.Division;
    }

    if(this.data.Category){
        this.selectedCategory=this.data.Category;
    }
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  save(event) {
    if(this.data.Items){
        this.data.Amount=0;
        this.data.IncomeTaxValue=0;
        this.data.DPP=0;
        this.data.VatValue=0;
        for(var item of this.data.Items){
            if(item.Details){
                for(var detail of item.Details){
                    var pph=0;
                    var ppn=0;
                    if(item.UseIncomeTax){
                        var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
                        pph=detail.PaidPrice*(parseFloat(rate)/100);
                    }
                    if(item.UseVat){
                        var rate= item.vatTax.rate ? item.vatTax.rate : item.vatTax.rate;
                        ppn=detail.PaidPrice*(parseFloat(rate)/100);
                    }
                    this.data.IncomeTaxValue+=pph;
                    this.data.VatValue+=ppn;
                    this.data.DPP+=detail.PaidPrice;
                    if(this.data.IncomeTaxBy=="Supplier"){
                      this.data.Amount=(detail.PaidPrice+ppn+this.data.PaymentCorrection)-pph;
                    }
                    else{
                       this.data.Amount=detail.PaidPrice+ppn+this.data.PaymentCorrection;
                    }
                }
            }
        }
    }
    this.service.update(this.data)
      .then(result => {
        this.cancel();
      })
      .catch(e => {
        this.error = e;
      })
  }
}

