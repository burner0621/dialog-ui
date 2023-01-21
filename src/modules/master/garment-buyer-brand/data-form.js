import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/garment-buyers-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    get buyerLoader() {
        return BuyersLoader;
      }
      buyerView = (buyer) => {
    
        return `${buyer.Code}-${buyer.Name}`
      }
    constructor() {
    }

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

}
