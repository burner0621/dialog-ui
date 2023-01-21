import { inject, bindable } from 'aurelia-framework';
import { Service } from './service';
var BuyerLoader = require('../../../../loader/buyers-loader');
var StorageLoader = require('../../../../loader/storage-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable title;
    @bindable selectedStorage;
    destinationItems = ["", "Pack I", "Pack II"];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        control: {
            length: 4
        }
    };
    detailColumns = [{ header: "Nomor Surat Perintah Produksi", value: "ProductionOrder" }]

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.options = this.context.options;
        // console.log(this.options);
        // console.log(this.context.data);
        // if (this.data && this.data.buyer) {
        //     this.buyer = this.data.buyer
        //     // this.data.details = this.context.data.details;
        // }
        // if (this.data && this.data._id && this.data.storageId) {
        //     this.selectedStorage = await this.service.getStorageById(this.data.storageId);
        // }
    }

    filter = {};
    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        // var selectedData = newValue;
        if (newValue) {
            this.data.Buyer = newValue;
            this.filter = {
                buyerId: newValue.Id
            }
        } else {
            this.data.Buyer = undefined;
            this.filter = {};
        }
    }

    selectedStorageChanged(newValue) {
        if (newValue) {
            this.data.Storage = newValue;
        }
        else {
            this.data.Storage = undefined;
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`;
    }

    get storageLoader() {
        return StorageLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    // get getFilter() {
    //     this.filter = {};
    //     if (this.data && this.data.buyerId) {
    //         this.filter = {
    //             "buyer": this.data.buyerId
    //         }
    //     }
    //     return this.filter;
    // }

    get addDetails() {
        return (event) => {
            this.data.Details.push({});
        }
    }

    get hasBuyer() {
        return this.data && this.data.Buyer && this.data.Buyer.Id && this.data.Buyer.Id > 0;
    }


}