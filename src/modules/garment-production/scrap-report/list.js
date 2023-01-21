import {
  inject,bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  @bindable TipeItem;

  search() {
    this.searching();
  }
  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 4
    }
  };

  

  TipeItems = ['', 'Aval TC Kecil', 'Sampah Sapuan']

  TipeItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "Aval TC Kecil") {
        this.tipe = "ZB05";
      } else if (newvalue === "Sampah Sapuan") {
        this.tipe = "ZA59";
      } else {
        this.tipe = "";
      }
    }
  }

  searching() {

    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal Akhir harus diisi";

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal Awal harus diisi";


    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var args = {
        // page: this.info.page,
        // size: this.info.size,
        dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        type: this.tipe ? this.tipe : ""

      }

      console.log(args);
      this.service.search(args)

        .then(result => {
          this.data = result.data;

        });
    }

  }
  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
  reset() {

    this.dateFrom = "";
    this.dateTo = "";
  }

  ExportToExcel() {
    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal Akhir harus diisi";

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal Awal harus diisi";


    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var info = {
        dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        type: this.tipe ? this.tipe : ""
      }
      this.service.generateExcel(info);
    }
  }
}
