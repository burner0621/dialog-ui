import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    itemsColumns = [
        { header: "Nomor Referensi PR" },
        { header: "Barang" },
        { header: "Kategori" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Harga Budget" },
        { header: "Keterangan" }
    ]

    get buyer() {
		return `${this.data.Buyer.Code} - ${this.data.Buyer.Name}`;
	}
    
    get unit() {
		return `${this.data.Unit.Code} - ${this.data.Unit.Name}`;
	}
}