import { inject, useView, bindable } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from "../service";

const CashflowTypeLoader = require("../loaders/cashflow-type-loader");

@inject(DialogController, Service)
@useView("./add-cashflow-category-dialog.html")
export class AddCashflowCategoryDialog {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;
    }

    typesOption = [{ id: 1, value: "Cash In" }, { id: 2, value: "Cash Out" }]

    activate(data) {
        this.data = data;
        this.error = {};
        this.data.Remark = "";
        this.data.Type = 1;
    }

    @bindable cashflowType;
    cashflowTypeChanged(newVal, oldVal) {
        if (newVal)
            this.data.CashflowTypeId = newVal.Id;
        else {
            this.data.CashflowTypeId = 0
        }
    }

    @bindable selectedType;
    selectedTypeChanged(newVal, oldVal) {
        if (newVal)
            this.data.Type = newVal.id;
        else {
            this.data.Type = 0
        }
    }

    get cashflowTypeLoader() {
        return CashflowTypeLoader;
    }

    save() {
        this.service.createCashflowCategory(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.controller.ok(this.data);
            })
            .catch(e => {
                this.error = e;
            });
    }


}