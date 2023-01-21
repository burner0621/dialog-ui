import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentPurchasingService } from "./service";

// const UnitLoader = require('../../../../../loader/garment-units-loader');
const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');
const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');
const SalesNoteLoader = require('../../../../../loader/garment-shipping-local-sales-note-loader');

@inject(GarmentPurchasingService)
export class DataForm {

    constructor(garmentPurchasingService) {
        this.garmentPurchasingService = garmentPurchasingService;
    }

    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedUnit;
    @bindable selectedBuyer;
    @bindable selectedSalesNote;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    @computedFrom("readOnly")
    get items() {
        return {
            columns: this.readOnly ? [
                "Unit Asal",
                "Kode Barang",
                "Nama Barang",
                "PO No",
                "Satuan",
                "Jumlah Keluar"
            ] : [
                "Unit Asal",
                "Kode Barang",
                "Nama Barang",
                "PO No",
                "Satuan",
                "Jumlah Stock",
                "Jumlah Keluar"
            ],
            onAdd: function () {
                this.data.Items.push({});
            }.bind(this),
            options: {
                isEdit: this.isEdit,
                existingItems: this.existingItems
            }
        };
    };

    expenditureDestinations = [
        "UNIT",
        "JUAL LOKAL",
        "SAMPLE",
        "LAIN-LAIN"
    ];

    get unitLoader() {
        return UnitLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    unitView = (data) => {
        return `${data.Code} - ${data.Name}`;
    }

    buyerView = (data) => {
        return `${data.Code} - ${data.Name}`;
    }

    get localSalesNoteLoader() {
        return SalesNoteLoader;
    }


    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnit = {
                Code: this.data.UnitExpenditure.Code,
                Name: this.data.UnitExpenditure.Name
            };

            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.Quantity
                };
            });

            this.selectedBuyer = {
                Id: this.data.Buyer.Id,
                Code: this.data.Buyer.Code,
                Name: this.data.Buyer.Name
            };

            this.selectedSalesNote = {
                noteNo: this.data.LocalSalesNoteNo
            };


        }

        // if (this.readOnly) {
        //     this.items.columns = [
        //         "Unit",
        //         "PO No",
        //         "Jumlah Keluar",
        //         "Satuan"
        //     ];
        // }
    }

    expenditureDestinationsChanged() {
        this.context.selectedUnitViewModel.editorValue = "";
        this.selectedUnit = null;
        this.context.selectedBuyerViewModel.editorValue = "";
        this.selectedBuyer = null;
        this.data.RemarkEtc = null;
    }

    selectedUnitChanged(newValue) {
        if (this.data.Id) return;

        this.data.UnitExpenditure = newValue;
    }

    selectedBuyerChanged(newValue) {
        if (this.data.Id) return;

        this.data.Buyer = newValue;
    }

    selectedSalesNoteChanged(newValue) {
        if (this.data.Id) return;

        this.data.LocalSalesNoteNo = null;
        this.data.LocalSalesNoteId = 0;
        if (newValue) {
            this.data.LocalSalesNoteNo = newValue.noteNo;
            this.data.LocalSalesNoteId = newValue.id;
        }
    }

    manualChanged(newValue) {
        if (!this.readOnly) {
            if (this.context.selectedSalesNoteViewModel)
                this.context.selectedSalesNoteViewModel.editorValue = "";
            this.selectedSalesNote = null;
            this.data.LocalSalesNoteNo = null;
        }
    }
}
