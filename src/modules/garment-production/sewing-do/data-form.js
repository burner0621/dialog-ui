import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const ComodityLoader = require('../../../loader/garment-comodities-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCuttingIn;
    @bindable itemOptions = {};

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah",
            "Sisa",
            "Satuan",
            "Warna",
        ]
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                qty += item.Quantity;
            }
        }
        return qty;
    }
}