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
    this.data = await this.service.getById(id);
    this.data.OldKanban = this.data.OldKanbanId ? await this.service.getOldById(this.data.OldKanbanId) : null;

    if (this.data.IsReprocess) {
      this.data.output = "Kanban Reproses";
    } else if (this.data.OldKanban && this.data.OldKanban.Id && !this.data.IsReprocess) {
      this.data.output = "Kanban Lanjut Proses";
    } else {
      this.data.output = "Kanban Baru";
    }

    // this.data.Cart.uom = this.data.cart.uom ? this.data.cart.uom.unit : 'MTR';
    this.productionOrder = this.data.ProductionOrder;
    this.instruction = this.data.Instruction;
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
        this.cancelCallback();
      });
  }

  get isView() {
    return true;
  }
}
