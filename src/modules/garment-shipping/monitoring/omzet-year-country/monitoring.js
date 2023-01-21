import { inject } from 'aurelia-framework'
import { Service } from "./service";
import numeral from 'numeral';

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 4 },
        control: { length: 3 }
    }

    yearOptions = [];

    tableOptions = {
        pagination: false,
        search: false,
        showToggle: false,
        showColumns: false,
        showFooter: true,
        footerStyle: () => { return { css: { "font-weight": "bold" } } }
    }

    columns = [
        { field: "no", title: "NO", halign: "center", align: "right", sortable: false },
        { field: "country", title: "N E G A R A", sortable: false },
        { field: "pcsQuantity", title: "QTY - PCS", halign: "center", align: "right", sortable: false },
        { field: "setsQuantity", title: "QTY - SETS", halign: "center", align: "right", sortable: false },
        { field: "packsQuantity", title: "QTY - PACKS", halign: "center", align: "right", sortable: false },        
        { field: "amount", title: "AMOUNT", halign: "center", align: "right", sortable: false, footerFormatter: () => this.total.amount },
        { field: "percentage", title: "%", halign: "center", align: "right", sortable: false, footerFormatter: () => this.total.percentage },
    ]

    total = {};

    get filter() {
        return {
            year: this.selectedYear
        };
    }

    bind() {
        const now = new Date();

        const selectedYear = now.getFullYear();
        for (let i = selectedYear - 5; i <= selectedYear + 5; i++) {
            this.yearOptions.push(i.toString());
        }
        this.selectedYear = selectedYear.toString();
    }

    loader = (info) => {
        const arg = Object.assign({}, this.filter);

        return this.listDataFlag ? (
            this.service.search(arg)
                .then(result => {
                    for (let i = 0; i < result.data.items.length; i++) {
                        result.data.items[i].no = i + 1;
                    }
                    this.total = {
                        amount: result.data.totalAmount,
                        percentage: 100
                    };
                    return {
                        data: result.data.items,
                    }
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    reset() {
        const now = new Date();

        this.selectedYear = now.getFullYear().toString();

        this.total = {};
        this.listDataFlag = false;
        this.table.refresh();
    }

    xls() {
        this.service.xls(this.filter);
    }
}