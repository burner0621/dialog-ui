import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
    if (this.data.AccountingUnitId !== 0) {
      this.accountingUnit = await this.service.getAccountingUnit(
        this.data.AccountingUnitId
      );
    }
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }
}
