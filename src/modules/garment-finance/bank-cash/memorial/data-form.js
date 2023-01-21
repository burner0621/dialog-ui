import { Router } from 'aurelia-router';
import { CoreService, Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';
import moment from 'moment';

var AccountingBookLoader=require('../../../../loader/accounting-book-loader');
var CurrenciesLoader=require('../../../../loader/currency-loader');

@inject(Router, Service, CoreService, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable accountingBook;
	@bindable currencies;
    @bindable date;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	}
    get accountingBookLoader() {
        return AccountingBookLoader;
    }

	itemsColumns = [
		{ header: "No Account" },
		{ header: "Nama Account" },
		{ header: "Debet" },
		{ header: "Kredit" },
	]

	constructor(router, service, coreService, dialog) {
		this.router = router;
		this.service = service;
		this.coreService = coreService;
		this.dialog = dialog;
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;
		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.editCallback = this.context.editCallback;
		this.saveCallback = this.context.saveCallback;
		this.Options = {
			isCreate: this.context.isCreate,
			isView: this.context.isView,
			isEdit: this.context.isEdit,
			header: this.data
		}

		if (this.data) {
			this.accountingBook = this.data.AccountingBookId ? {
                Id:this.data.AccountingBookId,
                Code:this.data.AccountingBookCode,
                Type:this.data.AccountingBookType
            } : null;
			this.currencies = this.data.GarmentCurrency || null;
            this.date=this.data.Date;
		}
	}

    accountingBookView=(acc) => {
		return acc.Code + " - " + acc.Type;
    }

    accountingBookChanged(newValue){
		console.log(newValue)
        this.data.AccountingBookId=newValue.Id;
        this.data.AccountingBookCode=newValue.Code;
        this.data.AccountingBookType= newValue.Type;
    }
    
	currenciesView = (currency) => {
        if(currency)
		    return currency.Code || currency.code;
        else
            return "";
	}

	async currenciesChanged(newValue, oldValue) {
		if (newValue && this.data.Date) {
            var date = moment(this.data.Date, 'YYYY/MM/DD');
            var month = date.format('M');
            let info = {
				size: 10,
				filter: JSON.stringify({ "Currency.Id": newValue.Id, "Month": month })
			}
            var rate=0;
			var currency= await this.coreService.getBICurrencies(info);
            if (currency.data.length > 0) {
                console.log(currency)
                rate = currency.data[0].Rate;
            } else {
                this.dialog.prompt('Kurs & Rate Tidak ditemukan', 'Info');
            }
            if(currency){
                this.data.GarmentCurrency = {
                    Code: newValue.Code,
                    Id: newValue.Id,
                    Rate: rate
                };
            }
			
		}
	}

	get currenciesLoader() {
		return CurrenciesLoader
	}

	get addItems() {
		return (event) => {
			this.data.Items.push({});
		};
	}

	get removeItems() {
		return (event) => {
			this.error = null;
		};
	}

	get rate() {
		return this.data.GarmentCurrency ? this.data.GarmentCurrency.Rate || this.data.GarmentCurrency.rate : 0;
	}

    async dateChanged(newValue){
        this.data.Date=newValue;
        if(this.data.GarmentCurrency){
            var date = moment(this.data.Date, 'YYYY/MM/DD');
            var month = date.format('M');
            let info = {
				size: 10,
				filter: JSON.stringify({ "Currency.Id": this.data.GarmentCurrency.Id, "Month": month })
			}
            var rate=0;
			var currency= await this.coreService.getBICurrencies(info);
            if (currency.data.length > 0) {
                console.log(currency)
                rate = currency.data[0].Rate;
            } else {
                this.dialog.prompt('Kurs & Rate Tidak ditemukan', 'Info');
            }
            if(currency){
                this.data.GarmentCurrency.Rate= rate;
            }
        }
    }
}
