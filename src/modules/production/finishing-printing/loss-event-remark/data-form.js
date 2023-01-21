import { inject, bindable, computedFrom } from 'aurelia-framework';
var moment = require('moment');
var LossEventCategoryLoader = require('../../../../loader/loss-event-category-loader');
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

        if (this.data.LossEventCategory) {
            this.lossEventCategory = this.data.LossEventCategory;
        }

    }

    get lossEventCategoryLoader() {
        return LossEventCategoryLoader;
    }


    @bindable lossEventCategory;
    lossEventCategoryChanged(n, o) {
        if (this.lossEventCategory) {
            this.data.LossEventCategory = this.lossEventCategory;
        } else {
            this.data.LossEventCategory = null;
        }
    }

    lossEventView(losses) {
        if (losses.LossesCategory && losses.LossEvent && losses.LossEvent.ProcessArea) {
            return `${losses.LossEvent.ProcessArea} - ${losses.LossesCategory}`;
        }

        else
            return '';
    }
}