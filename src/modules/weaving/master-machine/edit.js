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
export class Edit {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
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

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {
    this.error = {};
    var updateData = {};
    
    if (this.data.Id) {
      updateData.Id = this.data.Id;
    }

    if (this.data.MachineNumberOne) {
      updateData.MachineNumber = this.data.MachineNumberOne;
    }

    if (this.data.MachineNumberOne && this.data.MachineNumberTwo) {
      updateData.MachineNumber = this.data.MachineNumberOne + "/" + this.data.MachineNumberTwo;
    }

    if (this.data.Location) {
      updateData.Location = this.data.Location;
    }

    if (this.data.WeavingUnit) {
      updateData.WeavingUnitId = this.data.WeavingUnit.Id;
    }

    if (this.data.MachineType) {
      updateData.MachineTypeId = this.data.MachineType.Id;
      if (this.data.MachineType.TypeName === "Sucker Muller" || this.data.MachineType.TypeName === "Kawa Moto") {
        if (this.data.Cutmark) {
          updateData.Cutmark = this.data.Cutmark;
        } else{
          this.error.Cutmark = "Jenis Mesin " + this.data.MachineType + ", Cutmark Harus Diisi";
        }

        if (this.data.CutmarkUom) {
          updateData.CutmarkUom = this.data.CutmarkUom;
        }else{
          this.error.CutmarkUom = "Jenis Mesin " + this.data.MachineType + ", Satuan Cutmark Harus Diisi";
        }
      }
    }

    if(this.data.Speed){
      updateData.Speed = this.data.Speed;
    }

    if(this.data.MachineUnit){
      updateData.MachineUnit = this.data.MachineUnit;
    }

    if (this.data.Process) {
      updateData.Process = this.data.Process;
    }

    if (this.data.Area) {
      updateData.Area = this.data.Area;
    }

    if (this.data.Block) {
      updateData.Block = parseInt(this.data.Block);
    }
    
    this.service
      .update(updateData)
      .then(result => {
        this.router.navigateToRoute("view", {
          Id: this.data.Id
        });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
