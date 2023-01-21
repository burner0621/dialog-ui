import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class ShipmentDetail {

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    sppFilter = {};
    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;
        // console.log(this.data);
        this.selectedProductionOrder = this.data.ProductionOrder || undefined;
        this.selectedBuyerName = this.context.options.selectedBuyerName;
        this.selectedBuyerId = this.context.options.selectedBuyerId;
        this.selectedStorageCode = this.context.options.selectedStorageCode;
        this.selectedStorageId = this.context.options.selectedStorageId;
        // console.log(this.selectedStorageId);
        // this.isNewStructure = this.context.options.isNewStructure;

        // console.log(this.context);
        this.sppFilter = { "BuyerId": this.selectedBuyerId };

        // if (this.data.productionOrderId) {
        //     this.selectedProductionOrder = await this.service.getProductionOrderById(this.data.productionOrderId)
        // }
    }

    controlOptions = {
        control: {
            length: 12
        }
    }

    // productionOrderFields = ["_id", "orderNo", "orderType.name", "designCode", "designNumber", "details.colorType"];
    // packingReceiptFields = ["_id", "code", "storageId", "storage.code", "storage.name", "referenceNo", "referenceType", "items.product", "items.availableQuantity"];
    // productFields = ["_id", "code", "name", "properties.designCode", "properties.designNumber", "properties.length", "properties.weight"];
    // summaryFields = ["_id", "uomId", "uom", "quantity"];

    itemColumns = ["Macam Barang", "Design", "Satuan", "Kuantiti Satuan", "Panjang Satuan", "Panjang Total", "Berat Satuan", "Berat Total"];
    newItemColumns = ["Daftar Packing Receipt"];

    @bindable selectedProductionOrder;
    async selectedProductionOrderChanged(newVal, oldVal) {
        // console.log(newVal);
        this.selectedProductionOrder = newVal;
        if (newVal) {
            // console.log(newVal);
            this.data.ProductionOrder = newVal;

            this.data.ProductionOrderColorType = newVal.Details && newVal.Details.length > 0 ? newVal.Details[0].Color : "";
            this.data.ProductionOrderDesignCode = newVal.DesignMotive ? newVal.DesignMotive.Code : "";
            this.data.ProductionOrderDesignNumber = newVal.DesignMotive ? newVal.DesignMotive.Name : "";
            this.data.ProductionOrderId = newVal.Id;
            this.data.ProductionOrderNo = newVal.OrderNo;
            this.data.ProductionOrderType = newVal.OrderType ? newVal.OrderType.Name : "";


            //get packing receipts by buyer and production order number where stock balance is greater than 0

            var packingReceiptFilter = {
                "ProductionOrderNo": newVal.OrderNo,
                "IsVoid": false
            }

            var info = { filter: JSON.stringify(packingReceiptFilter), size: Number.MAX_SAFE_INTEGER };
            var packingReceipts = await this.service.searchPackingReceipts(info);
            // console.log(packingReceipts);

            if (packingReceipts.length > 0) {

                var items = [];
                for (var packingReceipt of packingReceipts) {
                    var _item = {};
                    _item.PackingReceiptId = packingReceipt.Id;
                    _item.PackingReceiptCode = packingReceipt.Code;
                    _item.StorageId = packingReceipt.Storage.Id;
                    _item.StorageCode = packingReceipt.Storage.code;
                    _item.StorageName = packingReceipt.Storage.name;
                    _item.ReferenceNo = packingReceipt.ReferenceNo;
                    _item.ReferenceType = packingReceipt.ReferenceType;
                    _item.PackingReceiptItems = [];

                    //find products
                    var productPromises = packingReceipt.Items.map((packingReceiptItem) => this.service.getProductById(packingReceiptItem.ProductId));
                    var products = await Promise.all(productPromises);
                    // console.log(products)

                    var summaryPromises = packingReceipt.Items.map((packingReceiptItem) => this.service.getSummaryByParams(this.selectedStorageId, packingReceiptItem.ProductId, packingReceiptItem.UomId));
                    var summaries = await Promise.all(summaryPromises);

                    // var packingPromises = packingReceipt.Items.map((packingReceiptItem) => this.service.getPackingByProductName(packingReceiptItem.Product));
                    // var packings = await Promise.all(packingPromises);
                    // console.log(packings);
                    // console.log(productIds);
                    // var productFilter = {
                    //     "name": {
                    //         "$in": productNames
                    //     }
                    // }
                    // var productInfo = { filter: JSON.stringify(productFilter), select: this.productFields, size: 100 };

                    // cons
                    // console.log(products);

                    //find summaries
                    // var inventorySummariesFilter = {
                    //     // "$and": [
                    //     //     {
                    //     //         "productName": {
                    //     //             "$in": productNames
                    //     //         },
                    //     //     },
                    //     //     { "storageCode": this.selectedStorageCode }
                    //     // ]
                    // }
                    // var inventorySummariesInfo = { filter: JSON.stringify(inventorySummariesFilter), size: 100 };
                    // var inventorySummaries = await this.service.searchInventorySummaries(inventorySummariesInfo);

                    // console.log(packingReceipt);
                    // console.log(summaries);
                    // console.log(products);
                    for (var packingReceiptItem of packingReceipt.Items) {
                        var _packingReceiptItem = {};
                        var product = products.find((product) => packingReceiptItem.ProductId === product.Id);
                        var summary = summaries.find((summary) => summary.ProductId === packingReceiptItem.ProductId);
                        // var packing = packings.find((packing) => packing && packing.Name === packingReceiptItem.Product);

                        // console.log(summary);
                        // console.log(product);
                        // console.log(packingReceiptItem);



                        if (product && summary && summary.Quantity > 0) {
                            // console.log("A")
                            _packingReceiptItem.ProductId = product.Id;
                            _packingReceiptItem.ProductCode = product.Code;
                            _packingReceiptItem.ProductName = product.Name;
                            _packingReceiptItem.ColorType = packingReceipt.ColorName;
                            _packingReceiptItem.UomId = summary.UomId;
                            _packingReceiptItem.UomUnit = summary.UomUnit;
                            _packingReceiptItem.Quantity = summary.Quantity;
                            // if (packing) {
                            // console.log(packing)
                            _packingReceiptItem.Length = packingReceiptItem.Length;
                            _packingReceiptItem.Weight = packingReceiptItem.Weight;
                            _packingReceiptItem.DesignCode = packingReceipt.DesignCode;
                            _packingReceiptItem.DesignNumber = packingReceipt.DesignNumber;
                            // }


                            _item.PackingReceiptItems.push(_packingReceiptItem);
                        }
                    }

                    if (_item.PackingReceiptItems.length > 0) {
                        items.push(_item);
                    }
                    // console.log("B")

                }
                // console.log("C")
                this.data.Items = items;
            } else {
                this.data.Items = [];
            }
        } else {
            this.data.ProductionOrderColorType = undefined;
            this.data.ProductionOrderDesignCode = undefined;
            this.data.ProductionOrderDesignNumber = undefined;
            this.data.ProductionOrderId = undefined;
            this.data.ProductionOrderNo = undefined;
            this.data.ProductionOrderType = undefined;
            this.data.Items = [];
        }
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    removeItems() {
        this.bind();
    }
}