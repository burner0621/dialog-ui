import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { Service } from "../service";

@inject(DialogController, Service)
@useView("./form-dialog.html")
export class FormDialog {
  constructor(controller, service) {
    this.controller = controller;
    this.service = service;
    this.data = {};
    this.error = {};
    // this.collection = {
    //   columns: ["MATA UANG", "NOMINAL VALAS", "NOMINAL IDR", "ACTUAL IDR"],
    //   onAdd: () => {
    //     this.data.Items.push({});
    //   },
    // };
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  async activate(id) {
    console.log(id);
    this.data = await this.service.getById(id);
    this.vbRealization = await this.service.getRealizationByReferenceNo(this.data.ReferenceNo);
    
    if (!this.vbRealization)
      this.vbRealization = {};
  }

  save() {
    // console.log(this.data);

    // this.error = {};
    // if (this.data.CashflowSubCategoryId) {
    //   this.service
    //     .create(this.data)
    //     .then(() => this.controller.ok(this.data))
    //     .catch((e) => {
    //       this.error = e;
    //     });
    // } else if (this.data.Info.IsSummaryBalance) {
    //   this.service
    //     .createInitialCashBalance(this.data)
    //     .then(() => this.controller.ok(this.data))
    //     .catch((e) => {
    //       this.error = e;
    //     });
    // } else {
    this.service
      .update(this.data)
      .then(() => this.controller.ok(this.data))
      .catch((e) => {
        this.error = e;
      });
    // }
  }

  columns = [
    { header: "No. Akun", value: "COA" },
    { header: "Nama Akun", value: "COA.name" },
    { header: "Keterangan", value: "Remark" },
    { header: "Debit", value: "Debit" },
    { header: "Kredit", value: "Credit" }
  ]

  get addItems() {
    return (event) => {
      this.data.Items.push({})
    };
  }
}
