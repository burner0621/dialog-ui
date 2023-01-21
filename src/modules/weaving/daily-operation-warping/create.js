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
import moment from 'moment';
@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.error = {};
    var errorIndex = 0;

    if (this.data.PreparationOrder == "" || this.data.PreparationOrder == undefined) {
      this.error.PreparationOrder = "No. Order Produksi Tidak Boleh Kosong";
      errorIndex++;
    }

    if (this.data.AmountOfCones == 0 || this.data.AmountOfCones == undefined) {
      this.error.AmountOfCones = "Jumlah Cone Tidak Boleh Kosong";
      errorIndex++;
    }

    if (this.data.PreparationMaterialType == 0 || this.data.PreparationMaterialType == undefined) {
      this.error.PreparationMaterialType = "Jumlah Beam Dihasilkan Tidak Boleh Kosong";
      errorIndex++;
    }

    // if (this.data.PreparationOperator == "" || this.data.PreparationOperator == undefined) {
    //   this.error.PreparationOperator = "Operator Tidak Boleh Kosong";
    //   errorIndex++;
    // }

    if (this.data.PreparationDate == "" || this.data.PreparationDate == undefined) {
      this.error.PreparationDate = "Tanggal Pasang Tidak Boleh Kosong";
      errorIndex++;
    }
    
    if (this.data.PreparationTime == "" || this.data.PreparationTime == undefined) {
      this.error.PreparationTime = "Waktu Pasang Tidak Boleh Kosong";
      errorIndex++;
    }

    if (this.data.PreparationShift == "" || this.data.PreparationShift == undefined) {
      this.error.Shift = "Shift Tidak Boleh Kosong";
      errorIndex++;
    }

    if (errorIndex === 0) {
      this.service
        .create(this.data)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
