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
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        return result;
      });
    // this.data = {
    //   Id: 1,
    //   WarpingBrokenCauseName: "Benang Tipis",
    //   Information: "Test 1",
    //   WarpingBrokenCauseCategory: "Umum"
    // };
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  saveCallback(event) {
    this.error = {};

    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("list");
      });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
