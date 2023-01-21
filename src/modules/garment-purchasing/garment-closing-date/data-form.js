import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
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

    controlOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };
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
