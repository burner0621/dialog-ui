import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';
const IncomeTaxLoader = require('../../../loader/vat-loader');
const AccountBankLoader = require('../../../loader/account-banks-loader');
const DivisionLoader = require('../../../loader/division-group-loader');

@inject(Service)
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

    constructor(service) {
        this.service = service;
        this.calculateTotalPPHCallback = this.calculateTotalPPHCallback.bind(this);
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.columns = ['No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Category', 'Divisi', 'Pasal PPh', 'Rate PPh', 'PPh', 'PPN', 'Total Bayar (DPP + PPN)', 'Mata Uang', ''];

        if (!this.readOnly)
            this.columns.unshift('__check');

        if (this.data.Id && !this.readOnly) {
            this.isEdit = true;

            let info = {
                // incomeTaxName: this.data.IncomeTax.name,
                // incomeTaxRate: this.data.IncomeTax.rate,
                currency: this.data.Bank.Currency ? this.data.Bank.Currency.Code : this.data.Bank.currency.code
            };

            this.service.getUnitPaymentOrders(info)
                .then(response => {
                    this.data.UnitPaymentOrders.push(...response.data);
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

    // incomeTaxChanged(newV, olV) {
    //     if (newV) {
    //         this.data.IncomeTax = newV;
    //     }
    //     else {
    //         this.data.IncomeTax = undefined;
    //     }

    //     this.loadItems();
    // }

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
            && this.data.Division
            /*&& this.data.IncomeTax*/ && this.data.Bank) {

            let info = {
                dateFrom: moment(this.data.dateFrom).format("MM/DD/YYYY"),
                dateTo: moment(this.data.dateTo).format("MM/DD/YYYY"),
                divisionCodes: this.data.Division.DivisionCodes.join(),
                // incomeTaxName: this.data.IncomeTax.name,
                // incomeTaxRate: this.data.IncomeTax.rate,
                currency: this.data.Bank.Currency.Code
            };

            console.log(info)
            this.service.getUnitPaymentOrders(info)
                .then(response => {
                    this.data.UnitPaymentOrders = response.data;
                });
        }
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : bank.accountName ? `${bank.accountName} - ${bank.bankName} - ${bank.accountNumber} - ${bank.currency.code}` : '';
    }

    // incomeTaxView = (incomeTax) => {
    //     return `${incomeTax.name} - ${incomeTax.rate}`
    // }

    onClickAllDataSource($event) {
        for (let item of this.data.UnitPaymentOrders) {
            item.Check = $event.detail.target.checked;
        }
    }

    calculateTotalPPHCallback() {
        this.PPHTotal = this.data.UnitPaymentOrders
            .filter(p => p.Check === true || this.readOnly)
            .reduce((p, c) => p + c.IncomeTax, 0);
    }

    // get incomeTaxLoader() {
    //     return IncomeTaxLoader;
    // }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    sortingOptions = ["", "Tanggal SPB"];
    sortingTypeOptions = ["A - Z", "Z - A"];

    @bindable selectedSortOption;
    selectedSortOptionChanged(newValue, oldValue) {
        if (newValue)
            this.sortItems();
    }

    @bindable selectedSortTypeOption
    selectedSortTypeOptionChanged(newValue, oldValue) {
        if (newValue)
            this.sortItems();
    }

    sortItems() {
        console.log(this);
        if (this.data.UnitPaymentOrders && this.data.UnitPaymentOrders.length > 0) {
            if (this.selectedSortTypeOption == "A - Z") {
                switch (this.selectedSortOption) {
                    case "Tanggal SPB":
                        this.data.UnitPaymentOrders = this.data.UnitPaymentOrders.sort((item1, item2) => {
                            if (item1.UPODate < item2.UPODate) {
                                return -1;
                            }
                            if (item1.UPODate > item2.UPODate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    default:
                        this.data.UnitPaymentOrders = this.data.UnitPaymentOrders.sort((item1, item2) => {
                            if (item1.No < item2.No) {
                                return -1;
                            }
                            if (item1.No > item2.No) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                }
            } else if (this.selectedSortTypeOption == "Z - A") {
                switch (this.selectedSortOption) {
                    case "Tanggal SPB":
                        this.data.UnitPaymentOrders = this.data.UnitPaymentOrders.sort((item1, item2) => {
                            if (item1.UPODate > item2.UPODate) {
                                return -1;
                            }
                            if (item1.UPODate < item2.UPODate) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    default:
                        this.data.UnitPaymentOrders = this.data.UnitPaymentOrders.sort((item1, item2) => {
                            if (item1.No > item2.No) {
                                return -1;
                            }
                            if (item1.No < item2.No) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                }
            }
        }

        // this.Item
        if (this.ItemsCollection) {
            this.ItemsCollection.bind();
        } else if (this.context.ItemsCollection) {
            this.context.ItemsCollection.bind();
        }
        // console.log(this);
    }
}
