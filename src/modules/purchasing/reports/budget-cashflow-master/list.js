import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import { Service } from "./service";

import { Dialog } from '../../../../components/dialog/dialog';
import { AddCashflowTypeDialog } from './dialog-template/add-cashflow-type-dialog';
import { AddCashflowCategoryDialog } from './dialog-template/add-cashflow-category-dialog';
import { AddCashflowSubCategoryDialog } from './dialog-template/add-cashflow-sub-category-dialog';

@inject(Service, Dialog)
export class List {
    columns = [
        [
            { title: "Keterangan", colspan: 4 }
        ],
        [
            {
                title: "",
                field: "CashflowType"
            },
            {
                title: "",
                field: "CashType"
            },
            {
                title: "",
                field: "CashflowCategory"
            },
            {
                title: "",
                field: "CashflowSubCategory"
            }
        ]
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false,
        pagination: false
    };

    constructor(service, dialog) {
        this.service = service;
        this.dialog = dialog;
    }

    loader = (info) => {

        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    };

    addCashflowType() {
        this.dialog.show(AddCashflowTypeDialog, {})
            .then((response) => {
                console.log(response)
                this.tableList.refresh();
            })
    }

    addCashflowCategory() {
        this.dialog.show(AddCashflowCategoryDialog, {})
            .then((response) => {
                console.log(response)
                this.tableList.refresh();
            })
    }

    addCashflowSubCategory() {
        this.dialog.show(AddCashflowSubCategoryDialog, {})
            .then((response) => {
                console.log(response)
                this.tableList.refresh();
            })
    }
}
