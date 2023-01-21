import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  dataToBeSubmitted = [];
  realizationTable;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) { }

  list() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  saveCallback(event) {
    // this.service
    //   .create(this.data)
    //   .then(result => {
    //     alert("Data berhasil dibuat");
    //     this.router.navigateToRoute(
    //       "create",
    //       {},
    //       { replace: true, trigger: true }
    //     );
    //   })
    //   .catch(e => {
    //     this.error = e;
    //   });
    console.log(this.dataToBeSubmitted && this.dataToBeSubmitted.length > 0)
    if (this.dataToBeSubmitted && this.dataToBeSubmitted.length > 0) {
      console.log(this);
      let data = this.dataToBeSubmitted.map((datum) => {
        return datum.Id;
      });

      this.service
        .create({ VBRealizationIds: data })
        .then(result => {
          alert("Data berhasil dibuat");
          this.realizationTable.refresh();
        })
        .catch(e => {
          console.log(e);
          this.error = e;
        });
    } else {
      alert("harap pilih data");
    }
  }
}
