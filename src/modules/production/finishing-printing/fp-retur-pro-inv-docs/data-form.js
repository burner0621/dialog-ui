import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var UnitReceiptNoteLoader = require('../../../../loader/unit-receipt-note-basic-loader')
var MachineLoader = require('../../../../loader/machines-loader')
var AccountLoader = require('../../../../loader/account-loader')

@inject(Service)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable Supplier;
    @bindable NoBon;
    @bindable Product;
    @bindable Machine;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    filter = {}
    products = [];
    options = {};
    ProductLoader = [];

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    filterUnit = { "unit.division.name": "FINISHING & PRINTING" };
    @bindable machineFilter = { "unit.name": { "$exists": true } };
    shiftOptions = [
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"]

    DetailInfo = {
        columns: [
            { header: "No" },
            // { header: "Panjang Sebelum Re-grade(Meter)" },
            { header: "Jumlah (Piece)" },
            { header: "Panjang (Meter)" },
            { header: "Grade" },
            // { header: "Grade (hasil Re-grade)" },
            { header: "Retur" },
            { header: "Keterangan" },

        ],
        onAdd: function () {
            this.data.Details.push({});
        }.bind(this),
    };

    get unitReceiptNoteLoader() {
        return UnitReceiptNoteLoader;
    }

    async NoBonChanged(newValue, oldValue) {
        this.products = [];
        if (this.NoBon && this.NoBon._id) {
            // this.filter = { "Id": newValue.Id };
            // var BonData = await this.service.getBonById(newValue.Id);
            this.data.Bon = this.NoBon;
            this.data.Bon.unitName = this.NoBon.unit.name;
            this.data.Supplier = this.NoBon.supplier;
            for (let data of this.NoBon.items) {
                this.products.push({
                    Id: data.product._id,
                    Code: data.product.code,
                    Name: data.product.name,
                    Length: data.deliveredQuantity,
                    ProductView: data.product.code + " - " + data.product.name
                })
            }
            this.ProductLoader = this.products

            if (oldValue) {
                this.Product = null;
                this.data.Details.splice(0, this.data.Details.length);
            }
        }
        else {
            this.NoBon = null;

        }
    }

    ProductChanged(newValue, oldValue) {
        if (this.Product) {
            this.data.Product = this.Product;
            this.data.TotalLength = newValue.Length;

            if (oldValue) {
                this.data.Details.splice(0, this.data.Details.length);
            }
        } else {
            this.Product = null;
            this.data.TotalLength = 0;
            this.data.Details.splice(0, this.data.Details.length);
        }
    }

    get productLoader() {
        return this.ProductLoader;
    }

    MachineChanged(newValue, oldValue) {
        if (this.Machine) {
            this.data.Machine = this.Machine;
        } else {
            this.Machine = null;
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

}