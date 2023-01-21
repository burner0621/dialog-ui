import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
const StorageLoader = require('../../../loader/storage-loader');

@inject(Service)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable sourceStorage;
	@bindable targetStorage;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Terima",
		deleteText: "Hapus"
	};

	controlOptions = {
		label: {
			length: 4
		},
		control: {
			length: 4
		}
	};

	constructor(service) {
		this.service = service;

		this.stnInfo = {
			columns: ["Nama Barang", "Quantity Stok", "UOM", "Quantity Transfer"],
			onAdd: () => {
				this.data.StockTransferNoteItems.push({});
			},
			options: {
				filter: {}
			}
		};

	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;

	}

	sourceStorageChanged(newValue, oldValue) {
		if (newValue) {
			this.data.SourceStorage = newValue;

			delete this.stnInfo.options.filter.storageCode;

			Object.assign(this.stnInfo.options.filter, { "storageCode": this.data.SourceStorage.code });

			var filter = {
				"$and": [
					{ "storageCode": this.sourceStorage.code },
					{ "_deleted": false },
				]
			}

			var info = { filter: JSON.stringify(filter) };

			this.service.getSummaries(info)
				.then(result => {

					for (let item of result) {
						let detail = {
							Summary: item,
							TransferedQuantity: 0
						};

						this.data.StockTransferNoteItems.push(detail);
					}
				});
		}
		else {
			this.data.SourceStorage = undefined;
		}

		this.error = {};
		this.data.StockTransferNoteItems.splice(0, this.data.StockTransferNoteItems.length);
	}

	targetStorageChanged(newValue, oldValue) {
		if (newValue) {
			this.data.TargetStorage = newValue;
		}
		else {
			this.data.TargetStorage = undefined;
		}
	}

	get storageLoader() {
		return StorageLoader;
	}
} 