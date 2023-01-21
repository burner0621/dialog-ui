import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;

    this.isShowed = false;
  }
  canEdit = true;
  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
    // for(var item of this.data.warehousesProductionOrders){
    //   item.productionOrderItems = item.productionOrderItems.filter(s => s.hasOutputDocument === false);
    // }
    this.canEdit = this.data.warehousesProductionOrders.flatMap(s => s.productionOrderItems).some(s => s.hasOutputDocument === false);

  }

  list() {
    this.router.navigateToRoute("list");
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
