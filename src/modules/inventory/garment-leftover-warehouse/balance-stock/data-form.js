import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import moment from "moment";

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedTypeOfGoods;


    constructor(service) {
        this.service = service;
    }

    
    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };


    typeOfGoodsOptions=["FABRIC", "ACCESSORIES", "BARANG JADI"];

    itemsColumnsFabric = [
        { header: "Unit Asal", value: "Unit" },
        { header: "PO No", value: "PONo" },
        { header: "Kode Barang", value: "ProductCode" },
        { header: "Komposisi", value: "Composition" },
        { header: "Konstruksi", value: "Construction" },
        { header: "Yarn", value: "Yarn" },
        { header: "Width", value: "Width" },
        { header: "Jumlah Stock", value: "Quantity" },
        { header: "Satuan", value: "Uom" }
    ];

    itemsColumnsAcc = [
        { header: "Unit Asal", value: "Unit" },
        { header: "PO No", value: "PONo" },
        { header: "Kode Barang", value: "ProductCode" },
        { header: "Nama Barang", value: "ProductName" },
        { header: "Keterangan", value: "ProductRemark" },
        { header: "Jumlah Stock", value: "Quantity" },
        { header: "Satuan", value: "Uom" }
    ];

    itemsColumnsFinishedGood = [
        { header: "Unit Asal", value: "Unit" },
        { header: "RO No", value: "RONo" },
        { header: "Komoditi", value: "LeftoverComodity" },
        { header: "Jumlah Stock", value: "Quantity" },
        { header: "Satuan", value: "Uom" }
    ];



    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        if(this.data.BalanceStockDate == null) {
            this.data.BalanceStockDate = new Date("2018 Dec 31");
        }
        if(this.data.Id) {
            this.selectedTypeOfGoods = this.data.TypeOfGoods;
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
     };
    }

    selectedTypeOfGoodsChanged(newValue, oldValue) {
        this.data.TypeOfGoods = null;
        
        if (newValue) {
            this.data.TypeOfGoods = newValue;
        }
        if(!this.data.Id) {
            this.data.Items.splice(0);
        }

    }



}
