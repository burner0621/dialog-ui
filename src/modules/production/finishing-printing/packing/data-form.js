import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service, ServiceSales, ServiceCore } from "./service";

var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');
var BuyersLoader = require("../../../../loader/buyers-loader");
var MaterialConstructionLoader = require("../../../../loader/material-loader");

@containerless()
@inject(Service, ServiceSales, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    // @bindable items;

    constructor(service, serviceSales, serviceCore, bindingSignaler, bindingEngine) {
        this.service = service;
        this.serviceSales = serviceSales;
        this.serviceCore = serviceCore;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() !== '';
    }

    get isSolid() {
        return (this.data.OrderTypeName || "").toString().toLowerCase() === "solid";
    }

    async bind(context) {
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        this.error = this.context.error;

        var productionOrderId = this.data.ProductionOrderId;
        // var productionOrderId = "58c8f8287b915900364dd2b0";
        if (productionOrderId) {
            this.selectedProductionOrder = await this.serviceSales.getProductionOrderById(productionOrderId, this.productionOrderFields);
        }

        var buyerId = this.data.BuyerId;
        if (buyerId) {
            this.selectedBuyer = await this.serviceCore.getBuyerById(buyerId, this.buyerFields);
        }else{
            this.selectedBuyer = { "Id": this.data.BuyerId,
                                   "Code": this.data.BuyerCode,
                                   "Name": this.data.BuyerName,
                                   "Address": this.data.BuyerAddress,
                                   "Type": this.data.BuyerType };
        }

        var materialConstructionId = this.data.MaterialConstructionFinishId;
        if (materialConstructionId) {
            this.selectedMaterialConstructionFinish = await this.serviceCore.getMaterialConstructionById(materialConstructionId, this.materialConstructionFields);
        }
    }

    errorChanged() {
        console.log(this.error)
    }

    packingDetailsInfo = { 
        columns: ["Lot", "Grade", "Kuantitas", "Berat Satuan", "Berat Total", "Panjang Satuan", "Panjang Total", "Remark"],
        onAdd: function () {
            this.context.PackingDetailsCollection.bind();
            this.data.PackingDetails = this.data.PackingDetails || [];
            this.data.PackingDetails.push({});
        }.bind(this),
        onRemove: function () {
            this.context.PackingDetailsCollection.bind();
        }.bind(this) };
    packingUomOptions = ["", "ROLL", "PCS", "POT", "SETS", "SLP", "BDL", "KRG", "LBR"];
    deliveryTypeOptions = ["", "ULANGAN", "BARU"];
    finishedProductTypeOptions = ["", "WHITE", "DYEING", "BATIK", "TEKSTIL"];

    @bindable selectedProductionOrder;
    async selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.ProductionOrderId = this.selectedProductionOrder.Id;
            this.data.ProductionOrderNo = this.selectedProductionOrder.OrderNo;
            this.data.OrderTypeId = this.selectedProductionOrder.OrderType.Id;
            this.data.OrderTypeCode = this.selectedProductionOrder.OrderType.Code;
            this.data.OrderTypeName = this.selectedProductionOrder.OrderType.Name;
            this.data.SalesContractNo = this.selectedProductionOrder.FinishingPrintingSalesContract.SalesContractNo || "";
            this.data.DesignNumber = (this.data.OrderTypeName || "").toString().toLowerCase() === "printing" ? this.selectedProductionOrder.DesignNumber : null;
            this.data.DesignCode = (this.data.OrderTypeName || "").toString().toLowerCase() === "printing" ? this.selectedProductionOrder.DesignCode : null;

            var color = this.selectedProductionOrder.Details && this.selectedProductionOrder.Details.length > 0 ? this.selectedProductionOrder.Details[0] : {};
            var material = this.selectedProductionOrder.Material && this.selectedProductionOrder.Material.Name ? this.selectedProductionOrder.Material : "";
            // console.log(this.selectedProductionOrder);//"selectedProductionOrderChanged")
            this.data.ColorCode = color.Code;
            this.data.ColorName = color.ColorRequest;
            this.data.ColorType = color.ColorType && color.ColorType.Name ? color.ColorType.Name : null;

            this.data.MaterialId = material.Id;
            this.data.Material = material.Name;

            if (!this.context.hasEdit) {
                if(this.selectedProductionOrder.Buyer.Id){
                    this.selectedBuyer = await this.serviceCore.getBuyerById(this.selectedProductionOrder.Buyer.Id);
                    this.data.BuyerId = this.selectedBuyer.Id
                    this.data.BuyerCode = this.selectedBuyer.Code
                    this.data.BuyerName = this.selectedBuyer.Name
                    this.data.BuyerAddress = this.selectedBuyer.Address
                    this.data.BuyerType = this.selectedBuyer.Type
                }else{
                    this.selectedBuyer = this.selectedProductionOrder.Buyer;
                    this.data.BuyerId = this.selectedProductionOrder.Buyer.Id;
                    this.data.BuyerCode = this.selectedProductionOrder.Buyer.Code;
                    this.data.BuyerName = this.selectedProductionOrder.Buyer.Name;
                    this.data.BuyerAddress = this.selectedProductionOrder.Buyer.Address;
                    this.data.BuyerType = this.selectedProductionOrder.Buyer.Type;
                }
                this.data.MaterialWidthFinish = this.selectedProductionOrder.FinishWidth;
            }
        }
        else {
            this.data.ProductionOrderId = null;
            this.data.ProductionOrderNo = null;
            this.data.SalesContractNo = null;
            this.data.ColorCode = null;
            this.data.ColorName = null;
            this.data.ColorType = null;
            this.data.OrderTypeId = null;
            this.data.OrderTypeName = null;
            this.data.OrderTypeCode = null;
            this.data.DesignNumber = null;
            this.data.DesignCode = null;
        }
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        }
        else
            return true;
    }

    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        if (this.selectedBuyer && this.selectedBuyer.Id) {
            // console.log(this.selectedBuyer); //Buyer Changed
            this.data.BuyerId = this.selectedBuyer.Id;
            this.data.BuyerCode = this.selectedBuyer.Code;
            this.data.BuyerName = this.selectedBuyer.Name;
            this.data.BuyerAddress = this.selectedBuyer.Address;
            this.data.BuyerType = this.selectedBuyer.Type;
        }
        else {
            this.data.BuyerId = null;
            this.data.BuyerCode = null;
            this.data.BuyerName = null;
            this.data.BuyerAddress = null;
            this.data.BuyerType = null;
        }
    }

    @bindable selectedMaterialConstructionFinish
    selectedMaterialConstructionFinishChanged(newValue, oldValue) {
        if (this.selectedMaterialConstructionFinish && this.selectedMaterialConstructionFinish.Id) {
            // console.log(this.selectedMaterialConstructionFinish); //Material Changed)
            this.data.MaterialConstructionFinishId = this.selectedMaterialConstructionFinish.Id;
            this.data.MaterialConstructionFinishName = this.selectedMaterialConstructionFinish.Name;
        }
        else {
            this.data.MaterialConstructionFinishId = null;
            this.data.MaterialConstructionFinishName = null;
        }
    }

    productionOrderTextFormatter = (productionOrder) => {
        return `${productionOrder.OrderNo}`
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
    get buyersLoader() {
        return BuyersLoader;
    }
    get materialConstructionFinishLoader() {
        return MaterialConstructionLoader;
    }

    console() {
        console.log(this.data);
    }
    widthChanged(e) {
        console.log(this.data.MaterialWidthFinish);
    }
} 