import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';
import { DataForm } from '../data-form';
// var ProductionOrderLoader = require('../../../../../loader/production-order-loader');
// var ProductionOrderLoader = require('../../../../loader/output-packaging-inputspp-loader');
var ProductionOrderLoader = require('../../../../loader/output-packaging-inputspp-group-loader');

@inject(Service, BindingEngine, BindingSignaler, DataForm)
export class ItemSPP {

    constructor(service, bindingSignaler, bindingEngine, dataForm) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.dataForm = dataForm;
    }

    sppFilter = {};
    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;

        this.selectedProductionOrder = this.data.ProductionOrder || undefined;
        this.selectedBuyerName = this.context.options.selectedBuyerName;
        this.selectedBuyerId = this.context.options.selectedBuyerId;
        this.selectedStorageCode = this.context.options.selectedStorageCode;
        this.selectedStorageId = this.context.options.selectedStorageId;
        // this.productionOrderListItem = this.dataForm.selectedPackaging.packagingProductionOrders;

        // this.isNewStructure = this.context.options.isNewStructure;


        this.sppFilter = { "BuyerId": this.selectedBuyerId };

        // if (this.data.productionOrderId) {
        //     this.selectedProductionOrder = await this.service.getProductionOrderById(this.data.productionOrderId)
        // }
        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.OrderQuantity = this.data.balance;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Id = this.data.buyerId;
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;
            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;
            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;
            this.selectedProductionOrder.DesignCode = this.data.motif;
            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.unit;
            this.selectedProductionOrder.OrderQuantity = this.data.balance;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.PackagingQty = this.data.packagingQTY;
            this.selectedProductionOrder.PackagingUnit = this.data.packagingUnit;
            this.selectedProductionOrder.PackagingType = this.data.packagingType;
            this.selectedProductionOrder.grade = this.data.grade;
            this.selectedProductionOrder.qtyOut = this.data.qtyOut;
            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }

            // this.data.PackagingList = this.data.PackagingList || [];

            // this.data.PackagingList.push(this.selectedProductionOrder);

        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    }

    itemColumns = ["Buyer", "Qty Order", "Unit", "Material", "Warna", "Motif", "Jenis", "Grade", "Qty Packaging", "Packaging", "Satuan", "Saldo", "Panjang Per Packing", "QTY Keluar", "Keterangan"];

    removeItems() {
        this.bind();
    }

    addItemPackaging = (e) => {

        this.data.PackagingList = this.data.PackagingList || [];
        this.data.PackagingList.push({
            productionOrderNo: this.selectedProductionOrder.productionOrderNo,
            productionOrder: this.selectedProductionOrder.productionOrder,
            balance: this.selectedProductionOrder.balance,
            balanceRemains: this.selectedProductionOrder.balanceRemains,
            dyeingPrintingAreaInputProductionOrderId: this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId,
            buyerId: this.selectedProductionOrder.buyerId,
            buyer: this.selectedProductionOrder.buyer,
            color: this.selectedProductionOrder.color,
            construction: this.selectedProductionOrder.construction,
            grade: this.selectedProductionOrder.grade,
            keterangan: this.selectedProductionOrder.keterangan,
            motif: this.selectedProductionOrder.motif,
            packagingQTY: this.selectedProductionOrder.packagingQTY,
            packagingType: this.selectedProductionOrder.packagingType,
            packagingUnit: this.selectedProductionOrder.packagingUnit,
            packingInstruction: this.selectedProductionOrder.packingInstruction,
            qtyOrder: this.selectedProductionOrder.qtyOrder,
            qtyOut: this.selectedProductionOrder.qtyOut,
            unit: this.selectedProductionOrder.unit,
            uomUnit: this.selectedProductionOrder.uomUnit,
            cartNo: this.selectedProductionOrder.cartNo,
            remark: this.selectedProductionOrder.remark,
            status: this.selectedProductionOrder.status,
            material: this.selectedProductionOrder.material,
            id: this.selectedProductionOrder.id
        });
    };

    get productionOrderList() {
        // return (keyword) => {
        //     return Promise.resolve().then(result => { return this.productionOrderListItem; });
        // }
        return ProductionOrderLoader;
    }
    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.id;
            this.data.productionOrder.no = this.selectedProductionOrder.productionOrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
            this.data.balance = this.selectedProductionOrder.balance;
            this.data.balanceRemains = this.selectedProductionOrder.balanceRemains;
            this.data.dyeingPrintingAreaInputProductionOrderId = this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId;
            this.data.qtyOrder = this.selectedProductionOrder.qtyOrder;
            if (this.selectedProductionOrder.construction) {
                this.data.construction = this.selectedProductionOrder.construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.material = this.data.construction;
            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.grade = this.selectedProductionOrder.grade;
            this.data.qtyOut = this.selectedProductionOrder.qtyOut;
            this.data.packagingQTY = this.selectedProductionOrder.packagingQTY;
            // this.data.bonNoInput = this.selectedProductionOrder.bonNo;
            if (this.selectedProductionOrder.productionOrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
        else {
            this.data.productionOrder = {};
        }
    }
}