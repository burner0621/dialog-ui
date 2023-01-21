import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';

@inject(Router, Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
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