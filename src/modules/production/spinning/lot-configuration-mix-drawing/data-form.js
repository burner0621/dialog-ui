import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var YarnLoader = require('../../../../loader/spinning-yarn-loader');
var MachineLoader = require('../../../../loader/machine-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var ProductLoader = require('../../../../loader/product-loader');

var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
// var moment = require('moment');
@inject(Service)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable title;
    @bindable unit;
    @bindable yarn;
    @bindable detailOptions = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    yarnTypeList = [
        "PCP",
        "CMP",
        "CD",
        "CVC",
        "PE",
        "TENCEL",
        "CUPRO",
        "PC-P 45"
    ];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemColumns = ["Nama Serat", "Komposisi"];
    spinningFilter = { "(Code == \"S1\" || Code == \"S2\")": true };
    shift = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]

    constructor(service) {
        this.service = service;
        this.detailOptions.service = service;
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.data.IsMixDrawing = true;
        this.error = this.context.error;
        this.Lot = {}
        this.data.mixItems = [];
        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }
        if (this.data.YarnType && this.data.YarnType.Id) {
            this.yarn = {};
            this.yarn.Id = this.data.YarnType.Id;
            this.yarn.Name = this.data.YarnType.Name;
            this.yarn.Code = this.data.YarnType.Code;
        }


        if (this.data.Lot) {
            this.Lot = this.data.Lot;
        }

    }

    mixDrawingColumns = {
        columns: [
            "Nomor Lot",
            "Jenis Material",
            "Komposisi(%)"
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            
            this.data.mixItems.push({});
        }.bind(this)
    };

    addItemCallback = (e) => {
        this.data.CottonCompositions = this.data.CottonCompositions || [];
        this.data.CottonCompositions.push({})
    };

    removeItemCallback(item, event) {
        this.data.CottonCompositions.splice(item.context.CottonCompositions.indexOf(CottonCompositions.data), 1);
    }

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
            this.detailOptions.UnitDepartmentId = this.unit.Id;
            if (oldValue) {
                this.machine = null;
                this.yarn = null;
            }
        }
        else {
            this.data.UnitDepartmentId = 0;
            this.unit = null;
            this.machine = null;
            this.yarn = null;
        }
    }

    yarnChanged(n, o) {
        if (this.yarn && this.yarn.Id) {
            this.data.YarnTypeIdentity = this.yarn.Id;
        } else {
            this.data.YarnTypeIdentity = null;
        }
    }
    get unitLoader() {
        return UnitLoader;
    }

    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }
} 