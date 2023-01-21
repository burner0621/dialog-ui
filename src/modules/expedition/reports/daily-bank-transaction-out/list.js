import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
let DivisionLoader = require('../../../../loader/division-loader-new');
let AccountBanksLoader = require('../../../../loader/account-banks-loader');
let ReferenceNoLoader = require('../../../../loader/daily-bank-transaction-document-out-loader');
// let OtherExpenditureProofDocumentLoader = require("../../../../loader/others-expenditure-proof-document-loader");

@inject(Service)
export class List {
    @bindable data = [];
    @bindable isEmpty = true;
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    type = {
        Status: "OUT"
    }

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];
        this.isEmpty = false;

    }

    async search() {
        let filter = {}
        console.log(this.info);
        if (this.info.code)
            filter.referenceNo = this.info.code.ReferenceNo;
        if (this.info.bank) {
            filter.accountBankId = this.info.bank.Id;
            filter.accountBankName = this.info.bank.toString();
        }
        if (this.info.division)
            filter.division = this.info.division.Name;
        if (this.info.startDate)
            filter.startDate = moment(this.info.startDate).format("MM/DD/YYYY");
        if (this.info.endDate)
            filter.endDate = moment(this.info.endDate).format("MM/DD/YYYY");

        filter.filter = JSON.stringify(this.type);

        this.data = await this.service.search(filter)
            .then((result) => {

                if (result.data.length == 0)
                    this.isEmpty = true;
                else
                    this.isEmpty = false;

                result.data.map((item, index) => {
                    let newItem = item;
                    item.Index = index + 1;
                    item.DateFormatted = moment(item.Date).format('DD MMM YYYY');
                    item.Nominal = numeral(item.Nominal).format('0,0.00');
                    return item;
                })

                return result.data;
            });
        if (this.data.length > 0)
            this.isEmpty = false;
        else
            this.isEmpty = true;
    }

    // get otherExpenditureDocumentLoader() {
    //     return OtherExpenditureProofDocumentLoader;
    // }
    get divisionLoader() {
        return DivisionLoader;
    }

    get accountBankLoader() {
        return AccountBanksLoader;
    }
    get referenceNoLoader() {
        return ReferenceNoLoader;
    }
    // otherExpenditureDocumentView = (otherExpenditure) => {
    //     return `${otherExpenditure.DocumentNo}`
    // }
    divisionView = (division) => {
        return division.toString();
    }

    accountBankView = (account) => {
        return account.toString();
    }

    referenceNoView = (reference) => {
        return reference.ReferenceNo;
    }

    excel() {
        let filter = {}
        if (this.info.code)
            filter.referenceNo = this.info.code.ReferenceNo;
        if (this.info.bank) {
            filter.accountBankId = this.info.bank.Id;
            filter.accountBankName = this.info.bank.toString();
        }
        if (this.info.division)
            filter.division = this.info.division.Name;
        if (this.info.startDate)
            filter.startDate = moment(this.info.startDate).format("MM/DD/YYYY");
        if (this.info.endDate)
            filter.endDate = moment(this.info.endDate).format("MM/DD/YYYY");

        filter.filter = JSON.stringify(this.type);
        this.service.getXls(filter);
    }

    reset() {
        this.error = {};
        this.info.code = undefined;
        this.info.bank = undefined;
        this.info.division = undefined;
        this.info.startDate = null;
        this.info.endDate = null;
    }
}
export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
