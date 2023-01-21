import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var StorageLoader = require('../../../loader/storage-loader');
//var UnitLoader = require('../../../loader/garment-units-loader');
var UnitSenderLoader = require('../../../loader/garment-sample-unit-loader');
var UnitReceiptNoteLoader = require('../../../loader/garment-unit-receipt-note-for-unit-delivery-order-loader');
var DeliveryOrderLoader= require('../../../loader/garment-delivery-order-by-garment-unit-receipt-note-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable dataItems = [];
    @bindable error = {};
    @bindable options = {};
    @bindable unitDOType;
    @bindable unitSender;
    @bindable storage;
    @bindable newProduct = {};
    @bindable deliveryOrder;

    controlOptions = {
        label: {
            align: "left",
            length: 4
        },
        control: {
            length: 5,
            align: "right"
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.unitDOType="RETUR";
        this.data.unitDOType="RETUR";
        this.options = {
            readOnly : this.readOnly,
            isEdit : this.isEdit
        };

        if (this.data) {
            if (this.data.Items) {
                this.options.checkedAll = this.data.Items.filter(item => item.IsDisabled === false).reduce((acc, curr) => acc && curr.IsSave, true);
                
            }
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    
    @computedFrom("data.UnitSender")
    get filterUnit() {
        var storageFilter = {}
        if (this.data.UnitSender) {
            storageFilter.UnitId = this.data.UnitSender.Id;
        }

        return storageFilter;
    }  

    @computedFrom("data.UnitSender", "data.Storage")
    get filterURN(){
        if(this.data.UnitSender && this.data.Storage)
            var doFilter={
                UnitCode: this.data.UnitSender.Code,
                StorageCode: this.data.Storage.code
            };
        return doFilter;
    }

    get storageLoader() {
        return StorageLoader;
    }

    get deliveryOrderLoader(){
        return DeliveryOrderLoader;
    }

    deliveryOrderView=(DO)=>{
        return DO.DONo;
    }

    storageView = (storage) => {
        var code = storage.code ? storage.code : storage.Code;
        var name = storage.name ? storage.name : storage.Name;
        return `${name}`
    }

    unitSenderChanged(newValue) {
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.data.UnitSender = selectedUnit;
        }
        else {
            this.data.UnitSender = null;
            this.context.unitSenderViewModel.editorValue = "";
            this.context.deliveryOrderViewModel.editorValue = "";
            this.deliveryOrder = null;
        }
        this.storage = null;
        this.deliveryOrder = null;
        this.context.storageViewModel.editorValue = "";
        this.context.deliveryOrderViewModel.editorValue = "";
        this.data.Items = [];
    }

    storageChanged(newValue) {
        var selectedStorage = newValue;
        if (selectedStorage) {
            this.data.Storage = selectedStorage;
        }
        else {
            this.data.Storage = null;
            this.context.storageViewModel.editorValue = "";
            this.context.deliveryOrderViewModel.editorValue = "";
            this.deliveryOrder = null;
        }
        this.deliveryOrder = null;
        this.context.deliveryOrderViewModel.editorValue = "";
        this.data.Items = [];
    }

    async deliveryOrderChanged(newValue){
        var selectedDO= newValue;
        if(selectedDO){
            this.data.DONo=selectedDO.DONo;
            this.data.DOId=selectedDO.DOId;

            var doFilter={
                UnitCode: this.data.UnitSender.Code,
                StorageCode: this.data.Storage.code,
                DONo: selectedDO.DONo
            };
            var info={
                filter: JSON.stringify(doFilter)
            }
            var urn= await this.service.searchUnitReceiptNote(info).then(result=>{return result.data;});
            var dataItems=[];
            if(urn){
        console.log(urn)
                for (var item of urn) {
                    
                    var Items = {};
                    Items.URNItemId = item.Id;
                    Items.URNNo = item.URNNo;
                    Items.DODetailId = item.DODetailId;
                    Items.URNId = item.URNId;
                    Items.POItemId = item.POItemId;
                    Items.EPOItemId = item.EPOItemId;
                    Items.PRItemId = item.PRItemId;
                    Items.RONo = item.RONo;
                    Items.Article = item.Article;
                    Items.POSerialNumber = item.POSerialNumber;
                    Items.ProductId = item.ProductId;
                    Items.ProductCode = item.ProductCode;
                    Items.ProductName = item.ProductName;
                    Items.ProductRemark = `${item.POSerialNumber}; ${item.Article}; ${item.RONo}; ${item.ProductRemark}`;
                    Items.UomId = item.SmallUomId;
                    Items.UomUnit = item.SmallUomUnit;
                    Items.PricePerDealUnit = item.PricePerDealUnit;
                    Items.DesignColor = item.DesignColor;
                    Items.ReturQuantity = parseFloat(((item.ReceiptCorrection) -( item.OrderQuantity/item.CorrectionConversion)).toFixed(2));
                    //parseFloat(((item.SmallQuantity - item.OrderQuantity)/item.Conversion).toFixed(2));
                    Items.Quantity = parseFloat(((item.ReceiptCorrection*item.CorrectionConversion) - item.OrderQuantity).toFixed(2));
                    Items.IsSave = Items.Quantity > 0;
                    Items.IsDisabled = !(Items.Quantity > 0);
                    Items.ReturUomId = item.UomId;
                    Items.ReturUomUnit = item.UomUnit;
                    Items.Conversion=item.CorrectionConversion;
                    Items.DOCurrency={};
                    Items.DOCurrency.Rate= item.DOCurrencyRate;
                    if(Items.ReturQuantity>0){
                        dataItems.push(Items);
                    }
                }
                this.data.Items=dataItems;
            }
        }
        else{
            this.context.deliveryOrderViewModel.editorValue = "";
            this.data.Items = [];
        }
    }

    get unitSenderLoader() {
        return UnitSenderLoader;
    }

    unitSenderView = (unitSender) => {
        return `${unitSender.Code} - ${unitSender.Name}`
    }

    get unitReceiptNoteLoader() {
        return UnitReceiptNoteLoader;
    }

    async addProduct() {
        if (this.newProduct && this.newProduct.ProductId) {
            this.data.Items.push(this.newProduct);
            this.options.checkedAll = this.data.Items.filter(item => item.IsDisabled === false).reduce((acc, curr) => acc && curr.IsSave, true);
            this.context.ItemsCollection.bind();
            this.newProduct = {};
            this.RONoHeader = null;
        }
    }

    items = {
        columns: [
            "Kode Barang",
            "Nama Barang",
            "Keterangan Barang",
            "RO Asal",
            "Jumlah yang diretur (Jumlah Kecil)",
            "Satuan Kecil",
            "Jumlah Besar",
            "Satuan Besar",
            "No Bon Terima Unit"
        ],
    };
}