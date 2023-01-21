import { inject, bindable, computedFrom } from 'aurelia-framework';
var moment = require('moment');
var ProcessTypeLoader = require('../../../../loader/process-type-loader');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    areaOptions = ["", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"];
    constructor(service) {
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

        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

    }

    get processTypeLoader() {
        return ProcessTypeLoader;
    }


    @bindable processType;
    processTypeChanged(n, o) {
        if (this.processType) {
            this.data.ProcessType = this.processType;
        } else {
            this.data.ProcessType = null;
        }
    }
}