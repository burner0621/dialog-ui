import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.error = {};

    if (!this.data.Area) {
      
      this.data.Area = "";
    }

    if (!this.data.Blok) {

      this.data.Blok = "";
    }

    if (!this.data.BlokKaizen) {

      this.data.BlokKaizen = "";
    }

    if (!this.data.MachineId) {
      this.data.MachineId = "00000000-0000-0000-0000-000000000000";
    }

    if (!this.data.UnitDepartementId) {
      this.data.UnitDepartementId = 0;
    }

    if (!this.data.UserMaintenanceId) {
      this.data.UserMaintenanceId = "";
    }

    if (!this.data.UserOperatorId) {
      this.data.UserOperatorId = "";
    }
    
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
        this.error.WeavingUnit = e['UnitDepartementId'] ? 'Unit must not be empty' : '';
        this.error.Machine = e['MachineId'] ? 'Machine must not be empty' : '';

        if (this.error.Machine != '')  {
          this.error.Location = 'Machine must not be empty';
        }

        this.error.UserMaintenance = e['UserMaintenanceId'] ? 'User must not be empty' : '';
        this.error.UserOperator = e['UserOperatorId'] ? 'User must not be empty' : '';
      });
  }
}
