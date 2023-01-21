import { Router } from 'aurelia-router';
import { CoreService, Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../au-components/dialog/dialog';
import moment from 'moment';
var BankCashReceiptTypeLoader = require('../../../../loader/bank-cash-receipt-type-loader');
var ExportBuyerLoader= require('../../../../loader/garment-buyers-loader');
var LocalBuyerLoader= require('../../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Router, Service, CoreService, Dialog)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable data = {};
	@bindable error = {};
	@bindable selectedType;
	@bindable receiptDate;
	@bindable selectedBuyer;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	}


	numberingCodeOptionsIDR = ["", "BDM", "BPJSM", "COH", "CRM", "DNM", "FJM", "GBT", "GMT", "GPT", "GRK", "GRM", "HBM", "HBT", "KCM", "KCM", "KGM", "KIK", "KIM", "KVK", "LJM", "MGP", "RJM", "RJM", "RJM"];

	numberingCodeOptionsNotIDR = ["", "CIM", "KVM", "MET", "PVT"];

	incomeTypeOptions = ["", "BELI VALAS", "HASIL TUKAR VALAS", "ISI KAS", "ISI KAS RP", "JASA GIRO", "KELEBIHAN BAYAR", "LAIN - LAIN", "PEMINDAHAN ANTAR KAS", "PENGEMB.UPAH", "PENGEMBALIAN BIAYA INKLARING", "PENGEMBALIAN BIAYA PIBK", "PENGEMBALIAN BIAYA STMB BPJS", "PENGEMBALIAN FREIGHT", "PENGEMBALIAN PEMBELIAN CASH", "PENGEMBALIAN TAMBAHAN UPAH", "PENGEMBL. VB UANG MUKA BIAYA IMPOR", "PENJUALAN EKSPOR", "PENJUALAN LOKAL", "PINDAHAN ANTAR BANK", "PT EFRATA EX PENGEMB.PINJAMAN", "PT EFRATA EX PINJ.SEMENTARA", "SETORAN TUNAI", "TERIMA DARI KEI", "TERIMA DARI PEMBAYARAN SANKSI ADMINISTRASI", "TEXTILE EX PENGEMB.PINJAMAN", "TEXTILE EX PENJUALAN LOKAL", "TEXTILE EX PINJ.SEMENTARA", "TEXTILE EX. PINJAMAN SEMENTARA", "TITIPAN TEXTILE", "TUKAR VALAS"];

	itemsColumns = [
		{ header: "No Acc" },
		{ header: "Sub Acc" },
		{ header: "Amount" },
		{ header: "Jumlah" },
		{ header: "No Nota" },
		{ header: "Ket" },
		{ header: "" },
	]

	get typeLoader() {
		return BankCashReceiptTypeLoader;
	}

	get exportBuyerLoader() {
		return ExportBuyerLoader;
	}

	get localBuyerLoader() {
		return LocalBuyerLoader;
	}

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
			this.bankAccount = this.data.Bank || null;
			//this.chartOfAccount = this.data.DebitCoa || null;
			//this.currencies = this.data.Currency || null;
			this.numberingCode = this.data.NumberingCode || null;
			this.receiptDate = this.data.ReceiptDate || null;
			this.selectedBuyer=this.data.Buyer || null;
			this.selectedType=this.data.BankCashReceiptType;
		}
	}

	bankView = (bank) => {
		return bank.AccountNumber + " - " + bank.AccountName;
	}

	buyerView = (buyer) => {
		return buyer.Code + " - " + buyer.Name;
	}

	@bindable bankAccount;
	bankAccountChanged(newValue, oldValue) {
		if (newValue && this.data.ReceiptDate) {
			this.data.Bank = newValue;
			this.data.NumberingCode = newValue.BankCode + "M";
			let args = {
				size: 10,
				filter: JSON.stringify({ "Code": newValue.AccountCOA }),
			}

			this.service.getChartOfAccounts(args).then(result => {
				if (result.data.length > 0) {
					this.chartOfAccount = result.data[0];
				} else {
					this.dialog.prompt('COA Tidak ditemukan', 'Info');
				}
			});
			var check = moment(this.data.ReceiptDate, 'YYYY/MM/DD');

			var month = check.format('M');
			let currencyId = 0;
			if (newValue.Currency) {
				currencyId = newValue.Currency.Id;
			} else {
				currencyId = this.data.Currency.Id;
			}
			let args2 = {
				size: 10,
				filter: JSON.stringify({ "Currency.Id": currencyId, "Month": month })
			}

			this.coreService.getIBCurrencies(args2).then(result => {
				if (result.data.length > 0) {
					this.currencies = result.data[0];
				} else {
					this.dialog.prompt('Kurs & Rate Tidak ditemukan', 'Info');
				}
			})

		} else {
			this.bankAccount = null;
			if (this.data.ReceiptDate == null) {
				this.dialog.prompt('Silahkan isi Tanggal Penerimaan', 'Info');
			}
		}

	}

	get bankLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
				filter: { "DivisionName": "G" }
			}

			return this.coreService.getAccountBank(args).then(result => {
				return result.data;
			});

		}
	}

	chartOfAccountView = (coa) => {
		return coa.Code + " - " + coa.Name;
	}

	@bindable chartOfAccount;
	chartOfAccountChanged(newValue, oldValue) {
		this.data.DebitCoa = newValue;
	}

	get chartOfAccountLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
				filter: JSON.stringify({ "Code3": "4" }),
			}

			return this.service.getChartOfAccounts(args).then(result => {
				return result.data;
			});

		}
	}

	currenciesView = (currency) => {
		return currency.Currency.Code;
	}

	@bindable currencies;
	currenciesChanged(newValue, oldValue) {
		if (newValue != this.data.Currency) {
			this.data.Currency = {
				Id: newValue.Currency.Id,
				Code: newValue.Currency.Code,
				Rate: newValue.Rate,
			};

		}
	}

	get currenciesLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
			}

			return this.coreService.getBudgetCurrencies(args).then(result => {
				return result.data;
			});

		}

	}

	get addItems() {
		return (event) => {
			if (this.data.Currency == null || this.data.Currency == {}) {
				this.dialog.prompt('Silahkan isi Kurs', 'Info');
			} else {

				this.data.Items.push({});
			}

		};
	}

	get removeItems() {
		return (event) => {
			this.error = null;
		};
	}

	get rate() {
		return this.data.Currency ? this.data.Currency.Rate || this.data.Currency.rate : 0;
	}

	// numberingCodeChanged(newValue, oldValue) {
	// 	this.data.NumberingCode = newValue;
	// }

	receiptDateChanged(newValue, oldValue) {
		if (newValue != this.data.ReceiptDate) {
			this.data.ReceiptDate = newValue;
			this.data.Bank = null;
			this.data.Currency = null;
			this.bankAccount = null;
			this.currencies = null;

		}
	}

	selectedTypeChanged(newValue){
		if(!this.data.Id){
			this.data.BankCashReceiptType=null;
			this.data.Buyer=null;
			if(this.data.Items){
				this.data.Items.splice(0);
			}
		}
		
		if(newValue!=this.data.BankCashReceiptType){
			this.data.BankCashReceiptType=newValue;
		}
	}

	selectedBuyerChanged(newValue){
		if(newValue){
			this.data.Buyer=newValue;
		}
	}
}
