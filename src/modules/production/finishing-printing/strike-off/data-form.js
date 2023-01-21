import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    // itemYears = [];

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

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.readOnly) {
            this.itemColumns = ["Kode Warna", ""];
        } else {
            this.itemColumns = ["Kode Warna"];
        }

        if (this.data.Type) {
            this.type = this.data.Type;
        }

        if (this.data.Cloth) {
            this.cloth = this.data.Cloth;
        }
    }

    itemColumns = ["Kode Warna", ""];
    isRegular = false;
    types = ["PRINTING REAKTIF", "PRINTING PIGMENT", "PRINTING RIPPLE", "GROUND PRINTING"];
    clothes = ["Cotton", "Rayon"];

    addItemCallback = (e) => {
        this.data.StrikeOffItems = this.data.StrikeOffItems || [];
        this.data.StrikeOffItems.push({})
    };

    @bindable ItemsCollection;
    detailOptions = {};
    @bindable type;
    typeChanged(n, o) {
        if (this.type) {
            this.data.Type = this.type;
            this.detailOptions.Type = this.data.Type;
            if (this.data.Type === "PRINTING REAKTIF") {
                this.isRegular = true;
                this.dyeStuffColumns = ["DyeStuff Reaktif", "Total"];
            } else {
                this.isRegular = false;
                if (this.data.Type === "PRINTING REAKTIF RESIST") {
                    this.data.Cloth = "Cotton";
                    this.detailOptions.Cloth = this.data.Cloth;
                    this.dyeStuffColumns = ["DyeStuff Reaktif", "Total"];
                } else {
                    this.dyeStuffColumns = ["DyeStuff Pigment", "Total"];
                    this.data.Cloth = null;
                }
            }

            this.ItemsCollection.bind();
        } else {
            this.data.Type = null;
            this.data.StrikeOffItems = [];
        }
    }

    @bindable cloth;
    clothChanged(n, o) {
        if (this.cloth) {
            this.data.Cloth = this.cloth;
            this.detailOptions.Cloth = this.data.Cloth;

            this.ItemsCollection.bind();
        } else {
            this.data.Cloth = null;

            if (!this.data.Type)
                this.data.StrikeOffItems = [];
        }
    }
}