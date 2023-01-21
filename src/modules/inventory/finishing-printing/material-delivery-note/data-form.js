import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const SalesInvoiceLoader = require('./../../../../loader/sales-invoice-loader');
const BuyerLoader = require('./../../../../loader/buyers-loader');
const UnitLoader = require('./../../../../loader/unit-loader');
const StorageLoader = require('./../../../../loader/storage-loader');
const DOSalesLoader = require("./../../../../loader/do-sales-loader");
const SalesContractSpinningLoader = require("./../../../../loader/spinning-sales-contract-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    // @bindable error;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    detailOptions = {};

    BonCode = ["", "FSSA", "FSSB", "JESA", "JESB", "JLSA", "JLSB", "JLSC", "WBSA", "WBSB", "WBSC", "WCSA", "WCSB", "WCSC",];

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

        this.filter = { "DOSalesCategory": "SPINNING" };
        // this.detailOptions.SalesContractNo = this.selectedSalesContract.SalesContractNo;

        if (this.data.buyer && this.data.buyer.id) {
            this.selectedBuyer = this.data.buyer;
        }

        if (this.data.unit && this.data.unit.id) {
            this.selectedUnit = this.data.unit;
        }

        if (this.data.storage && this.data.storage.code) {
            this.selectedStorage = this.data.storage;
        }

        if (this.data.salesContract && this.data.salesContract.salesContractNo) {
            this.selectedSalesContract = this.data.salesContract;
        }
    }

    columns = [
        { header: "No SOP", value: "NoSOP" },
        { header: "Nama Barang", value: "MaterialName" },
        { header: "Lot", value: "InputLot" },
        { header: "Bruto", value: "WeightBruto" },
        { header: "DOS", value: "WeightDOS" },
        { header: "Cone", value: "WeightCone" },
        { header: "BALE", value: "WeightBale" },
        { header: "KG", value: "getTotal" }
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
    selectedUnitChanged(newValue, oldValue) {
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
    selectedStorageChanged(newValue, oldValue) {
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

    @bindable selectedSalesContract;
    selectedSalesContractChanged(newValue, oldValue) {
        // console.log(this.selectedSalesContract);
        if (this.selectedSalesContract && this.selectedSalesContract.Id) {
            this.data.salesContract = {};
            // this.data.SalesContract = this.selectedSalesContract;
            this.data.salesContract.SalesContractNo = this.selectedSalesContract.SalesContractNo;
            this.data.salesContract.SalesContractId = this.selectedSalesContract.Id;
        }
        else{
            this.data.salesContract.SalesContractNo = null;
            this.data.salesContract.SalesContractId = null;
        }

        // this.data.SalesContract = {};
        // this.data.SalesContract = this.selectedSalesContract;
        // this.data.Material = this.selectedSalesContract.Material;
        // this.data.MaterialConstruction = this.selectedSalesContract.MaterialConstruction;
        // this.data.MaterialWidth = this.selectedSalesContract.MaterialWidth;

        this.detailOptions.SalesContractNo = this.selectedSalesContract.SalesContractNo;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
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
        // console.log(deliveryOrder);
        if (deliveryOrder.DOSalesNo == null) {
            return `${deliveryOrder.doSalesNo}`;
        }
        else {
            return `${deliveryOrder.DOSalesNo}`;
        }

    };

    buyerView = (buyer) => {

        if (buyer.Code == null) {
            return `${buyer.code} / ${buyer.name}`
        }
        else {
            return `${buyer.Code} / ${buyer.Name}`
        }

    }

    unitView = (unit) => {
        if (unit.Name == null) {
            return `${unit.name}`
        } else {
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

    salesContractNoView(salesContract) {
        // return sc.SalesContractNo;
        if(salesContract.SalesContractNo == null) {
            return salesContract.salesContractNo;
        }
        else{
            return salesContract.SalesContractNo;
        }
        
    }

    get SalesContractSpinningLoader() {
        return SalesContractSpinningLoader;
    }
}
