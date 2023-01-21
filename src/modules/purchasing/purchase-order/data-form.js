import {inject, bindable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/category-loader');
var PurchaseRequestPostedLoader = require('../../../loader/purchase-request-posted-loader');
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable prReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable purchaseRequest;

    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    itemsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "defaultQuantity" },
        { header: "Satuan", value: "defaultUom" },
        { header: "Keterangan", value: "remark" }
    ]

    get purchaseRequestPostedLoader() {
        return PurchaseRequestPostedLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    purchaseRequestChanged(newValue) {
        
        this.data.purchaseRequest = newValue;
        if (this.data.purchaseRequest) {
            var _items = [];
            this.data.PRNo = this.data.purchaseRequest.no;
            this.data.PRId = this.data.purchaseRequest._id;
            this.data.PRDate = this.data.purchaseRequest.date;
            this.data.category = this.data.purchaseRequest.category;
            this.data.budget = this.data.purchaseRequest.budget;
            this.data.unit = this.data.purchaseRequest.unit;
            this.data.division = this.data.purchaseRequest.unit.division;
            this.data.expectedDeliveryDate = this.data.purchaseRequest.expectedDeliveryDate;
            this.data.purchaseRequest.unit.toString = function () {
                return [this.division.name, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }

            this.data.purchaseRequest.category.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.remark = this.data.purchaseRequest.remark;
            this.data.purchaseRequest.items.map((item) => {
                var _item = {};
                _item.product = item.product;
                _item.defaultUom = item.product.uom;
                _item.quantity = item.quantity;
                _item.productRemark = item.remark;
                _item.PRItemId = item._id;
                _items.push(_item);
            })
            this.data.items = _items;

            this.data.items.forEach(item => {
                item.product.toString = function () {
                    return [this.code, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
            })
        }
        else {
            this.data.purchaseRequest = {};
            this.data.purchaseRequestId = {};
            this.data.remark = "";
            this.data.items = [];
        }
    }

} 