import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const TransferDeliveryOrderLoader = require('../../../../loader/transfer-delivery-order-unused-loader');

var moment = require('moment');

@inject(Service)
export class TransferShippingOrderItem {
    @bindable selectedTransferDeliveryOrder;
    @bindable selectedTransferDeliveryOrderFilter = {};

    columns = ["No TR", "Nama Barang", "Jumlah Diminta (DO)", "Jumlah Kirim", "Satuan", "Grade", "Keterangan"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.isEdit = this.options.isEdit;


        if (this.data.DONo) {
            this.selectedTransferDeliveryOrder = {
                DONo: this.data.DONo,
            };
            this.isShowing = true;
        }

        if (!this.readOnly) {
            this.columns.push("");

            this.selectedTransferDeliveryOrderFilter = this.options.filter;
            this.selectedTransferDeliveryOrderFilter.IsPosted = true;
            if (!this.isEdit) {
                this.selectedTransferDeliveryOrderFilter.currentUsed = this.items.map(item => item.data.DOId);
            }

            this.allDODetailIds = [];
            for (let item of this.items) {
                if (item.data.TransferShippingOrderDetails) {
                    for (let detail of item.data.TransferShippingOrderDetails) {
                        this.allDODetailIds.push(detail.DODetailId);
                    }
                }
            }
        }
    }

    get transferDeliveryOrderLoader() {
        return TransferDeliveryOrderLoader;
    }

    selectedTransferDeliveryOrderChanged(newValue, oldValue) {
        if (newValue) {
            this.service.getTransferDeliveryOrderById(newValue.Id)
                .then(result => {
                    this.data.DOId = result.Id;
                    this.data.DONo = result.DONo;

                    this.data.TransferShippingOrderDetails = [];
                    for (var item of result.items) {
                        for (var detail of item.details) {
                            if (this.allDODetailIds.indexOf(detail.Id) < 0) {
                                var transferShippingOrderDetail = {
                                    DODetailId: detail.Id,
                                    ETODetailId: detail.ETODetailId,
                                    ITODetailId: detail.ITODetailId,
                                    TRDetailId: detail.TRDetailId,
                                    TRNo: detail.TRNo,
                                    Product: detail.Product || {
                                        _id: detail.ProductId,
                                        code: detail.ProductCode,
                                        name: detail.ProductName
                                    },
                                    Uom: detail.Uom || {
                                        _id: detail.UomId,
                                        unit: detail.UomUnit
                                    },
                                    Grade: detail.Grade,
                                    DOQuantity: detail.DOQuantity,
                                    DeliveryQuantity: detail.RemainingQuantity,
                                    ReceiptQuantity: 0,
                                    RemainingQuantity: detail.RemainingQuantity,
                                    ProductRemark: detail.ProductRemark
                                };
                                this.data.TransferShippingOrderDetails.push(transferShippingOrderDetail);
                            }
                        }
                    }

                    this.isShowing = true;
                    this.error = [];
                });

            if (oldValue && newValue._id !== oldValue._id) {
                delete this.data.DOId;
                delete this.data.DONo;

                this.data.TransferShippingOrderDetails = [];
                this.isShowing = false;
                this.error = [];
            }
        }
        else if (oldValue) {
            delete this.data.DOId;
            delete this.data.DONo;

            this.data.TransferShippingOrderDetails = [];
            this.isShowing = false;
            this.error = [];
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

}