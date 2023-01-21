import { inject } from 'aurelia-framework';
import moment from 'moment';
// import numeral from 'numeral';
import { Service } from './service';
import { ifError } from 'assert';
import { PeriodEditor } from './dialogs/period-editor';
import { Dialog } from '../../../../au-components/dialog/dialog';
const COALoader = require('../../../../loader/coa-loader');

@inject(Service, Dialog)
export class List {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    monthOptions = [
        {
            "MonthNumber": 1,
            "MonthName": "Januari"
        }, {
            "MonthNumber": 2,
            "MonthName": "Februari"
        }, {
            "MonthNumber": 3,
            "MonthName": "Maret"
        }, {
            "MonthNumber": 4,
            "MonthName": "April"
        }
    ];

    apiResult = {
        info: [{
            Date: "10 Januari 2019",
            No: "test",
            BankName: "Nama Bank",
            BGCheck: "BG",
            Remark: "Remark",
            Debit: 10000,
            Credit: 19000
        }, {
            Date: "10 Januari 2019",
            No: "test",
            BankName: "Nama Bank",
            BGCheck: "BG",
            Remark: "Remark",
            Debit: 10000,
            Credit: 19000
        }, {
            Date: "10 Januari 2019",
            No: "test",
            BankName: "Nama Bank",
            BGCheck: "BG",
            Remark: "Remark",
            Debit: 10000,
            Credit: 19000
        }, {
            Date: "10 Januari 2019",
            No: "test",
            BankName: "Nama Bank",
            BGCheck: "BG",
            Remark: "Remark",
            Debit: 10000,
            Credit: 19000
        }],
        initialBalance: 100,
        closingBalance: 200
    };

    yearOptions = [];
    initialBalance = 0;
    closingBalance = 0;

    constructor(service, dialog) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];
        this.textileLokals = [];
        this.textileImports = [];
        this.garmentImports = [];
        this.garmentLokals = [];
        this.others = [];
        this.info = {};
        this.dialog = dialog;
        this.isEmpty = true;
        this.totalCredit = 0;
        this.totalDebit = 0;


    }

    async bind() {
        this.info.year = (new Date()).getFullYear();
        for (var i = this.info.year; i > 2010; i--) {
            this.yearOptions.push(i);
        }

        let monthResult = await this.service.getMonths();
        this.monthOptions = monthResult.data;
        this.info.month = this.monthOptions[(new Date()).getMonth()];
    }

    get coaLoader() {
        return COALoader;
    }

    coaView(coa) {
        return coa.Name ? `${coa.Code} - ${coa.Name}` : coa.Code;
    }

    async search() {

        // if (this.info.COA == null || this.info.COA.Id == 0) {
        //     this.error.COA = "COA harus diisi";
        // } else {
        this.error = {};
        let query = {};
        if (this.info.COA == null || this.info.COA.Id == 0) {
            query = {
                month: this.info.month.MonthNumber,
                year: this.info.year
            }
        } else {
            query = {
                month: this.info.month.MonthNumber,
                year: this.info.year,
                coaId: this.info.COA.Id
            }
        }


        let apiResult = await this.service.search(query);
        // console.log(apiResult);
        this.textileLokals = apiResult.data.TextileLokals;
        this.textileImports = apiResult.data.TextileImports;
        this.garmentLokals = apiResult.data.GarmentLokals;
        this.garmentImports = apiResult.data.GarmentImports;
        this.others = apiResult.data.Others;
        this.initialBalance = apiResult.data.InitialBalance;
        this.closingBalance = apiResult.data.ClosingBalance;
        // }

    }

    excel() {

        this.error = {};
        let query = {};
        if (this.info.COA == null || this.info.COA.Id == 0) {
            query = {
                month: this.info.month.MonthNumber,
                year: this.info.year
            }
        } else {
            query = {
                month: this.info.month.MonthNumber,
                year: this.info.year,
                coaId: this.info.COA.Id
            }
        }

        this.service.getXls(query);
    }

    excelAll() {

        this.dialog.show(PeriodEditor)
            .then(response => {
                return response;
            });

    }

    reset() {
        this.error = {};
        this.info = {};
        this.data = [];
        this.textileLokals = [];
        this.textileImports = [];
        this.garmentImports = [];
        this.garmentLokals = [];
        this.others = [];
        this.initialBalance = 0;
        this.closingBalance = 0;
        this.info.year = (new Date()).getFullYear();
        this.info.month = this.monthOptions[(new Date()).getMonth() - 1];
    }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
