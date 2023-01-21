import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
const UnitLoader = require('../../../../loader/unit-loader');

@inject(Service)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable unit;
	@bindable type;

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
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

		this.mdnInfo = {
			columns: ["Masukkan No SPB", "Tanggal"],
			onAdd: () => {
				this.data.MaterialDistributionNoteItems.push({});
			},
			options: {
				filter: {},
				isTest: false
			}
		};

		this.types = ["", "PRODUKSI", "RE-GRADING", "TEST"];
		this.unitQuery = { "DivisionName":"DYEING & PRINTING" };
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;

		this.mdnInfo.options.isTest = this.data.Type === "TEST" ? true : false;
	}

	unitChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Unit = newValue;
			Object.assign(this.mdnInfo.options.filter, { "UnitId": this.data.Unit._id });
		}
		else {
			this.data.Unit = undefined;
		}

		this.error = {};
		this.data.MaterialDistributionNoteItems.splice(0, this.data.MaterialDistributionNoteItems.length);
	}

	typeChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Type = newValue;

			delete this.mdnInfo.options.filter.RequestType;
			delete this.mdnInfo.options.filter.localFilter;

			if (this.data.Type === "TEST") {
				Object.assign(this.mdnInfo.options.filter, { "RequestType": this.data.Type });
				this.mdnInfo.options.isTest = true;
			} else if (this.data.Type === "RE-GRADING") {
				Object.assign(this.mdnInfo.options.filter, { "RequestType": "PEMBELIAN" });
				this.mdnInfo.options.isTest = true;
			} else {
				Object.assign(this.mdnInfo.options.filter, { "localFilter": ["AWAL", "PENGGANTI BAD OUTPUT"] })
				this.mdnInfo.options.isTest = false;
			}
		}
		else {
			this.data.Type = "";
		}

		this.error = {};
		this.data.MaterialDistributionNoteItems.splice(0, this.data.MaterialDistributionNoteItems.length);
	}

	get unitLoader() {
		return UnitLoader;
	}
} 