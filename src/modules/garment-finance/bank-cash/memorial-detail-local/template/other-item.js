import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInvService } from '../service';
import moment from 'moment';

@inject(Service, CoreService, PackingInvService)
export class OtherItem {
	@bindable selectedAccount;
	@bindable options = {};

	typeAmountSelection = [
		{ id: 1, label: "Kredit", value: "KREDIT" },
		{ id: 2, label: "Debit", value: "DEBIT" },
	];

	constructor(service, coreService, packingInvService) {
		this.service = service;
		this.coreService = coreService;
		this.packingInvService = packingInvService;
	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	async activate(context) {
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
		this.header = this.itemOptions.header;

		this.isShowing = false;
		if (this.error && this.error.Details && this.error.Details.length > 0) {
			this.isShowing = true;
		}
		if (this.data) {
			this.selectedAccount = this.data.Account;
		}
	}

	coaView = (coa) => {
		if (coa.Id == 0) {
			return "-";
		}
		return coa.Code + " - " + coa.Name;
	}

	get coaLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
			}

			return this.service.getChartOfAccounts(args).then(result => {
				return result.data;
			});
		}
	}

	async selectedAccountChanged(newValue, oldValue) {
		if (newValue != this.data.Account) {
			this.data.Account = newValue;
			let args = {
				size: 10,
				filter: JSON.stringify({
					"Code": "IDR"
				})
			};

			let dataCurrencies = await this.coreService.getCurrencies(args);

			var check = moment(this.header.MemorialDate, 'YYYY/MM/DD');

			var month = check.format('M');

			let args2 = {
				size: 10,
				filter: JSON.stringify({
					"Month": month,
					"Currency.Code": dataCurrencies.data[0].Code
				})
			};


			let dataIbCurrencies = await this.coreService.getIBCurrencies(args2);
			console.log("currencies", dataCurrencies);
			console.log("ibCurrencies", dataIbCurrencies);
			this.data.Currency = {
				Id: dataCurrencies.data[0].Id,
				Code: dataCurrencies.data[0].Code,
				Rate: dataIbCurrencies.data[0].Rate
			}
		}
	}

	currencyView = (currency) => {
		return currency.Code;
	}

	selectedTypeAmountChanged(e) {
		let type = (e.detail) ? e.detail : "";

		if (type) {
			this.data.TypeAmount = type;
			this.options.TypeAmount = this.data.TypeAmount;
		}
	}
}