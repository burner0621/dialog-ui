import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var StorageLoader = require('../../../../loader/storage-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');
var DOSalesLoader = require('../../../../loader/do-sales-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;
    @bindable title;

    @bindable detailOptions = {};

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

        if (this.data.DOSales && this.data.DOSales.Id) {
            // this.selectedDOSales = await this.service.getDOSalesById(
            //     this.data.DOSales.Id
            // );
            this.selectedDOSales = this.data.DOSales;
        }
        if (this.data.Storage) {
            this.detailOptions.selectedStorageCode = this.data.Buyer.Code;
        }
    }

    @bindable selectedDOSales;
    async doSalesChanged(newValue, oldValue) {
        if (this.selectedDOSales && this.selectedDOSales.Id) {
            this.data.DOSales = {};
            this.data.DOSales.Id = this.selectedDOSales.Id;
            this.data.DOSales.DOSalesNo = this.selectedDOSales.DOSalesNo;

            var buyer = this.selectedDOSales.SalesContract.Buyer;
            if (buyer) {
                this.data.Buyer = {};
                this.selectedBuyer = await this.service.getBuyerById(buyer.Id);
                this.data.Buyer.Id = this.selectedBuyer.Id;
                this.data.Buyer.Name = this.selectedBuyer.Name;
                this.data.Buyer.Type = this.selectedBuyer.Type;
            } else {
                this.data.Buyer.Id = this.buyer.Id;
                this.data.Buyer.Name = this.buyer.Name;
                this.data.Buyer.Type = this.buyer.Type;
            }

            if (this.data.Buyer) {
                this.data.Details = [];
                this.detailOptions.selectedBuyerName = this.data.Buyer.Name;
                this.detailOptions.selectedBuyerId = this.data.Buyer.Id;
            } else {
                this.data.Details = [];
                this.detailOptions.selectedBuyerName = undefined;
                this.detailOptions.selectedBuyerId = undefined;
            }

        } else {
            this.data.DOSales.Id = null;
            this.data.DOSales.DOSalesNo = null;
            this.data.Buyer.Name = null;
            this.data.Buyer.Type = null;
        }
    }

    @bindable selectedStorage;
    storageChanged(e) {
        if (this.data.Storage) {
            this.detailOptions.selectedStorageCode = this.data.Storage.code;
            this.detailOptions.selectedStorageId = this.data.Storage._id;
            this.data.Details = [];
        }
        else {
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

    get doSalesLoader() {
        return DOSalesLoader;
    }

    @computedFrom("data.DOSales", "data.Storage")
    get detailVisibility() {
        return this.data.DOSales && this.data.Storage;
    }
}