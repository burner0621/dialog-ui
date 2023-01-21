import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.longMachineNumber = true;
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.error = {};
    var postData = {}

    if (this.data.MachineNumberOne) {
      postData.MachineNumber = this.data.MachineNumberOne;
    }

    if (this.data.MachineNumberOne && this.data.MachineNumberTwo) {
      postData.MachineNumber = this.data.MachineNumberOne + "/" + this.data.MachineNumberTwo;
    }

    if (this.data.Location) {
      postData.Location = this.data.Location;
    }

    if (this.data.WeavingUnit) {
      postData.WeavingUnitId = this.data.WeavingUnit.Id;
    }

    if (this.data.MachineType) {
      postData.MachineTypeId = this.data.MachineType.Id;
      if (this.data.MachineType.TypeName === "Sucker Muller" || this.data.MachineType.TypeName === "Kawa Moto") {
        if (this.data.Cutmark) {
          postData.Cutmark = this.data.Cutmark;
        } else {
          this.error.Cutmark = "Jenis Mesin " + this.data.MachineType + ", Cutmark Harus Diisi";
        }

        if (this.data.CutmarkUom) {
          postData.CutmarkUom = this.data.CutmarkUom;
        } else {
          this.error.CutmarkUom = "Jenis Mesin " + this.data.MachineType + ", Satuan Cutmark Harus Diisi";
        }
      }
    }

    if (this.data.Speed) {
      postData.Speed = this.data.Speed;
    }

    if (this.data.MachineUnit) {
      postData.MachineUnit = this.data.MachineUnit;
    }

    if (this.data.Process) {
      postData.Process = this.data.Process;
    }

    if (this.data.Area) {
      postData.Area = this.data.Area;
    // }else{
    //   this.error.Area = "Area Harus Diisi";
    }

    if (this.data.Block) {
      postData.Block = parseInt(this.data.Block);
    }

    this.service
      .create(postData)
      .then(result => {

        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
