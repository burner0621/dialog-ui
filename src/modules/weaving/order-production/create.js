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
  createOnly = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    this.createData = {};
  }

  activate(params) {}

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", menyimpan nilai masukan
  saveCallback(event) {
    this.error = {};
    var errorIndex = 0;

    var sumWarp = this.data.WarpCompositionPoly + this.data.WarpCompositionCotton + this.data.WarpCompositionOthers;
    if (sumWarp < 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWarp > 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }

    var sumWeft = this.data.WeftCompositionPoly + this.data.WeftCompositionCotton + this.data.WeftCompositionOthers;
    if (sumWeft < 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWeft > 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }
    
    if (errorIndex == 0) {
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
