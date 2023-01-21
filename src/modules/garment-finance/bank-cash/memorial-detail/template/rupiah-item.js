import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInvService } from '../service';
import moment from 'moment';

@inject(Service, CoreService, PackingInvService)
export class RupiahItem {
	@bindable selectedAccount;

	constructor(service, coreService, packingInvService) {
		this.service = service;
		this.coreService = coreService;
		this.packingInvService = packingInvService;
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
		}
	}

	get total() {
		if (this.data.Currency && this.data.Amount != 0) {
			return this.data.Amount * this.data.Currency.Rate;
		}
		return 0;
	}
}