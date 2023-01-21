import { inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

var UnitReceiptNoteLoader = require("../../../../loader/unit-receipt-note-basic-loader");
// var UnitLoader = require("../../../../loader/unit-loader");
// var CategoryLoader = require("../../../../loader/category-loader");
let DivisionLoader = require("../../../../loader/division-loader");
var AccountingCategoryLoader = require('../../../../loader/accounting-category-loader');
var AccountingUnitLoader = require('../../../../loader/accounting-unit-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 5,
        },
    };

    bind() {
        this.reset();
    }

    get unitReceiptNoteLoader() {
            return UnitReceiptNoteLoader;
        }
        // get unitLoader() {
        //     return UnitLoader;
        // }
        // unitView = (unit) => {
        //     return `${unit.Code} - ${unit.Name}`;
        // };
        // get categoryLoader() {
        //     return CategoryLoader;
        // }
        // categoryView = (category) => {
        //     return `${category.code} - ${category.name}`;
        // };
    get accountingCategoryLoader() {
        return AccountingCategoryLoader;
    }
    accountingCategoryView = (AccountingCategoryLoader) => {
        return `${AccountingCategoryLoader.Code} - ${AccountingCategoryLoader.Name}`
    }
    get accountingUnitLoader() {
        return AccountingUnitLoader;
    }
    accountingUnittView = (accountingUnit) => {
        return `${accountingUnit.Code} - ${accountingUnit.Name}`
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    searching() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ?
                    moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            };
            this.service.search(filter).then((result) => {
                this.data = result;
            });
        }
    }

    ExportToExcel() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ?
                    moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            };
            this.service.generateExcel(filter).catch((e) => {
                alert(e.replace(e, "Error: ", ""));
            });
        }
    }

    printPdf() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ?
                    moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            };
            this.service.printPdf(filter).catch((e) => {
                alert(e.replace(e, "Error: ", ""));
            });
        }
    }

    reset() {
        this.unitReceiptNote = "";
        // this.category = "";
        // this.unit = "";
        this.accountingCategory = "";
        this.accountingUnit = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];
    }
}