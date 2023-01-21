import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service.getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.UnitDepartementId);
      })
      .then(unit => {
        
        if(unit) {
          dataResult.WeavingUnit = unit ;
        }
        
        return this.service.getUserById(dataResult.UserMaintenanceId);
      })
      .then(userMaintenance => {
        
        if(userMaintenance) {
          dataResult.UserMaintenance = userMaintenance ;
        }
        
        return this.service.getUserById(dataResult.UserOperatorId);
      })
      .then(userOperator => {
        
        if(userOperator) {
          dataResult.UserOperator = userOperator ;
        }
        
        return dataResult;
      });
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", { Id: this.data.Id });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
