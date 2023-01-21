import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
    itemYears = [];

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

        this.isEmpty = true;
        this.totalCredit = 0;
        this.totalDebit = 0;

    }


    async search() {

        let arg = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null
        }

        this.data = await this.service.search(arg)
            .then((result) => {
                if (result.data.length == 0)
                    this.isEmpty = true;
                else
                    this.isEmpty = false;

                var newData = [];
                for (var item of result.data) {
                    let rowspanNumber = item.Items.length;
                    for (let i = 0; i < item.Items.length; i++) {
                        let detail = item.Items[i];
                        if (i == 0) {
                            detail.isHeader = true;
                            detail.rowspanNumber = rowspanNumber;
                        }
                        detail.Date = detail.Date ? moment(detail.Date).format('DD MMM YYYY') : "-";
                        detail.COAName = detail.COAName ? detail.COAName : "-";
                        detail.COACode = detail.COACode ? detail.COACode : "-";
                        detail.Remark = detail.Remark ? detail.Remark : "-";
                        detail.Debit = detail.Debit ? numeral(detail.Debit).format('0,0.0000') : '0';
                        detail.Credit = detail.Credit ? numeral(detail.Credit).format('0,0.0000') : '0';
                        detail.header = item;
                        detail.header.Description = detail.header.Description ? detail.header.Description : "-";
                        detail.header.ReferenceNo = detail.header.ReferenceNo ? detail.header.ReferenceNo : "-";
                        detail.header.HeaderRemark = detail.header.HeaderRemark ? detail.header.HeaderRemark : "-";
                        newData.push(detail);
                    }
                    // var newVM = {
                    //     Date: item.Date ? moment(item.Date).format('DD MMM YYYY') : "-",
                    //     COAName: item.COAName ? item.COAName : "-",
                    //     COACode: item.COACode ? item.COACode : "-",
                    //     Remark: item.Remark ? item.Remark : "-",
                    //     Debit: item.Debit ? numeral(item.Debit).format('0,0.0000') : '0',
                    //     Credit: item.Credit ? numeral(item.Credit).format('0,0.0000') : '0'
                    // }
                    // newData.push(newVM);
                }

                this.totalCredit = numeral(result.info.TotalCredit).format('0,0.0000');
                this.totalDebit = numeral(result.info.TotalDebit).format('0,0.0000');

                return newData;
            });
        //console.log(this.data);

    }

    excel() {

        // this.flag = true;
        // this.tableList.refresh();

        let arg = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null
        }

        this.service.getXls(arg)

        // this.getExcelData();
    }

    reset() {
        this.error = {};
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.isEmpty = true;
        // this.flag = false;
        this.totalCredit = 0;
        this.totalDebit = 0;
        this.data = [];
        // this.tableList.refresh();
    }
}
export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
