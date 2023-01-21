import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var StorageLoader = require('../../../../loader/storage-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    // @bindable buyerReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;
    // @bindable isNewStructure = true;

    @bindable title;

    // buyerFields = ["_id", "code", "name", "address", "type"];

    mediumControlOptions = {
        control: {
            length: 4
        }
    };

    smallControlOptions = {
        control: {
            length: 2
        }
    };

    detailColumns = ["Daftar Surat Perintah Produksi"]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.detailOptions = {};
        // console.log(this.data.Details)
        // this.selectedBuyer = this.data.Buyer || undefined;
        // this.selectedStorage = this.data.Storage || undefined;

        if (this.data.Buyer) {
            this.detailOptions.selectedBuyerName = this.data.Buyer.Name;
            this.detailOptions.selectedBuyerId = this.data.Buyer.Id;
        }

        if (this.data.Storage) {
            this.detailOptions.selectedStorageCode = this.data.Buyer.Code;
        }
    }

    @bindable detailOptions = {};
    @bindable selectedBuyer;
    buyerChanged(e) {
        // this.data.Buyer = newValue;
        // console.log(newValue && )
        if (this.data.Buyer) {
            this.detailOptions.selectedBuyerName = this.data.Buyer.Name;
            this.detailOptions.selectedBuyerId = this.data.Buyer.Id;
            this.data.Details = [];
            // if (!this.context.buyerReadOnly) {
            //     this.data.details = [];
            // }
        } else {
            console.log("here 1");
            this.data.Details = [];
            this.data.Buyer = undefined;
            this.detailOptions.selectedBuyerName = undefined;
            this.detailOptions.selectedBuyerId = undefined;
        }
    }

    @bindable selectedStorage;
    storageChanged(e) {
        // this.data.Storage = newValue;
        if (this.data.Storage) {
            this.detailOptions.selectedStorageCode = this.data.Storage.code;
            this.detailOptions.selectedStorageId = this.data.Storage._id;
            // this.data.Storage = newValue;
            this.data.Details = [];
            // if (!this.context.buyerReadOnly) {
            //     this.data.details = [];
            // }
        }
        else {
            console.log("here 2");
            this.data.Details = [];
            this.data.Storage = undefined;
            this.detailOptions.selectedStorageCode = "";
        }
    }

    get addDetails() {
        return (event) => {
            this.data.Details.push({});
            this.context.DetailsCollection.bind();
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`
    }

    get storageLoader() {
        return StorageLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    @computedFrom("data.Buyer", "data.Storage")
    get detailVisibility() {
        // console.log();
        return this.data.Buyer && this.data.Storage;
    }
} 