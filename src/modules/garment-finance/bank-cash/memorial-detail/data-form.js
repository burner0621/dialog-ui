import { Router } from 'aurelia-router';
import { CoreService, Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';
import moment from 'moment';

var MemorialLoader = require('../../../../loader/garment-finance-memorial-loader');

@inject(Router, Service, CoreService, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable selectedMemorial;
	@bindable amountIDR;

	controlOptions = {
		label: {
			length: 3
		},
		control: {
			length: 5
		}
	};

	filter = {
		IsUsed: false
	}

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
		{ header: "No Invoice" },
		{ header: "Kode Buyer" },
		{ header: "Nama Buyer" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Total IDR" },
		{ header: "" },
	]

	otherItemsColumns = [
		{ header: "No Account" },
		{ header: "Keterangan" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Total IDR" },
		{ header: "Tipe Biaya" },
		{ header: "" },
	]

	rupiahItemsColumns = [
		{ header: "No Account" },
		{ header: "Nama Account" },
		{ header: "Debit" },
		{ header: "Kredit" },
		{ header: "" },
	]

	constructor(router, service, coreService, dialog) {
		this.router = router;
		this.service = service;
		this.coreService = coreService;
		this.dialog = dialog;
	}

	async bind(context) {
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
			if (this.data.MemorialId) {
				let memorial = await this.service.getMemorialById(this.data.MemorialId);
				this.selectedMemorial = this.data.MemorialId ? memorial : null;
			}
		}

		let args = {
			size: 1,
			filter: JSON.stringify({ "Code": "1103.00.5.00" }),
		}
		let dataCoa = await this.service.getChartOfAccounts(args);
		if (dataCoa.data.length > 0) {
			this.data.InvoiceCoa = dataCoa.data[0];
			this.data.DebitCoa = dataCoa.data[0];
		}
	}

	selectedMemorialChanged(newValue) {
		this.data.TotalAmount = 0;
		if (newValue) {
			if (newValue.Items) {
				for (var item of newValue.Items) {
					this.data.TotalAmount += item.Credit;
				}
				let amount = newValue.Items.find(x => x.COA && x.COA.Code == "1103.00.5.00");
				this.data.Amount = amount.Credit;
				this.amountIDR = this.data.Amount * newValue.GarmentCurrency.Rate;
			}

			this.data.MemorialDate = newValue.Date;
			this.data.MemorialId = newValue.Id;
			this.data.MemorialNo = newValue.MemorialNo;
		}
	}

	get memorialLoader() {
		return MemorialLoader;
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

	get addOtherItems() {
		return (event) => {
			this.data.OtherItems.push({});
		};
	}

	get removeOtherItems() {
		return (event) => {
			this.error = null;
		};
	}

	get addRupiahItems() {
		return (event) => {
			this.data.RupiahItems.push({});
		};
	}

	get removeRupiahItems() {
		return (event) => {
			this.error = null;
		};
	}

	async showDifferentAmount() {
		let args = { filter: JSON.stringify({ "Code": "7131.00.4.00" }) };
		let coaSelisihKurs = await this.service.getChartOfAccounts(args);

		let sumCredit = 0;
		let sumDebit = 0;
		sumDebit += this.amountIDR;
		sumCredit += this.data.Items.reduce((acc, cur) => acc += (cur.Amount * cur.Currency.Rate), 0);
		let otherItemCredit = this.data.OtherItems.filter(x => x.TypeAmount == "KREDIT").reduce((acc, cur) => acc += (cur.Amount * cur.Currency.Rate), 0)
		let otherItemDebit = this.data.OtherItems.filter(x => x.TypeAmount == "DEBIT").reduce((acc, cur) => acc += (cur.Amount * cur.Currency.Rate), 0)

		sumCredit += otherItemCredit;
		sumDebit += otherItemDebit;

		let different;
		let amountDiff;

		if (sumCredit > sumDebit) {
			amountDiff = sumCredit - sumDebit;
			different = { Debit: amountDiff }
		} else {
			amountDiff = sumDebit - sumCredit;
			different = { Credit: amountDiff }
		}

		if (this.data.RupiahItems.length > 0) {
			if (this.data.RupiahItems[0].Account.Code != "7131.00.4.00") {
				this.data.RupiahItems.unshift({
					Account: coaSelisihKurs.data[0],
					...different
				});
			} else {
				if (this.data.RupiahItems[0].Id != null) {
					if (different.hasOwnProperty('Credit')) {
						this.data.RupiahItems[0].Credit = different.Credit;
					} else {
						this.data.RupiahItems[0].Debit = different.Debit;
					}
				} else {
					this.data.RupiahItems.shift();
					this.data.RupiahItems.unshift({
						Account: coaSelisihKurs.data[0],
						...different
					});
				}
			}
		} else {
			this.data.RupiahItems.push({
				Account: coaSelisihKurs.data[0],
				...different
			});

		}


	}
}
