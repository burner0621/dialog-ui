import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    this.error = {};
    if (this.data.Name) {
      var whitespaceRegex = new RegExp("\\s");
      var name = this.data.Name;
      if (whitespaceRegex.test(name)) {
        this.error.Name = "Kode Tambahan Tidak Boleh Mengandung Spasi";
      } else {
        this.data.Name = "";
        this.data.Name = name;
      }
    }

    if (!this.error.Name) {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", { Id: this.data.Id });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
