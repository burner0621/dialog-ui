import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';
const KwitansiLoader = require('../../../../loader/garment-finance-bank-cash-receipt-loader');
import moment from 'moment';
import { ItemTemplate } from '../../../../samples/autocomplete/item-template';

@inject(Router, Service, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable selectedKwitansi;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	}

	filter = {
		IsUsed: false,
		BankCashReceiptTypeName: "PENJUALAN EKSPOR"
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

	othersColumns = [
		{ header: "No Account" },
		{ header: "Keterangan" },
		{ header: "Kurs" },
		{ header: "Rate" },
		{ header: "Jumlah" },
		{ header: "Total IDR" },
		{ header: "Tipe Biaya" },
		{ header: "" },
	]





	constructor(router, service, dialog) {
		this.router = router;
		this.service = service;
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
			this.selectedKwitansi = {
				Id: this.data.BankCashReceiptId,
				ReceiptNo: this.data.BankCashReceiptNo,
				ReceiptDate: this.data.BankCashReceiptDate,
				Amount: this.data.Amount,
			};
		}
		if (this.context.isCreate) {
			let args = {
				size: 10,
				filter: JSON.stringify({ "Code": "1103.00.5.00" }),
			}
			let dataCoa = await this.service.getChartOfAccounts(args);
			if (dataCoa.data.length > 0) {
				this.data.InvoiceCoa = dataCoa.data[0];
				this.data.DebitCoa = dataCoa.data[0];
			}

		}


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


	get kwitansiLoader() {
		return KwitansiLoader;
	}

	kwitansiView = (kwitansi) => {
		return kwitansi.ReceiptNo;
	}

	selectedKwitansiChanged(newValue, oldValue) {
		this.data.TotalAmount = 0;
		if (newValue) {
			if (newValue.Items) {
				for (var item of newValue.Items) {
					this.data.TotalAmount += item.Amount;
				}
			}
			this.data.BankCashReceiptNo = newValue.ReceiptNo;
			this.data.BankCashReceiptId = newValue.Id;
			this.data.BankCashReceiptDate = newValue.ReceiptDate;
			this.data.Amount = newValue.Amount;
		}


	}


}
