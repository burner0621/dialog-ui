import {inject, bindable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
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