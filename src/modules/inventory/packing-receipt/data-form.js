import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, ServiceProduct } from './service';
var StorageLoader = require('../../../loader/storage-loader');
var PackingUnacceptedLoader = require('../../../loader/packing-unaccepted-loader');
var PackingLoader = require('../../../loader/packing-loader');

@inject(ServiceProduct, Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable packingReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable Packing;
    @bindable title;

    packingFilter = { DeliveryType: "BARU" };

    constructor(serviceProduct, service) {
        this.serviceProduct = serviceProduct;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    itemsColumns = [
        { header: "Nama Barang", value: "Product" },
        { header: "Kuantiti Diterima", value: "Quantity" },
        { header: "Kuantiti Saat Ini", value: "AvailableQuantity" },
        { header: "Berat", value: "Weight" },
        { header: "Berat Total", value: "WeightTotal" },
        { header: "Panjang", value: "Length" },
        { header: "Panjang Total", value: "LengthTotal" },
        { header: "Remark", value: "Remark" },
        { header: "Catatan", value: "Notes" }
    ]

    get packingLoader() {
        return PackingLoader;
    }

    get isSolid() {
        if (this.data.Packing) {
            if (this.data.Packing.OrderTypeName) {
                // console.log((this.data.Packing.OrderTypeName || "").toString().toLowerCase() === "solid")
                return (this.data.Packing.OrderTypeName || "").toString().toLowerCase() === "solid";
            }
        }
    }

    async PackingChanged(newValue) {

        if (newValue) {
            this.data.Packing = newValue;
            var _items = [];
            this.data.PackingId = this.data.Packing.Id;
            this.data.ProductionOrderNo = this.data.Packing.ProductionOrderNo;
            this.data.OrderType = this.data.Packing.OrderTypeName;
            this.data.ColorName = this.data.Packing.ColorName;
            this.data.ColorType = this.data.Packing.ColorType;
            this.data.Construction = this.data.Packing.Construction;
            this.data.MaterialWidthFinish = this.data.Packing.MaterialWidthFinish;
            this.data.PackingUom = this.data.Packing.PackingUom;
            this.data.Buyer = this.data.Packing.BuyerName;
            this.data.PackingCode = this.data.Packing.Code;
            this.data.DesignCode = this.data.Packing.DesignCode;
            this.data.DesignNumber = this.data.Packing.DesignNumber;
            // console.log(newValue);
            // this.data.Packing.PackingDetails.map((item) => {
            for (var item of this.data.Packing.PackingDetails) {
                var productName = this.data.Packing.ProductionOrderNo + "/" + this.data.Packing.ColorName + "/" + this.data.Packing.Construction + "/" + item.Lot + "/" + item.Grade + "/" + item.Length;

                if(item.Remark){
                    productName = productName + "/" + item.Remark;
                }

                var productQuery = {
                    productName: productName
                };

                var uomFilter = {
                    filter: JSON.stringify({ Unit: this.data.PackingUom })
                };

                var data = await this.serviceProduct.searchProductByName(productQuery);
                console.log(data);
                var product = data.data;
                var Uom = await this.serviceProduct.searchUom(uomFilter);
                var _item = {};
                _item.Uom = this.data.PackingUom;
                _item.UomId = Uom.data[0].Id;
                _item.ProductId = product.Id;
                _item.ProductCode = product.Code;
                _item.Product = product.Name;
                _item.Quantity = item.Quantity;
                _item.AvailableQuantity = item.AvailableQuantity ? item.AvailableQuantity : item.Quantity;
                _item.Length = item.Length;
                _item.Weight = item.Weight;
                _item.Remark = item.Remark;
                _item.Notes = item.Notes;
                _items.push(_item);
            }
            // })
            this.data.Items = _items;
        }
        else {
            this.data.Packing = {};
            this.data.PackingId = {};
            this.data.Items = [];
            this.data.StorageName = "";
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`
    }

    get storageLoader() {
        return StorageLoader;
    }

    // get packingFilter() {
    //     return packingFilter = { DeliveryType: "BARU" };
    // }
} 