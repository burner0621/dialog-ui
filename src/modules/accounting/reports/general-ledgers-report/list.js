import { inject } from 'aurelia-framework';

import moment from 'moment';
import numeral from 'numeral';

import { Service } from './service';

@inject(Service)
export class List {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    apiResult = [];

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];
    }

    bind() {

    }

    async search() {

        // if (this.info.COA == null || this.info.COA.Id == 0) {
        //     this.error.COA = "COA harus diisi";
        // } else {
        // this.error = {};
        // let query = {};

        // if (this.startDate)

        // if (this.startDate)
        // console.log(this.startDate);

        let isError = false;
        if (!this.startDate || this.startDate == "Invalid date") {
            this.error.startDate = "Tanggal Awal harus diisi";
            isError = true;
        }

        if (!this.endDate || this.endDate == "Invalid date") {
            this.error.endDate = "Tanggal Akhir harus diisi";
            isError = true;
        }

        if (this.startDate > this.endDate) {
            this.error = {};
            this.error.invalidDateInput = "Tanggal Akhir harus lebih besar dari Tanggal Awal"
        }

        if (!isError) {
            this.error = {};
            var query = {
                startDate: moment(this.startDate).format("YYYY-MM-DD"),
                endDate: moment(this.endDate).format("YYYY-MM-DD")
            }
            this.data = await this.service.search(query).then((result) => result.data);
        }
    }

    excel() {
        let isError = false;
        if (!this.startDate || this.startDate == "Invalid date") {
            this.error.startDate = "Tanggal Awal harus diisi";
            isError = true;
        }

        if (!this.endDate || this.endDate == "Invalid date") {
            this.error.endDate = "Tanggal Akhir harus diisi";
            isError = true;
        }

        if (this.startDate > this.endDate) {
            this.error = {};
            this.error.invalidDateInput = "Tanggal Akhir harus lebih besar dari Tanggal Awal"
        }

        if (!isError) {
            this.error = {};
            var query = {
                startDate: moment(this.startDate).format("YYYY-MM-DD"),
                endDate: moment(this.endDate).format("YYYY-MM-DD")
            }
            this.service.getXls(query);
        }

    }


    reset() {
        this.error = {};
        this.info = {};
        this.data = [];
        this.startDate = undefined;
        this.endDate = undefined;
    }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}

export class DateFormatValueConverter {
    toView(value) {
        return moment(value).format("DD MMMM YYYY")
    }
}

export class NumberFormatValueConverter {
    toView(value) {
        return numeral(parseFloat(value)).format("0,000.0000")
    }
}
