import { inject } from 'aurelia-framework'
import { Service } from "./service";

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;

        const moment = require('moment');
        moment.locale('id');

        this.monthList = moment.months();

        this.currentYear = moment().year();
        this.currentMonth = moment().month();

        this.filterYear = this.currentYear;
        this.filterMonth = this.monthList[this.currentMonth];

        this.yearOptions = {
            min: this.currentYear - 50,
            max: this.currentYear + 50
        }
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    tableData = []

    get filter() {
        return {
            year: this.filterYear,
            month: this.monthList.indexOf(this.filterMonth) + 1,
        }
    }

    search() {
        if (this.filterYear < this.yearOptions.min || this.filterYear > this.yearOptions.max) {
            alert("Tahun di luar batas.");
        } else {
            this.service.search({ filter: JSON.stringify(this.filter) })
                .then(result => {
                    this.tableData = result.data;
                    this.allTarget = this.tableData.reduce((acc, curr) => acc + curr.Target, 0);
                    this.allOmzet = this.tableData.reduce((acc, curr) => acc + curr.Omzet, 0);
                    this.allAchievement = this.allOmzet / this.allTarget * 100;
                    this.allStatus = this.tableData.reduce((acc, curr) => acc && curr.Status, true);
                });
        }
    }

    clear() {
        this.filterYear = this.currentYear;
        this.filterMonth = this.monthList[this.currentMonth];
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}