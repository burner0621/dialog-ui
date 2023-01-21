import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  isCreate = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    this.data = {};
   
  }

  back() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  save() {
    let errorIndex = 0;
    this.error = {};

    if (
      this.data.date === null ||
      this.data.date === undefined ||
      this.data.date === ""
    ) {
      this.error.Date = "Tanggal Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Date = "";
    }

 
    if (errorIndex === 0) {
      
     

      this.service
        .create(this.data)
        .then((result) => {
          alert("Data berhasil dibuat");
          this.router.navigateToRoute(
            "create",
            {},
            { replace: true, trigger: true }
          );
        })
        .catch((e) => {
          if (e.statusCode == 500) {
            alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
          } else {
            
            this.error = e;
            console.log(this.error);
          }
        });
    }
  }
}
