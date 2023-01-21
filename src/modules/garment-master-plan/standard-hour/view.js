import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  // hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      var id = params.id;
      this.data = await this.service.getById(id);
      
      this.selectedComodity = { Code:this.data.ComodityCode, Name:this.data.ComodityName,};
      this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  
}