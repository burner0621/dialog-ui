import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
var InvoiceNoteLoader = require('../../../../loader/garment-invoice-note-loader')

@containerless()
@inject(Service, BindingEngine)
export class Item {
	@bindable invoice;

	itemsColumns = [
		{ header: "RO No" },		
		{ header: "PR Internal" },
		{ header: "Barang" },
		{ header: "Unit" },
		{ header: "QTY Dipesan" },
		{ header: "Satuan" },
		{ header: "QTY Sisa" },
		{ header: "Harga Satuan" },		
		{ header: "Harga Total" },
		{ header: "QTY Dibayar" },		
		{ header: "Harga Dibayar" },
		{ header: "% Over QTY" },
	]
	constructor(service, bindingEngine) {
		this.service = service;
		this.bindingEngine = bindingEngine;
	}

	items = [];

	async activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.isShowing = false;
		this.options = context.context.options;
		// console.log(context);
		

		// this.filter = {};
		// if (this.options.supplierId && this.options.currencyCode) {
		// 	this.filter = { "HasInternNote": false, "supplierId": this.options.supplierId, "IsDeleted": false, "currencyCode": this.options.currencyCode };
		// }
		// for (var inv of this.context.context.items) {
		// 	if (inv.data.garmentInvoice)
		// 		this.filter[`invoiceNo == "${inv.data.garmentInvoice.invoiceNo}"`] = false;
		// }
	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	get invoiceNoteLoader() {
		return InvoiceNoteLoader;
	}

	@computedFrom("data.Id")
	get isEdit() {
		return (this.data.Id || '').toString() != '';
	}

	garmentInvoiceView = (gInvoices) => {
		return `${gInvoices.invoiceNo}`
	}

	removeItems = function () {
		this.bind();
	}

	controlOptions = {
		control: {
			length: 12
		}
	};
}
