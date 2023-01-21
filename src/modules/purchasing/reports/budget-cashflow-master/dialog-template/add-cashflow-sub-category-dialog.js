import { inject, useView, bindable } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from "../service";

const CashflowCategoryLoader = require("../loaders/cashflow-category-loader");

@inject(DialogController, Service)
@useView("./add-cashflow-sub-category-dialog.html")
export class AddCashflowSubCategoryDialog {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;
    }

    activate(data) {

        this.data = data;
        this.error = {};
        this.data.Remark = "";
    }

    save() {
        this.service.createCashflowSubCategory(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.controller.ok(this.data);
            })
            .catch(e => {
                this.error = e;
            });
    }

    get cashflowCategoryLoader() {
        return CashflowCategoryLoader;
    }

    @bindable cashflowCategory;
    cashflowCategoryChanged(newVal, oldVal) {
        if (newVal) {
            this.data.CashflowCategoryId = newVal.Id;
        } else {
            this.data.CashflowCategoryId = 0;
        }
    }
}