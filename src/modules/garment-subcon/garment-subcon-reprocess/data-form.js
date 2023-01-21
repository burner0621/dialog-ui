import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
const UomLoader = require("../../../loader/uom-loader");

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    @bindable selectedReprocessType;
    // @bindable error = {};
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };
    subconTypes=["SUBCON JASA KOMPONEN","SUBCON JASA GARMENT WASH"];
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
            "No Packing List",
            "RO",
            "No Artikel",
            "Buyer",
            "Komoditi",
            ""
        ]
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
            readOnly: this.readOnly,
            
        }
        this.selectedReprocessType=this.data.ReprocessType;
        
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                Type:this.data.ReprocessType
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.Details){
                    for(var detail of item.Details){
                        qty += detail.ReprocessQuantity;
                    }
                }
            }
        }
        return qty;
    }

    selectedReprocessTypeChanged(e){
        if(!this.data.Id){
            this.data.ReprocessType=e;
            this.data.Items.splice(0);
        }
    }
}