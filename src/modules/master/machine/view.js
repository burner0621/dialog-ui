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
    this.data.Unit.toString = function () {
      return [this.Division.Name, this.Name]
          .filter((item, index) => {
              return item && item.toString().trim().length > 0;
          }).join(" - ");
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
  editCallback(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }    
  deleteCallback(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancelCallback(event);
        });
  }  
}
