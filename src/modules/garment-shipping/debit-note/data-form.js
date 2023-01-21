import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const AccountBankLoader = require('../../../loader/account-banks-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    items = {
        columns: [
            "Description",
            // "Currency",
            "Amount"
        ],
        onAdd: function () {
            this.data.items.push({});
        }.bind(this),
        options: {
        }
    };

    get buyerLoader() {
        return BuyerLoader;
    }

    get bankLoader() {
        return AccountBankLoader;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    bankView = (data) => {
        return `${data.BankName || data.bankName} - ${data.Currency ? data.Currency.Code : data.currency.code }`;
    }

    get bankQuery(){
        var result = { "DivisionName" : "G" }
        return result;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    get totalAmount() {
        this.data.totalAmount = (this.data.items || []).reduce((acc, cum) => acc + cum.amount, 0);

        return this.data.totalAmount;
    }
}
