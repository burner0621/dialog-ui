import { bindable } from "aurelia-framework";

var SupplierLoader = require('../../../loader/supplier-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable dataSupplier;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    transferShippingOrderItemsColumns = [
        "Nomor DO",
    ];

    transferShippingOrderItemsOptions = { filter: {} };

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.readOnly) {
            this.transferShippingOrderItemsColumns.push("");
        }

        if (this.data) {
            this.dataSupplier = this.data.Supplier;
        }

        this.transferShippingOrderItemsOptions.isEdit = this.isEdit;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }

    dataSupplierChanged(newValue, oldValue) {
        this.data.Supplier = newValue;
        if (newValue) {
            Object.assign(this.transferShippingOrderItemsOptions.filter, { SupplierId: newValue._id });

            if (oldValue && newValue._id !== oldValue._id)
                this.data.TransferShippingOrderItems.splice(0, this.data.TransferShippingOrderItems.length);
        }
        else if (oldValue) {
            this.data.TransferShippingOrderItems.splice(0, this.data.TransferShippingOrderItems.length);
        }
    }

    get addTransferShippingOrderItems() {
        return () => {
            this.data.TransferShippingOrderItems.push({});
        }
    };

}