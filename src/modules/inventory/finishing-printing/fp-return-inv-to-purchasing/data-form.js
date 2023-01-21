import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
const UnitLoader = require('../../../../loader/unit-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable unit;
	@bindable supplier;

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

		this.fpRITP = {
			columns: ["No Bon Hasil Re-grading", "Nama Barang", "Jumlah (Piece)", "Panjang Re-grade (Meter)", "Panjang Seharusnya (Meter)", "Keterangan"],
			onAdd: () => { this.data.FPReturnInvToPurchasingDetails.push({}); },
			options: { filter: {} }
		};

		this.unitQuery = { "division.name": "FINISHING & PRINTING" };
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;
	}

	unitChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Unit = newValue;
			Object.assign(this.fpRITP.options.filter, { "UnitName": this.data.Unit.name });
		}
		else {
			this.data.Unit = undefined;
		}

		this.error = {};
		this.data.FPReturnInvToPurchasingDetails.splice(0, this.data.FPReturnInvToPurchasingDetails.length);
		this.fpRITP.onAdd();
	}

	supplierChanged(newValue, oldValue) {
		if (newValue) {
			this.data.Supplier = newValue;
			Object.assign(this.fpRITP.options.filter, { "SupplierId": this.data.Supplier._id });
		}
		else {
			this.data.Supplier = undefined;
		}

		this.error = {};
		this.data.FPReturnInvToPurchasingDetails.splice(0, this.data.FPReturnInvToPurchasingDetails.length);
		this.fpRITP.onAdd();
	}

	supplierView = (supplier) => {
		return `${supplier.code} - ${supplier.name}`;
	}

	get unitLoader() {
		return UnitLoader;
	}

	get supplierLoader() {
		return SupplierLoader;
	}
} 