import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      var id = params.id;
      this.data = await this.service.getById(id);
      var totalUsedEH = this.data.Items.reduce(
        (acc, cur) => acc + cur.UsedEH
        ,0
      );
      this.hasDelete = totalUsedEH == 0;
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }   
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  
}