import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService, PackingInvService } from '../service';

var LocalSalesLoader = require('../../../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service, CoreService, PackingInvService)
export class Item {
	@bindable selectedNote;

	constructor(service, coreService, packingInvService) {
		this.service = service;
		this.coreService = coreService;
		this.packingInvService = packingInvService;
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
		};

		if (this.data) {
			this.selectedNote = {
				id: this.data.LocalSalesNoteId,
				buyer: this.data.Buyer,
				noteNo: this.data.LocalSalesNoteNo,
			};
		}
		console.log(this.data);
	}

	get localSalesLoader() {
		return LocalSalesLoader;
	}

	async selectedNoteChanged(newValue) {
		if (newValue) {
			this.data.LocalSalesNoteNo = newValue.noteNo;
			this.data.LocalSalesNoteId = newValue.id;
			this.data.Buyer = {
				Name: newValue.buyer.name || newValue.buyer.Name,
				Code: newValue.buyer.code || newValue.buyer.Code,
				Id: newValue.buyer.id || newValue.buyer.Id,
			};
			let localSalesDetailData = await this.packingInvService.getLocalSalesNoteById(newValue.id);
			let total = 0;
			let priceSubTotal = localSalesDetailData.items.reduce((acc, cur) => acc += (cur.price * cur.quantity), 0);
			if (localSalesDetailData.useVat) {
				total = (priceSubTotal * 10 / 100) + priceSubTotal;
			} else {
				total = priceSubTotal;
			}
			this.data.Amount = total;

			let info = {
				size: 1,
				keyword: "IDR",
				filter: JSON.stringify({
					"Date": new Date()
				})
			}

			var currency = await this.coreService.getGarmentCurrencies(info);
			this.data.Currency = currency[0];
		}
	}

	noteView = (note) => {
		if (note.id == 0) {
			return "-";
		}
		return note.noteNo;
	}


}
