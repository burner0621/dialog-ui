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
	@bindable credit;

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

	itemsColumns = [
		{ header: "No Nota" },
		{ header: "Kode Buyer" },
		{ header: "Nama Buyer" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "" },
	]

	otherItemsColumns = [
		{ header: "No Account" },
		{ header: "Keterangan" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Tipe Biaya" },
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
				let items = await this.service.getMemorialById(this.data.MemorialId);
				this.selectedMemorial = items;
			}
		}

		let args = {
			size: 1,
			filter: JSON.stringify({ "Code": "1101.00.4.00" }),
		}
		let dataCoa = await this.service.getChartOfAccounts(args);
		if (dataCoa.data.length > 0) {
			this.data.InvoiceCoa = dataCoa.data[0];
			this.data.DebitCoa = dataCoa.data[0];
		}
	}

	async selectedMemorialChanged(newValue) {
		this.data.TotalAmount = 0;
		if (newValue) {
			if (newValue.Items) {
				this.data.TotalAmount = newValue.Items.reduce((acc, cur) => acc += cur.Credit, 0);
				let amount = newValue.Items.find(x => x.COA && x.COA.Code == "1101.00.4.00");
				if (amount) {
					this.credit = amount.Credit;
					this.amountIDR = this.credit * newValue.GarmentCurrency.Rate;
					this.data.Amount = this.amountIDR;

				}
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

	removeItems() {
		return (event) => {
			this.error = null;
		};
	}

	get addOtherItems() {
		return (event) => {
			this.data.OtherItems.push({});
		};
	}

	removeOtherItems() {
		return (event) => {
			this.error = null;
		};
	}

}
