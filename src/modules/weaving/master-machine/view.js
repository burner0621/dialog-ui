import {
  inject
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {

    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(dataResult.UnitId);
      })
      .then(unit => {
        dataResult.WeavingUnit = unit;
        return this.service.getMachineTypeById(dataResult.MachineTypeId);
      }).then(machineType => {
        dataResult.MachineType = machineType;
        dataResult.Speed = machineType.Speed;
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
    this.router.navigateToRoute("edit", {
      Id: this.data.Id
    });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
