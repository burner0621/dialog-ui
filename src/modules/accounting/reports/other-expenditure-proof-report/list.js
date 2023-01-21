import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
let DivisionLoader = require('../../../../loader/division-loader-new');
let OtherExpenditureProofDocumentLoader = require("../../../../loader/others-expenditure-proof-document-loader");

@inject(Service)
export class List {
    @bindable data = [];
    @bindable totalAmount;

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];
        this.isEmpty =false;

    }

    async search() {


        let arg = {
            // startDate : this.info.startDate,
            // endDate : this.info.endDate,
            // bankExpenditureNo : this.info.bankExpenditureNo? this.info.bankExpenditureNo.DocumentNo: null,
            // dateExpenditure : this.info.date
            // // division : this.info.division.code,
        }
        if(this.info.startDate!= undefined)
            arg.startDate = moment(this.info.startDate).format("YYYY-MM-DD");
        if(this.info.endDate!= undefined)
            arg.endDate = moment(this.info.endDate).format("YYYY-MM-DD");
        if(this.info.date!= undefined)
            arg.dateExpenditure = moment(this.info.date).format("YYYY-MM-DD");
        if(this.info.bankExpenditureNo!= undefined)
            arg.bankExpenditureNo = this.info.bankExpenditureNo? this.info.bankExpenditureNo.DocumentNo: null;


        this.data = await this.service.search(arg)
            .then((result) => {
                
                if (result.data.length == 0)
                    this.isEmpty = true;
                else
                    this.isEmpty = false;

                let totalAmount = 0;
                result.data.map((item,index) => {
                    let newItem = item;
                    totalAmount = item.Total + totalAmount;
                    item.Index = index+1;
                    item.DateFormatted = moment(item.Date).format('DD MMM YYYY');
                    item.TotalFormatted = numeral(item.Total).format('0,0.0000');
                })

                this.totalAmount = numeral(totalAmount).format('0,0.0000');

                return result.data;
            });
    }

    get otherExpenditureDocumentLoader() {
        return OtherExpenditureProofDocumentLoader;
    }
    get divisionLoader() {
        return DivisionLoader;
    }

    otherExpenditureDocumentView = (otherExpenditure) => {
        return `${otherExpenditure.DocumentNo}`
    }
    divisionView=(division)=> {
        return division.toString();
    }

    excel() {
        let arg= {
            // startDate : this.info.startDate,
            // endDate : this.info.endDate,
            // bankExpenditureNo : this.info.bankExpenditureNo? this.info.bankExpenditureNo.DocumentNo: null,
            // dateExpenditure : this.info.date
            // // division : this.info.division.code,
        }
        if(this.info.startDate!= undefined)
            arg.startDate = moment(this.info.startDate).format("YYYY-MM-DD");
        if(this.info.endDate!= undefined)
            arg.endDate = moment(this.info.endDate).format("YYYY-MM-DD");
        if(this.info.date!= undefined)
            arg.dateExpenditure = moment(this.info.date).format("YYYY-MM-DD");
        if(this.info.bankExpenditureNo!= undefined)
            arg.bankExpenditureNo = this.info.bankExpenditureNo? this.info.bankExpenditureNo.DocumentNo: null;
        this.service.getXls(arg);
    }

    reset() {
        this.error = {};
        this.info.bankExpenditureNo = undefined;
        this.info.date = undefined;
        this.info.division = undefined;
        this.info.startDate =undefined;
        this.info.endDate = undefined;
    }
}
export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
