import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
let AccountingBookLoader = require('../../../../loader/accounting-book-loader');

@inject(Service)
export class List {
    @bindable data = [];
    @bindable selectedYear;
    @bindable selectedMonth;
    @bindable accountingBook;

    itemMonths = [
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
        this.data = {};
        this.data.result = [];

        this.isEmpty = true;
        this.totalIdrAmount = numeral(0).format('0,0.0000');

        this.currentYear = moment().format('YYYY');

        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
            this.itemYears.push(i.toString());
        }

        this.isShowValas = false;
        this.isValas = 0;

    }


    async search() {
        let arg = {}
        if(this.data.accountingBookType) {
            arg = {
                size: 100,
                date: this.data.Year + '-' + this.data.Month.value,
                filter : JSON.stringify({
                    AccountingBookId: this.data.accountingBookType.Id,
                })
            }

            if(this.isShowValas){
                arg.valas = this.isValas ? 1 : 0;
            }
            
        } else {
            arg = {
                size: 100,
                date: this.data.Year + '-' + this.data.Month.value,
            }
        }

        this.data.result = await this.service.search(arg)
            .then((result) => {
                if (result.data.length == 0)
                    this.isEmpty = true;
                else
                    this.isEmpty = false;

                let totalIdrAmount = 0;
                var newData = [];
                result.data.map(item => {
                    let newItem = item;
                    totalIdrAmount = item.MemoIdrAmount + totalIdrAmount;
                    newItem.MemoDate = moment(item.MemoDate).format('DD MMM YYYY');
                    newItem.MemoAmount = numeral(item.MemoAmount).format('0,0.0000');
                    newItem.MemoIdrAmount = numeral(item.MemoIdrAmount).format('0,0.0000');
                    newData.push(newItem);
                })

                this.totalIdrAmount = numeral(totalIdrAmount).format('0,0.0000');

                return newData;
            });

    }

    get accountingLoader() {
        return AccountingBookLoader;
    }

    selectedYearChanged(newValue, oldValue){
        if(newValue){
          this.data.Year = newValue;
        }
    }

    selectedMonthChanged(newValue, oldValue){
        if(newValue){
          this.data.Month = newValue;
        }
    }

    accountingBookChanged(newValue) {
        this.data.accountingBookType = newValue;
        if(newValue && newValue.Type.toLowerCase() == 'pembelian lokal'){
            this.isShowValas = true;
        }else {
            this.isShowValas = false;
        }
    }

    accountingBookView = (accountingBook) => {
        return `${accountingBook.Type}`
    }

    pdf() {
        let url = "downloads/pdf?size=100&date="+this.data.Year + '-' + this.data.Month.value;
        if(this.data.accountingBookType) {
            url = url + "&filter=" +JSON.stringify({AccountingBookId: this.data.accountingBookType.Id})

            if(this.isShowValas){
                url = url + "&valas=" + this.isValas;
            }
        }
        this.service.getPdf(url);
    }

    excel() {
        let url = "downloads/xls?size=100&date="+this.data.Year + '-' + this.data.Month.value;
        if(this.data.accountingBookType) {
            url = url + "&filter=" +JSON.stringify({AccountingBookId: this.data.accountingBookType.Id})

            if(this.isShowValas){
                url = url + "&valas=" + this.isValas;
            }
        }
        this.service.getXls(url)
    }

    reset() {
        this.error = {};
        this.selectedMonth = { text: 'January', value: 1 };
        this.selectedYear = parseInt(moment().format('YYYY'));
        this.accountingBook = undefined;
        this.data.accountingBookType = undefined;
        this.data.result = [];
        this.data.Month = { text: 'January', value: 1 };
        this.data.Year = parseInt(moment().format('YYYY'));
        this.isEmpty = true;
        this.totalIdrAmount = numeral(0).format('0,0.0000');
    }

    onClickValas(e) {
        this.isValas = e.target.checked
    }
}
export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
