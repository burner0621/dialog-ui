import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInvService } from '../service';
import moment from 'moment';

var InvoiceLoader = require('../../../../../loader/garment-shipping-invoice-loader');

@inject(Service, CoreService, PackingInvService)
export class Item {
	@bindable selectedInvoice;

	constructor(service, coreService, packingInvService) {
		this.service = service;
		this.coreService = coreService;
		this.packingInvService = packingInvService;
	}

	filter = { "Code": "USD" };

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
		};

		this.selectedInvoice = this.data.InvoiceId ? {
			id: this.data.InvoiceId,
			buyerAgent: this.data.Buyer,
			invoiceNo: this.data.InvoiceNo,

		} : null;

	}

	get invoiceLoader() {
		return InvoiceLoader;
	}

	async selectedInvoiceChanged(newValue) {
		if (newValue) {
			this.data.InvoiceNo = newValue.invoiceNo;
			this.data.InvoiceId = newValue.id;
			var date = moment(newValue.pebDate).format("YYYY-MM-DD");
			this.data.Buyer = {
				Name: newValue.buyerAgent.name || newValue.buyerAgent.Name,
				Code: newValue.buyerAgent.code || newValue.buyerAgent.Code,
				Id: newValue.buyerAgent.id || newValue.buyerAgent.Id,
			};

			var invoice = await this.packingInvService.getInvoiceById(this.data.InvoiceId);
			this.data.Amount = 0;
			var cmtPrice = invoice.items.find(a => a.cmtPrice > 0);
			if (cmtPrice) {
				for (var item of invoice.items) {
					this.data.Amount += (item.price - item.cmtPrice) * item.quantity;
				}

			}
			let info = {
				size: 10,
				keyword: "USD",
				filter: JSON.stringify({ "Code": "USD", "date": date }),
			}
			var currency = await this.coreService.getGarmentCurrencies(info);
			this.data.Currency = currency[0];
		}
	}

	get amountIDR() {
		var qty = 0;
		if (this.data.Amount && this.data.Currency) {
			qty = this.data.Amount * this.data.Currency.Rate;
		}
		this.data.AmountIDR = qty;
		return qty;
	}

}
