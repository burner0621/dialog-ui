import { inject, bindable, computedFrom } from 'aurelia-framework';

var ProcessTypeLoader = require('../../../loader/process-type-loader');

export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable selectedProcessType;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah",
	};

	controlOptions = {
		label: {
			length: 4
		},
		control: {
			length: 5
		}
	}

	itemsColumns = [
		{ header: "Nama Area", value: "Name" },
		{ header: "Durasi (hari)", value: "Duration" }
	]

	@computedFrom("data.Id")
	get isEdit() {
		return (this.data.Id || '').toString() != '';
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.editCallback = this.context.editCallback;
		this.saveCallback = this.context.saveCallback;
	}

	get processTypeLoader() {
		return ProcessTypeLoader;
	}

	processTypeView = (processType) => {
		return processType.Name
	}

	get addItems() {
		return (event) => {
			this.data.Areas.push({})
		};
	}
} 
