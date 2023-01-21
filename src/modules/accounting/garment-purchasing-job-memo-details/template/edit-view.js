import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from '../service';
import moment from 'moment';
var MemoGarmentPurchasingLoader = require('../../../../loader/memo-garment-purchasing-loader');

@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly;
    @bindable data = {}
    @bindable error;
    @bindable title;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    constructor(service, bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        console.log(this.data);

        this.cancelCallback = this.context.cancelCallback;

        if (this.data.IsPosted) {
            this.deleteCallback = undefined;
            this.editCallback = undefined;
            this.saveCallback = undefined;
        }
    }

    itemsColumns = ["No. Disposisi"]

    get memoGarmentPurchasingLoader() {
        return MemoGarmentPurchasingLoader;
    }

    get addItems() {
        return (event) => {
            this.data.MemoDetailGarmentPurchasingDispositions.push({});
        };
    }

    get getMemoDate() {
        return moment(this.data.MemoDate).format("DD-MMM-YYYY") || '';
    }
}