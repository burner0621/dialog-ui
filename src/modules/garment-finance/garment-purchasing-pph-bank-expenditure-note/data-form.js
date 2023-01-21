import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import { ServicePurchasing } from './service-purchasing';
import moment from 'moment';
const IncomeTaxLoader = require('../../../loader/vat-loader');
const AccountBankLoader = require('../../../loader/account-banks-loader');

@inject(Service, ServicePurchasing)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable dateFrom;
    @bindable dateTo;
    @bindable incomeTax;
    @bindable bank;

    PPHTotal = 0;
    Currency = '';

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

    constructor(service,servicePurchasing) {
        this.service = service;
        this.calculateTotalPPHCallback = this.calculateTotalPPHCallback.bind(this);
        this.servicePurchasing = servicePurchasing;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.columns = ['No. NI', 'Tanggal NI', 'Tanggal Jatuh Tempo', 'Supplier', 'PPH', 'Mata Uang', ''];

        if (!this.readOnly)
            this.columns.unshift('__check');

        if (this.data.Id && !this.readOnly) {
            this.isEdit = true;

            let info = {
                // incomeTaxName: this.data.IncomeTax.name,
                // incomeTaxRate: this.data.IncomeTax.rate,
                // isPPHMenu : true,
                // currency: this.data.Bank.Currency ? this.data.Bank.Currency.Code : this.data.Bank.currency.code
                incomeTaxName: this.data.IncomeTax.name,
                incomeTaxRate: this.data.IncomeTax.rate,
                incomeTaxId: this.data.IncomeTax.Id,
                currencyCode: this.data.Bank.Currency.Code,
                isPPHMenu :1
            };


            this.servicePurchasing.getUnitPaymentOrders(info)
                .then(response => {
                    // console.log(response);
                    this.data.UnitPaymentOrders.push(...response.data);
                    // this.data.UnitPaymentOrders = response.data;
                                        
                });
        }

        if (this.isEdit || this.readOnly) {
            this.Currency = this.data.Bank.Currency ? this.data.Bank.Currency.Code : this.data.Bank.currency.code;
            this.calculateTotalPPHCallback();
        }

        this.options = {
            calculateTotalPPHCallback: this.calculateTotalPPHCallback
        };
    }

    dateFromChanged(newV, oldV) {
        this.data.dateFrom = newV;
        this.loadItems();
    }

    dateToChanged(newV, oldV) {
        this.data.dateTo = newV;
        this.loadItems();
    }

    incomeTaxChanged(newV, olV) {
        if (newV) {
            this.data.IncomeTax = newV;
        }
        else {
            this.data.IncomeTax = undefined;
        }

        this.loadItems();
    }

    bankChanged(newV, olV) {
        if (newV) {
            this.data.Bank = newV;
            this.data.Bank.code = this.data.Bank.bankCode;
            this.Currency = this.data.Bank.Currency ? this.data.Bank.Currency.Code : this.data.Bank.currency.code;
        }
        else {
            this.data.Bank = undefined;
            this.Currency = undefined;
        }

        this.loadItems();
    }

    loadItems() {
        if (this.data.dateFrom && this.data.dateFrom != 'Invalid Date'
            && this.data.dateTo && this.data.dateTo != 'Invalid Date'
            && this.data.IncomeTax && this.data.Bank) {

            let info = {

                incomeTaxName: this.data.IncomeTax.name,
                incomeTaxRate: this.data.IncomeTax.rate,
                incomeTaxId: this.data.IncomeTax.Id,
                currencyCode: this.data.Bank.Currency.Code,
                isPPHMenu :1
            };

            // console.log(info)
            this.servicePurchasing.getUnitPaymentOrders(info)
                .then(response => {
                    this.data.UnitPaymentOrders = response.data;
                });
        }
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : bank.accountName ? `${bank.accountName} - ${bank.bankName} - ${bank.accountNumber} - ${bank.currency.code}` : '';
    }

    incomeTaxView = (incomeTax) => {
        return `${incomeTax.name? incomeTax.name:incomeTax.Name} - ${incomeTax.rate?incomeTax.rate:incomeTax.Rate}`
    }

    onClickAllDataSource($event) {
        for (let item of this.data.UnitPaymentOrders) {
            item.Check = $event.detail.target.checked;
        }
    }

    calculateTotalPPHCallback() {
        this.PPHTotal = this.data.UnitPaymentOrders
            .filter(p => p.Check === true || this.readOnly)
            .reduce((p, c) => p + c.TotalIncomeTaxNI, 0);
    }

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }
}
