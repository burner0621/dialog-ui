import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from '../service';

@inject(Service)
export class Item {
	@bindable selectedNoAcc;
	@bindable selectedSubAcc;
	@bindable selectedAccUnit;
	@bindable selectedAccBiaya;
	@bindable accName;
	@bindable amount;

	constructor(service) {
		this.service = service;
	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.options = context.options;
		this.readOnly = this.options.readOnly;
		this.isCreate = context.context.options.isCreate;
		this.isEdit = context.context.options.isEdit;
		this.itemOptions = {
			error: this.error,
			isCreate: this.isCreate,
			readOnly: this.readOnly,
			isEdit: this.isEdit,
			header: context.context.options.header,
			item: this.data,
		};
		var header = context.context.options.header;
		this.isIdxZero = true;
		if (!this.data.Id) {

			if (this.data.AccNumber == null) {
				this.selectedNoAcc = {
					Id: header.BankCashReceiptType.COAId,
					Code: header.BankCashReceiptType.COACode,
					Name: header.BankCashReceiptType.COAName,
				};

				this.data.AccNumber = this.selectedNoAcc;

				let idx = header.Items.findIndex(x => x.AccNumber == this.selectedNoAcc);
				if (idx != 0) {
					this.data.AccNumber = null;
					this.selectedNoAcc = null;
					this.isIdxZero = false;
				}
			} else {
				this.selectedNoAcc = this.data.AccNumber || null;
				let idx = header.Items.findIndex(x => x.AccNumber == this.selectedNoAcc);
				if (idx != 0) {
					this.isIdxZero = false;
				}
			}

		} else {
			this.selectedNoAcc = this.data.AccNumber || null;
		}


		if (this.itemOptions.header.Currency) {
			this.Currency = {
				Id: this.itemOptions.header.Currency.Id,
				Code: this.itemOptions.header.Currency.Code,
				Rate: this.itemOptions.header.Currency.Rate,
			};

		}


		this.selectedSubAcc = this.data.AccSub || null;
		// this.selectedAccUnit = this.data.AccUnit || null;
		// this.selectedAccBiaya = this.data.AccAmount || null;
		this.amount = this.data.Amount || null;

		if (this.Currency) {
			var code = this.Currency.Code;
			if (code == 'IDR') {
				this.data.Amount = 0;
			}

		}


	}

	chartOfAccountView = (coa) => {
		if (coa.Id == 0) {
			return "-";
		}
		return coa.Code + " - " + coa.Name;
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

	selectedNoAccChanged(newValue, oldValue) {
		this.data.AccNumber = newValue;
	}

	selectedSubAccChanged(newValue, oldValue) {
		this.data.AccSub = newValue;
	}

	selectedAccUnitChanged(newValue, oldValue) {
		this.data.AccUnit = newValue;
	}

	selectedAccBiayaChanged(newValue, oldValue) {
		this.data.AccAmount = newValue;
	}

	amountChanged(newValue, oldValue) {
		this.data.Amount = newValue;
		if (this.Currency) {
			if (this.Currency.Code != 'IDR') {
				this.data.Summary = this.Currency.Rate * this.data.Amount;
			}
		}
	}

}
