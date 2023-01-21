import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
var InvoiceNoteLoader = require('../../../../loader/garment-invoice-note-loader')

@containerless()
@inject(Service, BindingEngine)
export class InternNoteItem {
	@bindable invoice;

	itemsColumns = [
		{ header: "Nomor Surat Jalan" },
		{ header: "Nomor PO Eksternal" },
		{ header: "Nomor Ref PR" },
		{ header: "Nomor RO" },
		{ header: "Term Pembayaran" },
		{ header: "Tipe Pembayaran" },
		{ header: "Tanggal Jatuh Tempo" },
		{ header: "Barang" },
		{ header: "Jumlah" },
		{ header: "Satuan" },
		{ header: "Harga Satuan" },
		{ header: "Harga Total" },
		{ header: "Diterima Unit" }
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
		if (this.data.garmentInvoice && this.data.garmentInvoice.invoiceNo) {
			this.invoice =  this.data.garmentInvoice ;
			this.data.garmentInvoice.totalAmount2 =  this.getTotal(this.invoice);
			this.data.garmentInvoice.totalAmount = this.data.garmentInvoice.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
			
		}

		this.filter={};
		if (this.options.supplierId && this.options.currencyCode) {
			this.filter= { "HasInternNote": false, "supplierId": this.options.supplierId, "IsDeleted": false, "currencyCode": this.options.currencyCode};
		}
		for(var inv of this.context.context.items){
			if(inv.data.garmentInvoice)
				this.filter[`invoiceNo == "${inv.data.garmentInvoice.invoiceNo}"`]=false;
		}
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

	invoiceChanged(newValue, oldValue) {
		if(newValue == null){
			this.data.items = {};
			this.error = {};
		}
		else if (newValue) {
			this.getGarmentInvoiceById(newValue.Id);
		} else {
			this.data = {};
		}
	}

	getTotal(invoice) {
		return invoice.items
			.map(invoiceItem => {
				var totalItem = invoiceItem.details
					.map(item => item.doQuantity * item.pricePerDealUnit)
					.reduce(function (prev, curr, index, arr) {
						return prev + curr;
					}, 0);
				return totalItem;
			})
			.reduce(function (prev, curr, index, arr) {
				return prev + curr;
			}, 0);
	}

	getGarmentInvoiceById(id){
		this.service.getGarmentInvoiceById(id)
			.then(garmentInvoice => {
				this.data.garmentInvoice = garmentInvoice;
				this.data.garmentInvoice.totalAmount = this.getTotal(garmentInvoice).toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
				this.data.garmentInvoice.totalAmount2 = this.getTotal(garmentInvoice);
				this.details = [];
				for(var garmentInvoiceItem of garmentInvoice.items){
					for(var detail of garmentInvoiceItem.details){
						var prices = detail.doQuantity * detail.pricePerDealUnit;
						var dueDays = new Date(garmentInvoiceItem.deliveryOrder.doDate);
						dueDays.setDate(dueDays.getDate() + detail.paymentDueDays); 
						var Details = {
							ePOId : detail.ePOId,
							ePONo : detail.ePONo,
							poSerialNumber : detail.pOSerialNumber,
							roNo : detail.roNo,
							pricePerDealUnit : detail.pricePerDealUnit.toLocaleString('en-EN', { maximumFractionDigits: 4,minimumFractionDigits:4}),
							priceTotal : prices.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2}),
							paymentDueDays : detail.paymentDueDays,
							quantity : detail.doQuantity.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2}),
							invoiceDetailId: detail.Id,
							paymentDueDate : new Date(dueDays),
							deliveryOrder : {
								Id : garmentInvoiceItem.deliveryOrder.Id,
								doNo: garmentInvoiceItem.deliveryOrder.doNo,
								doDate: garmentInvoiceItem.deliveryOrder.doDate,
								paymentMethod : garmentInvoiceItem.deliveryOrder.paymentMethod,
								paymentType : garmentInvoiceItem.deliveryOrder.paymentType,
								items: garmentInvoiceItem.deliveryOrder.items
							},
							product : detail.product,
							uomUnit : detail.uoms,
							dODetailId : detail.dODetailId
						};
						this.details.push(Details);
					}
				}
				this.data.details = this.details;
			});
	}

	garmentInvoiceView = (gInvoices) => {
		return`${gInvoices.invoiceNo}`
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
