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
export class Create {
  @bindable CoreAccount;
  @bindable UnitId;
  @bindable Assignment;

  groups = ["", "A", "B", "C", "D", "E", "F", "G"];

  assignments = ["", "Inspecting", "Preparation", "AJL"];

  types = [];

  preparationTypes = ["", "Warping", "Sizing", "Reaching", "Tying"];

  ajlTypes = ["", "Operator", "Maintenance"];

  inspectingType = ["", "Operator", "Maintenance"]

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  // CoreAccountChanged(newValue) {
  //   this.data.CoreAccount = {};
  //   if (this.CoreAccount) {
  //     this.data.CoreAccount.MongoId = newValue._id;
  //     this.data.CoreAccount.Id = 0;
  //     this.data.CoreAccount.Name = newValue.username;
  //   }
  // }

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
    }else if (newValue === "Inspecting") {
      this.data.Assignment = "Inspecting";
      this.Assignment = "Inspecting";
      this.types = this.inspectingType;
    }
    else {
      this.data.Assignment = "";
      this.Assignment = "";
      this.types = [];
    }
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {

    // if (this.CoreAccount === null || this.CoreAccount === undefined) {
    //   this.data.CoreAccount.MongoId = "";
    //   this.data.CoreAccount.Id = 0;
    //   this.data.CoreAccount.Name = "";
    // } else {
      this.data.CoreAccount = {};
      this.data.CoreAccount.MongoId = 0;
      this.data.CoreAccount.Id = 0;
      this.data.CoreAccount.Name = this.CoreAccount;
    // }
    console.log(this.data);

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
      .create(this.data)
      .then(result => {

        this.list();
      })
      .catch(e => {
        this.error = e;
        // this.error.CoreAccount = e['CoreAccount'] ? 'Core Account must not be empty' : '';
      });
  }
}
