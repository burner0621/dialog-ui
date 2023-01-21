import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CashflowTypeLoader = require("../../loader/cashflow-type-loader");


@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    typesOption = [{ id: 1, value: "Cash In" }, { id: 2, value: "Cash Out" }]

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
    }

    @bindable cashflowType;
    cashflowTypeChanged(newVal, oldVal) {
        if (newVal)
            this.data.CashflowTypeId = newVal.Id;
        else {
            this.data.CashflowTypeId = 0
        }
    }

    @bindable selectedType;
    selectedTypeChanged(newVal, oldVal) {
        if (newVal)
            this.data.Type = newVal.id;
        else {
            this.data.Type = 0
        }
    }

    get cashflowTypeLoader() {
        return CashflowTypeLoader;
    }
}
