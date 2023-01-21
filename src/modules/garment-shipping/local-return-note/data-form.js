import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const SalesNoteLoader = require('../../../loader/garment-shipping-local-sales-note-loader');
const TransactionTypeLoader = require('../../../loader/garment-transaction-type-loader');
const BuyerLoader = require('../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedSalesNote;

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
            "Kode - Nama Barang",
            "Quantity",
            "Quantity yang diretur",
            "Satuan",
            "Harga",
            "Total"
        ],
        options: {
        }
    };

    get salesNoteLoader() {
        return SalesNoteLoader;
    }

    get transactionTypeLoader() {
        return TransactionTypeLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    transactionTypeView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    buyerNPWPView = (data) => {
        return data.NPWP || data.npwp;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data) {
            this.data.salesNote = this.data.salesNote || {};
        }
    }

    get dueDate() {
        if (!this.data.salesNote.date) {
            return null;
        }

        let dueDate = new Date(this.data.salesNote.date || new Date());
        dueDate.setDate(dueDate.getDate() + this.data.salesNote.tempo);

        return dueDate;
    }

    selectedSalesNoteChanged(newValue) {
        this.data.items.splice(0);

        if (newValue) {
            this.service.getSalesNoteById(newValue.id)
                .then(salesNote => {
                    this.data.salesNote = salesNote;
                    for (const salesNoteItem of salesNote.items) {
                        const item = {
                            salesNoteItemId:salesNoteItem.id,
                            salesNoteItem: salesNoteItem,
                            isChecked: true,
                            returnQuantity: salesNoteItem.quantity
                        };
                        this.data.items.push(item);
                    }
                    this.items.options.isCheckedAll = true;
                })
        } else {
            this.data.salesNote = {};
        }
    }
}
