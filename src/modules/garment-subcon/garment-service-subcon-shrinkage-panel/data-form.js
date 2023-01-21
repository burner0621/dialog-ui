import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service)
export class DataForm {
	@bindable readOnly = false;
	@bindable isCreate = false;
	@bindable isEdit = false;
	@bindable isView = false;
	@bindable title;
	@bindable data = {};
	@bindable itemOptions = {};

	constructor(service) {
		this.service = service;
	}

	formOptions = {
		cancelText: "Kembali",
		saveText: "Simpan",
		deleteText: "Hapus",
		editText: "Ubah"
	};

	UomOptions = ['COLI', 'IKAT', 'CARTON', 'ROLL'];
	controlOptions = {
		label: {
			length: 3
		},
		control: {
			length: 5
		}
	};

	itemsInfo = {
		columns: [
			"No Bon Pengeluaran Unit",
			"Tgl Pengeluaran",
			"Asal Unit",
			""
		]
	}

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;
		this.itemOptions = {
			isCreate: this.context.isCreate,
			isEdit: this.context.isEdit,
			isView: this.context.isView,
			checkedAll: this.context.isCreate == true ? false : true
		}
	}

	get addItems() {
		return (event) => {
			this.data.Items.push({});
		};
	}

	get removeItems() {
		return (event) => {
			this.error = null;
		};
	}

	/*get totalQuantity() {
		var qty = 0;
		if (this.data.Items) {
			for (var item of this.data.Items) {
				if (item.Details) {
					for (var detail of item.Details) {
						qty += detail.Quantity;
					}
				}
			}
		}
		return qty;
	}*/
}
