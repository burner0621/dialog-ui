import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

import { Dialog } from '../../../components/dialog/dialog';

import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class Create {
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
    this.data = {};
  }

  isCreate = true;

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

    if (this.data.vbRealization.Header.Id)
      this.service
        .verified(this.data.vbRealization.Header.Id)
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
    else {
      this.error = {
        vbRealization: "Realisasi VB harus diisi"
      }
    }
  }

  rejectCallback(event) {
    // this.service
    //   .reject(this.data)
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

    if (this.data.vbRealization && this.data.vbRealization.Header.Id) {
      this.dialog.show(AlertView)
        .then((response) => {
          
          if (!response.wasCancelled) {
            var body = {
              Reason: response.output.Remark
            }
            
            this.service
              .reject(this.data.vbRealization.Header.Id, body)
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
          }

        })
    } else {
      this.error = {
        vbRealization: "Realisasi VB harus diisi"
      }
    }
  }
}
