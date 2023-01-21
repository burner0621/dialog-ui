import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
  readOnlyViewEdit = true;
  createOnly = false;
  // error = {};
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
    const unit = await this.service.getUnitById(this.data.Unit);
    this.data.Unit = unit.Name;

    this.data.Operator = {
      Username : this.data.Operator
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    this.error = {};
    var updateData = {}

    if (this.data.Id) {
      updateData.Id = this.data.Id;
    }

    if (this.data.MachineNumber) {
      updateData.MachineNumber = this.data.MachineNumber.Id;
    }

    if (this.data.Process) {
      updateData.Process = this.data.Process;
    }

    if (this.data.Trouble) {
      updateData.Trouble = this.data.Trouble;
    }

    if (this.data.Description) {
      updateData.Description = this.data.Description;
    }

    if (this.data.StopDate) {
      updateData.StopDate = this.data.StopDate;
    }

    if (this.data.ContinueDate) {
      updateData.ContinueDate = this.data.ContinueDate;
    }
    
    if (this.data.Operator) {
      updateData.OperatorDocument = this.data.Operator.Id;
    }

    if (this.data.OrderNumber) {
      updateData.OrderDocument = this.data.OrderNumber.Id;
    }

    this.service
      .update(updateData)
      .then(result => {
        this.router.navigateToRoute("view", { Id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
