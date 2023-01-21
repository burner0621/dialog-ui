import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { CoreService } from "./core-service";
import moment from "moment";

@inject(Router, Service, CoreService)
export class List {
  constructor(router, service, coreService) {
    this.router = router;
    this.service = service;
    this.coreService = coreService;
    this.error = {};
    this.date = null;
    this.columns = [];
    this.rows = [];
    this.isEmpty = true;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  async search() {
    if (this.date === null) {
      this.error.date = "Periode harus diisi";
    } else {
      this.error.date = "";

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
      // this.data.DueDate = date;

      let arg = {
        date,
      };

      await this.service.search(arg).then((result) => {
        this.columns = result.data.Headers;
        this.subColumns = [];
        for (const column of this.columns) {
          this.subColumns = [
            ...this.subColumns,
            "VALAS",
            "IDR",
            "ACTUAL IDR",
          ];
        }

        this.rows = result.data.Items;
        this.rows.map((row) => {
          row.ItemsCol = [];
          row.Items &&
            row.Items.map((item) => {
              row.ItemsCol.push(
                item.CurrencyNominal,
                item.Nominal,
                item.Actual
              );
            });
          return row;
        });
      });

      this.isEmpty = this.rows.length !== 0 ? false : true;

      // console.log("this.isEmpty", this.isEmpty);
      // console.log("this.columns", this.columns);
      // console.log("this.subColumns", this.subColumns);
      // console.log("this.rows", this.rows);
    }
  }

  reset() {
    this.date = null;
  }

  printXls() {
    if (this.date === null) {
      this.error.date = "Periode harus diisi";
    } else {
      this.error.date = "";

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getXls({ date });
    }
  }

  printPdf() {
    if (this.date === null) {
      this.error.date = "Periode harus diisi";
    } else {
      this.error.date = "";

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getPdf({ date });
    }
  }

  bind() {
    this.data = {};
  }
}
