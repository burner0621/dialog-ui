import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    // console.log(params);
    // this.data = await this.service.getById(id);
    this.data = {

    }
    //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
    this.canEdit = true;

  }

  list() {
    this.router.navigateToRoute('list');
  }

  edit(data) {
    this.router.navigateToRoute('edit', { id: this.data.id });
  }

  delete() {
    this.service.delete(this.data)
      .then(result => {
        this.list();
      });
  }
}
