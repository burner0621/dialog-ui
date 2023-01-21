import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import { AuthService } from "aurelia-authentication";
var UnitDeliveryOrderLoader = require('../../../loader/garment-unit-delivery-order-for-unit-expenditure-note-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingEngine,AuthService)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable options = { };
    @bindable unitDeliveryOrder;
    @bindable expenditureType;

    expenditureTypeOptions = ['SAMPLE', 'TRANSFER', 'EXTERNAL','SISA', 'SUBCON','LAIN-LAIN'];
    controlOptions = {
        label: {
            align : "right",
            length: 5
        },
        control: {
            length: 5,
            align: "right"
        }
    }

    constructor(service, bindingEngine,authService) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.authService=authService;
    }

     bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isTransfer = false;
        this.isItem = false;
        this.data.ExpenditureTo = "SAMPLE";
        this.isExternal=false;
        this.options.isExternal=false;
        
        this.items.columns = this.items.columns.filter(c => c != "Status Barang");
        if(this.data.ExpenditureType === "TRANSFER"){
            this.data.ExpenditureTo = "GUDANG LAIN";
        }else if(this.data.ExpenditureType === "EXTERNAL"){
            this.data.ExpenditureTo = "PEMBELIAN";
        }else if(this.data.ExpenditureType === "SAMPLE"){
            this.data.ExpenditureTo = "SAMPLE";
        }else if(this.data.ExpenditureType === "SUBCON"){
            this.data.ExpenditureTo = "SUBCON";
        }else if(this.data.ExpenditureType === "SISA"){
            this.data.ExpenditureTo = "GUDANG SISA";
            this.items.columns.push("Status Barang");
        }else if(this.data.ExpenditureType === "LAIN-LAIN"){
            this.data.ExpenditureTo = "LAIN-LAIN";
        }
        this.options.ExpenditureType = this.data.ExpenditureType;

        if(this.data.ExpenditureType === "EXTERNAL"){
            this.isExternal = true;
            this.options.isExternal=true;
        }

        if(this.data.ExpenditureType === "TRANSFER" || this.data.ExpenditureType === "SAMPLE"){
            this.isTransfer = true;
        }
        
        if(this.data.Items)
            if (this.data.Items.length > 0) {
                this.isItem = true;
            }

        this.options.readOnly = this.readOnly;
        
        this.readOnlySender = true;
        if (this.data && this.data.Items) {
            this.options.checkedAll = this.data.Items.reduce((acc, curr) => acc && curr.IsSave, true);
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.ExpenditureType")
    get filterUnitDeliveryOrder() {
        var unitDeliveryOrderFilter = {
            IsUsed : false
        };
        unitDeliveryOrderFilter[`UnitDOType== "${this.data.ExpenditureType}"`]=true;
        unitDeliveryOrderFilter[`UnitSenderCode =="SMP1"`]=true;
        
        return unitDeliveryOrderFilter;
    }

    expenditureTypeChanged(e) {
        var selectedCategory = e.srcElement.value;
        if (selectedCategory) {
            this.data.ExpenditureType = selectedCategory;
            if (this.data.ExpenditureType === "TRANSFER" || this.data.ExpenditureType === "SAMPLE") {
                this.isTransfer = true;
            }
            else {
                this.isTransfer = false;
            }
            if (this.data.ExpenditureType === "EXTERNAL") {
                this.isExternal = true;
                this.options.isExternal=true;
            }
            else {
                this.isExternal = false;
                this.options.isExternal=false;
            }

            this.items.columns = this.items.columns.filter(c => c != "Status Barang");
            if(this.data.ExpenditureType === "TRANSFER"){
                this.data.ExpenditureTo = "GUDANG LAIN";
            }else if(this.data.ExpenditureType === "EXTERNAL"){
                this.data.ExpenditureTo = "PEMBELIAN";
            }else if(this.data.ExpenditureType === "SAMPLE"){
                this.data.ExpenditureTo = "SAMPLE";
            }else if(this.data.ExpenditureType === "SUBCON"){
                this.data.ExpenditureTo = "SUBCON";
            }else if(this.data.ExpenditureType === "SISA"){
                this.data.ExpenditureTo = "GUDANG SISA";
                this.items.columns.push("Status Barang");
            }else if(this.data.ExpenditureType === "LAIN-LAIN"){
                this.data.ExpenditureTo = "LAIN-LAIN";
            }
            this.options.ExpenditureType = this.data.ExpenditureType;
        }
        this.context.DONoViewModel._suggestions=[];
        this.context.DONoViewModel.editorValue = "";
        this.unitDeliveryOrder = null;
        this.data.UnitRequest = null;
        this.data.Items = [];
        this.data.UnitSender = null;
        this.data.Storage = null;
        this.isItem = false;
        this.data.StorageRequest = null;
        this.data.RoJob=null;
        this.error = null;
        this.context.error.Items = [];
        this.context.error = [];

    }

    get unitDeliveryOrderLoader() {
        return UnitDeliveryOrderLoader;
    }

    async unitDeliveryOrderChanged(newValue){
        var selectedUnitDeliveryOrder = newValue;
        this.dataItems = [];
        this.data.Items = [];
        if(this.error && this.error.Items) {
            this.error.Items = [];
        }
        if(selectedUnitDeliveryOrder == null){
            this.data.Items = [];
            this.error = null;
            this.data.UnitRequest = null;
            this.data.UnitSender = null;
            this.data.Storage = null;
            this.data.StorageRequest = null;
            this.isItem = false;
            this.data.UnitDOId = null;
            this.data.UnitDONo = "";
        }
        else if(selectedUnitDeliveryOrder){
            console.log(selectedUnitDeliveryOrder)
            if(newValue.UnitDOType== "MARKETING"){
                this.data.ExpenditureTo="PENJUALAN";
            }
            else if(newValue.UnitDOType== "RETUR"){
                this.data.ExpenditureTo = "PEMBELIAN";
            }
            this.data.UnitDOId = selectedUnitDeliveryOrder.Id;
            this.data.UnitDONo = selectedUnitDeliveryOrder.UnitDONo;
            this.data.UnitSender = selectedUnitDeliveryOrder.UnitSender;
            this.data.UnitDODate=selectedUnitDeliveryOrder.UnitDODate;
            this.data.UnitSender.toString = function () {
                return [this.Code, this.Name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.UnitRequest = selectedUnitDeliveryOrder.UnitRequest;
            this.data.UnitRequest.toString = function () {
                return [this.Code, this.Name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.Storage = selectedUnitDeliveryOrder.Storage;
            this.data.Storage.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.StorageRequest = selectedUnitDeliveryOrder.StorageRequest;
            this.data.StorageRequest.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.dataUnitDO=await this.service.getUnitDOId(this.data.UnitDOId);
            this.data.RoJob=this.dataUnitDO.RONo;
            this.data.Items = [];
            for(var item of selectedUnitDeliveryOrder.Items){
                var Items = {};
                if(item.Quantity >0){
                    Items.UnitDOItemId = item.Id;
                    Items.URNItemId = item.URNItemId;
                    Items.DODetailId = item.DODetailId;
                    Items.POItemId = item.POItemId;
                    Items.EPOItemId = item.EPOItemId;
                    Items.PRItemId = item.PRItemId;
                    Items.RONo = item.RONo;
                    Items.POSerialNumber = item.POSerialNumber;
                    Items.ProductId = item.ProductId;
                    Items.ProductCode = item.ProductCode;
                    Items.ProductName = item.ProductName;
                    Items.ProductRemark = item.ProductRemark;
                    Items.RONOItem = item.RONo;
                    Items.UomId =  item.UomId;
                    Items.UomUnit = item.UomUnit;
                    Items.PricePerDealUnit = item.PricePerDealUnit;
                    Items.Quantity = item.Quantity;
                    Items.OldQuantity = item.Quantity;
                    Items.BuyerId = item.Buyer.Id || 0;
                    Items.BuyerCode = item.Buyer.Code || null;
                    Items.DesignColor = item.DesignColor;
                    Items.FabricType = item.FabricType;
                    Items.IsSave = Items.Quantity > 0;
                    Items.IsDisabled = !(Items.Quantity > 0);

                    this.data.Items.push(Items);
                }
            }
            this.isItem = true;
        }
        else{
            this.data = null;
            this.data.RoJob=null;
            this.selectedUnitDeliveryOrder = null;
            this.data.UnitRequest = null;
            this.data.UnitSender = null;
            this.data.Storage = null;
            this.data.StorageRequest = null;
            this.data.Items = null;
        }
        // this.data.Items = [];
        this.context.error.Items = [];
        this.context.error = [];
    }

    items = {
        columns: [
            "Kode Buyer",
            "Kode Barang",
            "Nama Barang",
            "Keterangan Barang",
            "Design / Color",
            "Jumlah Keluar",
            "Satuan",
            "Tipe Fabric"],
    };
}