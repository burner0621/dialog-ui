import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from '../service';
var COALoader=require('../../../../../loader/chart-of-account-loader');

@inject(Service)
export class Item {
	@bindable selectedNoAcc;
	@bindable selectedSubAcc;
	@bindable selectedAccUnit;
	@bindable selectedAccBiaya;
	@bindable coa;

	constructor(service) {
		this.service = service;
	}

    filter= { "Code3": "4" };

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
		
		this.coa = this.data.COA || null;

		this.isShowing = false;
		if (this.error && this.error.Details && this.error.Details.length > 0) {
			this.isShowing = true;
		}

	}

	chartOfAccountView = (coa) => {
		if (coa.Id == 0) {
			return "-";
		}
		return coa.Code + " - " + coa.Name;
	}


	get chartOfAccountLoader() {
		return COALoader;
	}

	coaChanged(newValue, oldValue) {
		this.data.COA = newValue;
	}


}
