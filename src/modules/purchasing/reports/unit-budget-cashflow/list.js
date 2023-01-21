import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";
import UnitLoader from "../../../../loader/unit-accounting-loader";
import { Dialog } from "../../../../components/dialog/dialog";
import { AddItemDialog } from "./templates/add-item-dialog";
import { UpdateItemDialog } from "./templates/update-item-dialog";

@inject(Router, Service, Dialog)
export class List {
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.error = {};
    this.unit = "";
    this.date = null;
    this.items = [];
    this.isEmpty = true;
    this.dialog = dialog;
    this.dialogData = {};
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
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
        // this.data.UnitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
      // this.data.DueDate = date;

      let arg = {
        unitId,
        date,
      };

      this.items = await this.service.search(arg).then((result) => result.data);
      this.isEmpty = this.items.length !== 0 ? false : true;

      // console.log("this.items", this.items);
    }
  }

  reset() {
    this.unit = "";
    this.date = null;
  }

  addItem(item) {
    this.dialogData.Info = item;
    this.dialogData.Unit = this.unit;
    this.dialogData.Date = this.date;

    // console.log(this.dialogData);

    this.dialog.show(AddItemDialog, this.dialogData).then(() => this.search());
  }

  updateItem(item) {
    this.dialogData.Info = item;
    this.dialogData.Unit = this.unit;
    this.dialogData.Date = this.date;

    // console.log(this.dialogData);

    this.dialog
      .show(UpdateItemDialog, this.dialogData)
      .then(() => this.search());
  }

  printXls() {
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getXls({ unitId, date });
    }
  }

  printPdf() {
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getPdf({ unitId, date });
    }
  }

  bind() {
    this.data = {};
  }

  get unitLoader() {
    return UnitLoader;
  }
}
