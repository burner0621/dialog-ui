import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/category-loader');

@inject(Service)
export class DataForm {
	@bindable title;
	@bindable readOnly;
	@bindable sourceStorage;
	@bindable targetStorage;

	// formOptions = {
	// 	cancelText: "Kembali",
	// 	saveText: "Simpan",
	// 	deleteText: "Hapus"
	// };

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
	}

	detailsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "uom" },
        { header: "Grade", value: "grade" },
        { header: "Keterangan", value: "remark" }
    ]

	bind(context) {
		this.context = context;
		this.data = this.context.data;
		this.error = this.context.error;

		this.cancelCallback = this.context.cancelCallback;
		this.deleteCallback = this.context.deleteCallback;
		this.saveCallback = this.context.saveCallback;

	}

	categoryChanged(e) {
        if (this.data.category)
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
    }

	unitChanged(e) {
        if (this.data.unit){
            this.data.unitId = this.data.unit._id ? this.data.unit._id : {};
			this.data.unit.divisionId = this.data.unit.division._id ? this.data.unit.division._id : {};
			this.data.unit.divisionCode = this.data.unit.division.code ? this.data.unit.division.code : {};
			this.data.unit.divisionName = this.data.unit.division.name ? this.data.unit.division.name : {};
		}
    }

	get unitLoader() {
        return UnitLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

	get addDetails() {
        return (event) => {
            this.data.details.push({})
        };
    }
} 