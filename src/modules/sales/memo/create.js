import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class Create {
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
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
    this.list();
  }

  saveCallback(event) {
    this.dialog.prompt('Apakah anda yakin akan menyimpan data ini?', 'Buat Data Memo')
      .then((response) => {
        if (response.ok) {
          this.service
            .create(this.data)
            .then(result => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch(e => {
              this.error = e;
            });

          // console.log(this.data);
        }
      })

  }
}
