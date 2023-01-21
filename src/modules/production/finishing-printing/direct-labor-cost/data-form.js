import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable month;
    @bindable year;
    @bindable itemYears;

    // itemYears = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;
        this.itemMonths = [
            { text: 'January', value: 1 },
            { text: 'February', value: 2 },
            { text: 'March', value: 3 },
            { text: 'April', value: 4 },
            { text: 'May', value: 5 },
            { text: 'June', value: 6 },
            { text: 'July', value: 7 },
            { text: 'August', value: 8 },
            { text: 'September', value: 9 },
            { text: 'October', value: 10 },
            { text: 'November', value: 11 },
            { text: 'Desember', value: 12 }
        ];

        this.currentYear = moment().format('YYYY');
        this.startYear = parseInt(this.currentYear) - 2;
        this.endYear = parseInt(this.currentYear) + 2;
        var years = [];
        for (var i = parseInt(this.startYear); i <= this.endYear; i++) {
            years.push(i);
        }
        this.itemYears = years;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        
        if (this.data.Month) {
            var selectedMonth = this.itemMonths.find(x => x.value == this.data.Month);
            if (this.readOnly) {
                this.month = selectedMonth.text;
            } else {
                this.month = {};
                this.month.text = selectedMonth.text;
                this.month.value = selectedMonth.value;
            }

        }

        if (this.data.Year) {
            this.year = this.data.Year;

        }
    }

    monthChanged(n, o) {
        if (this.month) {
            this.data.Month = this.month.value;
        }
    }

    yearChanged(n, o) {
        if (this.year) {
            this.data.Year = this.year;
        }
    }
}