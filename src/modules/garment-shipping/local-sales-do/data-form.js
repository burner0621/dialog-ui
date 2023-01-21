import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const SalesNoteLoader = require('../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
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
    filter = {
        IsUsed: false
    };
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Nama Barang" },
        { header: "Description" },
        { header: "Quantity " },
        { header: "Satuan" },
        { header: "Jumlah Kemasan" },
        { header: "Satuan Kemasan" },
        { header: "Gross Weight" },
        { header: "Nett Weight" },
    ];

    get salesNoteLoader() {
        return SalesNoteLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit = this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if (this.data.id) {
            this.selectedSalesNote = {
                noteNo: this.data.localSalesNoteNo
            };
        }
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
        };
    }

    selectedSalesNoteChanged(newValue) {
        if (this.data.id) return;

        this.data.localSalesNoteNo = null;
        this.data.localSalesNoteId = 0;
        this.data.buyer = null;
        this.data.items.splice(0);
        if (newValue) {
            this.data.localSalesNoteNo = newValue.noteNo;
            this.data.localSalesNoteId = newValue.id;
            this.data.buyer = newValue.buyer;
            this.service.salesNoteGetById(this.data.localSalesNoteId)
                .then(salesNote => {
                    for (var item of salesNote.items) {
                        let doItem = {};
                        doItem.localSalesNoteItemId = item.id;
                        doItem.product = item.product;
                        doItem.quantity = item.quantity;
                        doItem.uom = item.uom;
                        doItem.packQuantity = item.packageQuantity;
                        doItem.packUom = item.packageUom;
                        this.data.items.push(doItem);
                    }
                });
        }
    }
}
