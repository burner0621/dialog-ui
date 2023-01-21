import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { Service } from "../service";

@inject(DialogController, Service)
@useView("./add-item-dialog.html")
export class AddItemDialog {
  constructor(controller, service) {
    this.controller = controller;
    this.service = service;
    this.data = {};
    this.error = {};
    this.collection = {
      columns: ["MATA UANG", "NOMINAL VALAS", "NOMINAL IDR", "ACTUAL IDR"],
      onAdd: () => {
        this.data.Items.push({});
      },
    };
  }

  activate(data) {
    console.log("data", data);

    this.data = data;
    this.data.UnitId = data.Unit.Id;
    // this.data.DivisionId = data.Unit.Division.Id;
    this.data.DivisionId = data.Unit.DivisionId;
    this.data.Date = data.Date;
    this.data.CashflowSubCategoryId = data.Info.SubCategoryId;
    this.data.Items = [];
    this.error = {};
  }

  save() {
    // console.log(this.data);

    this.error = {};
    if (this.data.CashflowSubCategoryId) {
      this.service
        .create(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    } else if (this.data.Info.IsSummaryBalance) {
      this.service
        .createInitialCashBalance(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    } else {
      this.service
        .createRealCashBalance(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    }
  }
}
