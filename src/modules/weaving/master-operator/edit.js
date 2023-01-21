import {
  inject,
  bindable,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class Edit {
  @bindable CoreAccount;
  @bindable UnitId;
  @bindable Assignment;

  assignments = ["", "Preparation", "AJL"];

  types = [];

  preparationTypes = ["", "Warping", "Sizing"];

  ajlTypes = ["", "Operator"];

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
        return this.service.getUnitById(result.UnitId);
      })
      .then(unit => {
        dataResult.UnitId = unit;
        return dataResult;
      });

    this.UnitId = this.data.UnitId;
    this.UnitId.Name = this.data.UnitId.Name;
    this.CoreAccount = this.data.CoreAccount;
    this.CoreAccount.username = this.CoreAccount.Name;
    this.Assignment = this.data.Assignment;

    if (this.Assignment === "Preparation") {
      this.data.Assignment = "Preparation";
      this.types = this.preparationTypes;
    } else {
      this.data.Assignment = "AJL";
      this.types = this.ajlTypes;
    }
  }

  CoreAccountChanged(newValue) {
    this.data.CoreAccount = {};
    if (this.CoreAccount) {
      this.data.CoreAccount.MongoId = newValue._id;
      this.data.CoreAccount.Id = 0;
      this.data.CoreAccount.Name = newValue.username;
    }
  }

  UnitIdChanged(newValue) {
    this.data.UnitId = newValue;
  }

  AssignmentChanged(newValue) {
    if (newValue === "Preparation") {
      this.data.Assignment = "Preparation";
      this.Assignment = "Preparation";
      this.types = this.preparationTypes;
    } else if (newValue === "AJL") {
      this.data.Assignment = "AJL";
      this.Assignment = "AJL";
      this.types = this.ajlTypes;
    } else {
      this.data.Assignment = "";
      this.Assignment = "";
      this.types = [];
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {

    if (this.CoreAccount === null || this.CoreAccount === undefined) {
      this.data.CoreAccount.MongoId = "";
      this.data.CoreAccount.Id = 0;
      this.data.CoreAccount.Name = "";
    } else {
      this.data.CoreAccount = {};
      if (this.CoreAccount.MongoId) {
        this.data.CoreAccount.MongoId = this.CoreAccount.MongoId;
        this.data.CoreAccount.Id = 0;
        this.data.CoreAccount.Name = this.CoreAccount.username;
      } else {
        this.data.CoreAccount.MongoId = this.CoreAccount._id;
        this.data.CoreAccount.Id = 0;
        this.data.CoreAccount.Name = this.CoreAccount.username;
      }
    }

    if (this.UnitId == undefined || this.UnitId == null || this.UnitId == "") {
      this.data.UnitId = 0;
    } else {
      this.data.UnitId = this.UnitId.Id;
    }

    if (this.Assignment === undefined || this.Assignment === null || this.Assignment === "") {
      this.Assignment = "";
    } else {
      this.data.Assignment = this.Assignment;
    }

    if (this.data.Type === undefined || this.data.Type === null || this.data.Type === "") {
      this.data.Type = "";
    }

    this.service
      .update(this.data)
      .then(result => {

        this.router.navigateToRoute("view", {
          Id: this.data.Id
        });
      })
      .catch(e => {
        this.error = e;
        // this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
      });
  }
}
