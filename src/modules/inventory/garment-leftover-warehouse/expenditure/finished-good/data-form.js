import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');
const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');
const SalesNoteLoader = require('../../../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedSalesNote;
    @bindable selectedUnit;
    @bindable manual;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
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
        { header: "Komoditi", value: "LeftoverComodity" },
        { header: "Unit Asal", value: "UnitCode" },
        { header: "RO", value: "RONo" },
        { header: "Jumlah Stock", value: "StockQuantity" },
        { header: "Jumlah Keluar", value: "ExpenditureQuantity" },
    ]

    viewItemsColumns = [
        { header: "Komoditi", value: "LeftoverComodity" },
        { header: "Unit Asal", value: "UnitCode" },
        { header: "RO", value: "RONo" },
        { header: "Jumlah Keluar", value: "ExpenditureQuantity" },
    ]

    expenditureToOptions = ["UNIT","JUAL LOKAL", "LAIN-LAIN"];

    get buyerLoader() {
        return BuyerLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    // unitView = (data) => {
    //     return `${data.Code} - ${data.Name}`;
    // }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`;
    }

    get localSalesNoteLoader() {
        return SalesNoteLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true
        }
        if (this.data.Id) {
            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.ExpenditureQuantity
                };
            });
            this.Options.existingItems = this.existingItems;
            if(this.data.LocalSalesNoteId){
                this.selectedSalesNote = {
                    noteNo: this.data.LocalSalesNoteNo,
                    id:this.data.LocalSalesNoteId
                };
                // this.selectedUnit = {
                //     Code: this.data.UnitExpenditure.Code,
                //     Name: this.data.UnitExpenditure.Name
                // };
                this.manual=false;
            }
            else{
                this.manual=true;
            }

        }
    }

    // expenditureToOptionsChanged(){
    //     this.context.selectedUnitViewModel.editorValue = "";
    //     this.selectedUnit = null;
    //     this.context.selectedBuyerViewModel.editorValue = "";
    //     this.selectedBuyer = null;
    //     this.data.remarkEtc = null;
    // }

    selectedUnitChanged(newValue) {
        if (this.data.Id) return;

        this.data.UnitExpenditure = newValue;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
        };
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

    manualChanged(newValue){
        if(!this.data.Id){
            if(this.context.selectedSalesNote)
                this.context.selectedSalesNote.editorValue = "";
            this.selectedSalesNote=null;
            this.data.LocalSalesNoteNo= "";
            this.data.LocalSalesNoteId=0;
        }
    }
}