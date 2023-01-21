import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInventoryService } from '../service';
const InvoiceLoader = require('../../../../../loader/garment-shipping-invoice-loader');
const CurrencyLoader = require('../../../../../loader/garment-currency-loader');

@inject(Service, CoreService, PackingInventoryService)
export class Item {
	@bindable selectedInvoice;

	constructor(service, coreService, packingInventoryService) {
		this.service = service;
		this.coreService = coreService;
		this.packingInventoryService = packingInventoryService;
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

		this.isShowing = false;
		if (this.error && this.error.Details && this.error.Details.length > 0) {
			this.isShowing = true;
		}
		if (this.data) {
			this.selectedInvoice = {
				id: this.data.InvoiceId,
				invoiceNo: this.data.InvoiceNo,
			};

		}
	}

	invoiceView = (invoice) => {
		return invoice.invoiceNo;
	}

	get invoiceLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
			}

			return this.packingInventoryService.getInvoices(args).then(result => {
				return result.data;
			});
		}
	}

	selectedInvoiceChanged(newValue, oldValue) {
		if (newValue.id != this.data.InvoiceId) {
			this.data.InvoiceId = newValue.id;
			this.data.InvoiceNo = newValue.invoiceNo;
			this.data.BuyerAgent = {
				Id: newValue.buyerAgent.id,
				Code: newValue.buyerAgent.code,
				Name: newValue.buyerAgent.name
			};

			let args = {
				size: 10,
				keyword: "USD",
				filter: JSON.stringify({
					"Date": new Date(newValue.pebDate)
				})
			}
			this.coreService.getGarmentCurrencies(args)
				.then(result => {
					let currency = result.data.slice().pop();
					this.data.Currency = {
						Id: currency.Id,
						Code: currency.Code,
						Rate: currency.Rate,
					}
				});

			let dataInvoice = {};
			let totalAmount = 0;
			let isCmt = false;

			this.packingInventoryService.getInvoiceById(newValue.id).then(result => {
				dataInvoice = Object.assign({}, result);

				for (const invoice of dataInvoice.items) {
					if (invoice.cmtPrice > 0) {
						isCmt = true;
					}
					totalAmount += invoice.cmtPrice * invoice.quantity;
				}
				if (isCmt == false) {
					totalAmount = 0;
					totalAmount = dataInvoice.totalAmount;
				}
				this.data.Amount = totalAmount;
				this.service.getAmount(this.data.InvoiceId)
				.then(result => {
					this.data.Amount -= result ;
				});
			});

			
		}
	}

	currencyView = (currency) => {
		return currency.Code;
	}

	get total() {
		if (this.data.Amount != 0 && (this.data.Currency && this.data.Currency.Rate != 0)) {
			return this.data.Amount * this.data.Currency.Rate;
		}
		return 0;
	}

}
