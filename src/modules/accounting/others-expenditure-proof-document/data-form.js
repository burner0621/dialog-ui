import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

import BankLoader from '../../../loader/account-banks-loader';

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

    types = ["", "Operasional", "Lain -lain"];

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
        this.context.isEdit = this.isEdit;
        this.data.IsPosting = true;
        this.selectedBank = this.data.AccountBank || null;

        this.error = this.context.error;

        this.saveCallback = this.context.saveCallback;
        this.cancelCallback = this.context.cancelCallback;

        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;

    }

    columns = [
        { header: "Keterangan", value: "Remark" },
        { header: "No. COA", value: "COA.Code" },
        { header: "Nama COA", value: "COA.Name" },
        { header: "Debit", value: "Debit" }
    ]

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get bankLoader() {
        return BankLoader;
    }

    @bindable selectedBank;
    selectedBankChanged(newValue, oldValue) {
        if (newValue) {
            this.data.AccountBankId = newValue.Id;
            this.data.AccountBankCode = newValue.BankCode;
        } else {
            this.data.AccountBankId = 0;
            this.data.AccountBankCode = "";
        }
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - ${bank.AccountNumber}` : '';
    }

}