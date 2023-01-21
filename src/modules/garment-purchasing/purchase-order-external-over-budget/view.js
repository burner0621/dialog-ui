import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceFinance } from './service';

@inject(Router, Service, ServiceFinance)
export class View {
    hasCancel = true;
    hasUnpost = false;

    constructor(router, service, serviceFinance) {
        this.router = router;
        this.service = service;
        this.serviceFinance = serviceFinance;
    }
    
    async activate(params) {

      var id = params.id;
      this.poExId = id;
      this.data = await this.service.getById(id);
      this.IsVBWithPO = await this.serviceFinance.getVbWithPO(id);
      if(this.data.Currency){
         this.selectedCurrency=this.data.Currency;
      }

      if(this.data.Supplier){
         this.selectedSupplier=this.data.Supplier;
      }

      if(this.data.IncomeTax){
         this.selectedIncomeTax=this.data.IncomeTax.Name+" - "+this.data.IncomeTax.Rate;
      }
      if(this.data.IsApproved && !this.data.IsUnpost && !this.IsVBWithPO){
         this.hasUnpost = true;
      }  
    }
    
    cancel(event) {
        this.router.navigateToRoute('list');
    }

    unpostPO(event) {
      this.service.unpost(this.poExId).then(result => {
          this.cancel();
      }).catch(e => {
          this.error = e;
      })
    }

}
