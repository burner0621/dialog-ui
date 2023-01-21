import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const SalesInvoiceLoader = require('./../../../../loader/sales-invoice-loader');
const BuyerLoader = require('./../../../../loader/buyers-loader');
const UnitLoader = require('./../../../../loader/unit-loader');
const StorageLoader = require('./../../../../loader/storage-loader');
const DOSalesLoader = require("./../../../../loader/do-sales-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable unit;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }

    }

    itemOptions = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    NumberBonOut = ["", "GRPG", "JLPG", "JLPA", "JLOG", "JLOA", "JLCC", "KLB",];

    UnitLength = ["", "YDS", "MTR",];

    UnitPacking = ["", "PCS", "BALE",];

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.hasPosting = this.context.hasPosting;

        this.filter = { "DOSalesCategory": "WEAVING" };

        if (this.data.buyer && this.data.buyer.id) {
            this.selectedBuyer = this.data.buyer;
        }

        if (this.data.unit && this.data.unit.id) {
            this.selectedUnit = this.data.unit;
        }

        if (this.data.storage && this.data.storage.code) {
            this.selectedStorage = this.data.storage;
        }
        
    }

    columns = [
        { header: "No. SOP", value: "ItemNoSOP" },
        { header: "Nama Barang", value: "ItemMaterialName" },
        { header: "Grade", value: "ItemDesign" },
        { header: "Jenis", value: "ItemType" },
        { header: "Kode", value: "ItemCode" },
        { header: "Bale", value: "InputBale" },
        { header: "Piece", value: "InputPiece" },
        { header: "Meter", value: "InputMeter" },
        { header: "Kg", value: "InputKg" }
    ];

    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        if (this.selectedBuyer && this.selectedBuyer.Id) {
            this.data.buyer = {};
            this.data.buyer.id = this.selectedBuyer.Id;
            this.data.buyer.name = this.selectedBuyer.Name;
            this.data.buyer.code = this.selectedBuyer.Code;
        }
        else {
            this.data.buyer.id = this.selectedBuyer.id;
            this.data.buyer.name = this.selectedBuyer.name;
            this.data.buyer.code = this.selectedBuyer.code;
        }
    }

    @bindable selectedUnit;
    selectedUnitChanged(newValue, oldValue){
        if (this.selectedUnit && this.selectedUnit.Id) {
            this.data.unit = {};
            this.data.unit.id = this.selectedUnit.Id;
            this.data.unit.name = this.selectedUnit.Name;
        }
        else {
            this.data.unit.id = this.selectedUnit.id;
            this.data.unit.name = this.selectedUnit.name;
        }
    }

    @bindable selectedStorage;
    selectedStorageChanged(newValue, oldValue){
        if (this.selectedStorage && this.selectedStorage.code) {
            this.data.storage = {};
            this.data.storage.code = this.selectedStorage.code;
            this.data.storage.id = this.selectedStorage._id;
            this.data.storage.name = this.selectedStorage.name;
            //this.data.storage.unit.name = this.selectedStorage.unit;
        }
        else {
            this.data.storage.code = null;
            this.data.storage.id = null;
            this.data.storage.name = null;
            //this.data.storage.unit.name = null;
        }
    }

    get addItems() {
        return (event) => {
            this.data.itemsMaterialDeliveryNoteWeaving.push({})
        };
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        } else return true;
    }


    get salesInvoiceLoader() {
        return SalesInvoiceLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get doSalesLoader() {
        return DOSalesLoader;
    }

    doTextFormatter = (deliveryOrder) => {
        if (deliveryOrder.DOSalesNo == null){
            return `${deliveryOrder.doSalesNo}`;    
        }
        else{
            return `${deliveryOrder.DOSalesNo}`;
        }
        
    };

    buyerView = (buyer) => {
        
        if(buyer.Code == null)
        {
            return `${buyer.code} / ${buyer.name}`    
        }
        else{
            return `${buyer.Code} / ${buyer.Name}`
        }
        
    }

    unitView = (unit) => {
        if(unit.Name == null){
            return `${unit.name}`    
        }else{
            return `${unit.Name}`
        }
        
    }

    get unitLoader() {
        return UnitLoader;
    }

    storageView = (storage) => {
        return `${storage.name}`
        //${storage.unit.name} -

    }

    get storageLoader() {

        return StorageLoader;

    }
}
