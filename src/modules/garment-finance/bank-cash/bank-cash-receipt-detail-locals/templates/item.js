import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInventoryService } from '../service';

@inject(Service, CoreService, PackingInventoryService)
export class Item {
	@bindable selectedNote;

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
			this.selectedNote = {
				id: this.data.LocalSalesNoteId,
				noteNo: this.data.LocalSalesNoteNo,
			};

		}
	}

	localSalesNoteView = (note) => {
		return note.noteNo;
	}

	get localSalesNoteLoader() {
		return (keyword) => {
			let args = {
				size: 10,
				keyword: keyword,
			}

			return this.packingInventoryService.getLocalSalesNote(args).then(result => {
				return result.data;
			});
		}
	}

	async selectedNoteChanged(newValue, oldValue) {
		if (newValue.id != this.data.LocalSalesNoteId) {
			this.data.LocalSalesNoteId = newValue.id;
			this.data.LocalSalesNoteNo = newValue.noteNo;
			this.data.Buyer = {
				Id: newValue.buyer.id,
				Code: newValue.buyer.code,
				Name: newValue.buyer.name
			};

			let args = {
				size: 1,
				keyword: "IDR",
				filter: JSON.stringify({
					"Date": new Date()
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

			let localSalesDetailData = await this.packingInventoryService.getLocalSalesNoteById(newValue.id);
			let total = 0;
			let priceSubTotal = localSalesDetailData.items.reduce((acc, cur) => acc += (cur.price * cur.quantity), 0);
			if (localSalesDetailData.useVat) {
				total = (priceSubTotal * 10 / 100) + priceSubTotal;
			} else {
				total = priceSubTotal;
			}
			this.data.Amount = total;
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
