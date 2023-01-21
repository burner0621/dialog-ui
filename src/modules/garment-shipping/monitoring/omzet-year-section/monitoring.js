import { inject } from 'aurelia-framework'
import { Service } from "./service";

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

    search() {
        const arg = Object.assign({}, this.filter);
        this.service.search(arg)
                .then(result => {
                    this.data = result.data;
                });
    }

    reset() {
        const now = new Date();

        this.selectedYear = now.getFullYear().toString();

        this.data = {};
    }

    xls() {
        this.service.xls(this.filter);
    }
}