import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const InternalTransferOrderLoader = require('../../../../loader/internal-transfer-order-unused-loader');

var moment = require('moment');

@inject(Service)
export class ExternalTransferOrderItem {
    @bindable selectedInternalTransferOrder;
    @bindable selectedInternalTransferOrderFilter = {};

    columns = ["Product", "DefaultQuantity", "DefaultUom", "DealQuantity", "DealUom", "Convertion", "Grade", "ProductRemark"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        if (this.data.TRNo) {
            this.selectedInternalTransferOrder = {
                TRNo: this.data.TRNo,
                ITONo: this.data.ITONo
            };

            // this.isShowing = this.error && this.error.ExternalTransferOrderDetails && this.error.ExternalTransferOrderDetails.length > 0;
            this.isShowing = true;
        }

        this.selectedInternalTransferOrderFilter = this.options.filter;
        this.selectedInternalTransferOrderFilter.currentUsed = this.items.map(item => item.data.ITOId);
    }

    get internalTransferOrderLoader() {
        return InternalTransferOrderLoader;
    }
    selectedInternalTransferOrderView = (selectedInternalTransferOrder) => {
        return `${selectedInternalTransferOrder.TRNo}`;
    }
    selectedInternalTransferOrderChanged(newValue) {
        if (newValue) {
            this.service.getInternalTransferOrderById(newValue.Id)
                .then(result => {
                    this.data.ITOId = result.Id;
                    this.data.ITONo = result.ITONo;
                    this.data.TRId = result.TRId;
                    this.data.TRNo = result.TRNo;
                    this.data.Unit = result.Unit || {
                        _id: result.UnitId,
                        code: result.UnitCode,
                        name: result.UnitName
                    };

                    this.data.ExternalTransferOrderDetails = [];
                    for (var detail of result.InternalTransferOrderDetails) {
                        var externalTransferOrderDetail = {
                            ITODetailId: detail.Id,
                            TRDetailId: detail.TRDetailId,
                            Product: detail.Product || {
                                _id: detail.ProductId,
                                code: detail.ProductCode,
                                name: detail.ProductName
                            },
                            DefaultQuantity: detail.Quantity,
                            DefaultUom: detail.Uom || {
                                _id: detail.UomId,
                                unit: detail.UomUnit
                            },
                            DealQuantity: detail.Quantity,
                            DealUom: detail.Uom || {
                                _id: detail.UomId,
                                unit: detail.UomUnit
                            },
                            RemainingQuantity: detail.Quantity,
                            Convertion: 1,
                            Grade: detail.Grade || "-",
                            ProductRemark: detail.ProductRemark
                        };
                        this.data.ExternalTransferOrderDetails.push(externalTransferOrderDetail);
                    }

                    this.isShowing = true;
                    this.error = [];
                });
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

}