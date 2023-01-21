import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { Service } from "../service";
import moment from "moment";

@inject(DialogController, Service)
@useView("./update-item-dialog.html")
export class UpdateItemDialog {
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

  async activate(data) {
    // console.log("data", data);

    this.data = data;
    this.data.UnitId = data.Unit.Id;
    this.data.DivisionId = data.Unit.Division.Id;
    this.data.CashflowSubCategoryId = data.Info.SubCategoryId;
    this.error = {};

    let date = data.Date
      ? moment(data.Date).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD");
    this.data.Date = date;
    // this.data.Date = data.Date;

    let args = {
      unitId: this.data.UnitId,
      subCategoryId: this.data.CashflowSubCategoryId,
      date,
    };

    if (this.data.CashflowSubCategoryId) {
      this.data.Items = await this.service.getItems(args).then((result) => {
        result.data = result.data.map((item) => {
          item.CurrencyId = item.Currency.Id;
          return item;
        });
        return result.data;
      });
    } else if (this.data.Info.IsSummaryBalance) {
      this.data.Items = await this.service
        .getItemsInitialCashBalance(args)
        .then((result) => {
          result.data = result.data.map((item) => {
            item.CurrencyId = item.Currency.Id;
            return item;
          });
          return result.data;
        });
    } else {
      this.data.Items = await this.service
        .getItemsRealCashBalance(args)
        .then((result) => {
          result.data = result.data.map((item) => {
            item.CurrencyId = item.Currency.Id;
            return item;
          });
          return result.data;
        });
    }
  }

  save() {
    // console.log(this.data);

    this.error = {};
    if (this.data.CashflowSubCategoryId) {
      this.service
        .update(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    } else if (this.data.Info.IsSummaryBalance) {
      this.service
        .updateInitialCashBalance(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    } else {
      this.service
        .updateRealCashBalance(this.data)
        .then(() => this.controller.ok(this.data))
        .catch((e) => {
          this.error = e;
        });
    }
  }
}
