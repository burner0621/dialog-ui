import { inject, bindable, computedFrom } from 'aurelia-framework';
var moment = require('moment');
var LossEventLoader = require('../../../../loader/loss-event-loader');
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

        if (this.data.LossEvent) {
            this.lossEvent = this.data.LossEvent;
        }

    }

    get lossEventLoader() {
        return LossEventLoader;
    }


    @bindable lossEvent;
    lossEventChanged(n, o) {
        if (this.lossEvent) {
            this.data.LossEvent = this.lossEvent;
        } else {
            this.data.LossEvent = null;
        }
    }

    lossEventView(losses) {
        if (losses.Losses && losses.ProcessArea) {
            return `${losses.ProcessArea} - ${losses.Losses}`;
        }

        else
            return '';
    }
}