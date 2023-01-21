import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service,CoreService,ProductionService } from "./service";
var StorageLoader = require('../../../loader/storage-loader');
var ROLoader = require('../../../loader/garment-sample-request-loader');
var UnitSenderLoader = require('../../../loader/garment-sample-unit-loader');
var UnitRequestLoader = require('../../../loader/garment-sample-unit-loader');
var UnitReceiptNoteLoader = require('../../../loader/garment-unit-receipt-note-for-unit-delivery-order-loader');
import moment from 'moment';

@containerless()
@inject(Service,CoreService,ProductionService, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable dataItems = [];
    @bindable error = {};
    @bindable options = {};
    @bindable unitDOType;
    @bindable unitRequest;
    @bindable unitSender;
    @bindable storage;
    @bindable storageRequest;
    @bindable RONo;
    @bindable RONoHeader;
    @bindable newProduct = {};
    @bindable isProses = false;
    @bindable isTransfer = false;
    @bindable isSample = false;
    @bindable isRemain = false;
    @bindable isSubcon = false;
    @bindable isOther = false;
    @bindable RONoSample;

    typeUnitDeliveryOrderOptions = ['SAMPLE', 'SISA', 'SUBCON','LAIN-LAIN'];

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

    constructor(service,coreService,productionService, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.coreService = coreService;
        this.productionService=productionService;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        // console.log(this.data);
        this.error = this.context.error;

        this.options = {
            readOnly : this.readOnly,
            isEdit : this.isEdit
        };
        if(!this.data.UnitRequest && !this.isOther){
            var unit= await this.coreService.getSampleUnit({ size: 1,keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.unitRequest=unit.data[0];

        }
        if(!this.data.UnitSender && this.isOther){
            var unit= await this.coreService.getSampleUnit({ size: 1,keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.UnitSender=unit.data[0];

        }

        if (this.readOnly || this.isEdit) {
            this.items.columns =  [
                "Kode Barang",
                "Nama Barang",
                "Keterangan Barang",
                "RO Asal",
                "Jumlah DO Awal",
                "Jumlah DO",
                "Satuan",
                "Tipe Fabric"
            ];
        }
        
        if (this.data) {
            if (this.data.Items) {
                this.options.checkedAll = this.data.Items.filter(item => item.IsDisabled === false).reduce((acc, curr) => acc && curr.IsSave, true);
            }

            this.isSample = this.data.UnitDOType === "SAMPLE";
            this.isRemain = this.data.UnitDOType === "SISA";
            this.isSubcon = this.data.UnitDOType === "SUBCON";
            this.isOther = this.data.UnitDOType === "LAIN-LAIN";
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.UnitRequest")
    get filterUnitRequest() {
        var storageFilter = {}
        if (this.data.UnitRequest) {
            storageFilter.UnitId = this.data.UnitRequest.Id;
        }

        return storageFilter;
    }

    @computedFrom("data.UnitSender")
    get filterUnit() {
        var storageFilter = {}
        if (this.data.UnitSender) {
            storageFilter.UnitId = this.data.UnitSender.Id;
        }

        return storageFilter;
    }

    @computedFrom("data.UnitSender", "data.UnitDOType", "data.Storage")
    get filterRONoByUnit() {
        var rONoFilter = {};
        if (this.data.UnitSender && this.data.Storage) {
            rONoFilter.UnitId = this.data.UnitSender.Id;
            rONoFilter.Type = this.data.UnitDOType;
            rONoFilter.StorageId = this.data.Storage._id;
        }
        return rONoFilter;
    }

    @computedFrom("data.UnitSender", "data.UnitDOType", "data.RONo", "data.Storage")
    get filterRONoAddProductByUnit() {
        var rONoFilter = {}
        if (this.data.UnitSender  && this.data.Storage) {
            rONoFilter.UnitId = this.data.UnitSender.Id;
            rONoFilter.Type = this.data.UnitDOType;
            rONoFilter.RONo = this.data.RONo;
            rONoFilter.StorageId = this.data.Storage._id;
        }
        return rONoFilter;
    }

    unitDOTypeChanged(newValue) {
        var selectedCategory = newValue;
        if (selectedCategory) {
            this.data.UnitDOType = selectedCategory;

            this.isSample = this.data.UnitDOType === "SAMPLE";
            this.isRemain = this.data.UnitDOType === "SISA";
            this.isSubcon = this.data.UnitDOType === "SUBCON";
            this.isOther = this.data.UnitDOType === "LAIN-LAIN";

            //this.unitRequest = null;
            this.unitSender = this.unitRequest;
            this.storage = null;
            this.storageRequest = null;
            this.RONo = null;
            this.RONoHeader = null;

            //this.context.error.Items = [];
            this.context.error = [];
        }
    }

    get storageLoader() {
        return StorageLoader;
    }

    get roLoader() {
        return ROLoader;
    }

    get garmentUnitReceiptNoteHeaderLoader() {
        return (keyword, filter) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify(filter),
            };
            return this.service.searchMoreDOItems(info)
                .then((result) => {
                    console.log(result)
                    let itemIds = this.data.Items.map(i => i.URNItemId);
                    return result.data.filter(data => data && itemIds.indexOf(data.URNItemId) < 0);
                });
        }
    }

    storageView = (storage) => {
        var code = storage.code ? storage.code : storage.Code;
        var name = storage.name ? storage.name : storage.Name;
        return `${name}`
    }

    unitRequestChanged(newValue) {
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.data.UnitRequest = selectedUnit;
            if (this.isSample || this.isRemain || this.isSubcon) {
                this.unitSender = selectedUnit;
            }
        }
        else {
            this.data.UnitRequest = null;
            if (this.isSample|| this.isRemain || this.isSubcon) {
                this.unitSender = null;
            }
            this.context.unitRequestViewModel.editorValue = "";
        }
        this.storageRequest = null;
        if(this.context.storageRequestViewModel && this.context.storageRequestViewModel.editorValue) {
            this.context.storageRequestViewModel.editorValue = "";
        }
        this.storage = null;
        this.RONoHeader = null;
        this.RONo = null;
        this.context.RONoHeaderViewModel.editorValue = "";
        this.data.Items = [];
    }

    unitSenderChanged(newValue) {
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.data.UnitSender = selectedUnit;
        }
        else {
            this.data.UnitSender = null;
            this.context.unitSenderViewModel.editorValue = "";
        }
        this.storage = null;
        this.context.storageViewModel.editorValue = "";
        this.RONoHeader = null;
        this.RONo = null;
        this.data.Items = [];
        this.context.RONoHeaderViewModel.editorValue = "";
    }

    storageRequestChanged(newValue) {
        var selectedStorage = newValue;
        if (selectedStorage) {
            this.data.StorageRequest = selectedStorage;
        }
        else {
            this.data.StorageRequest = null;
            if (this.isTransfer) {
                this.context.storageRequestViewModel.editorValue = "";
            }
        }
        this.data.Items = [];
        this.RONo = null;
        //this.storage = null;
        //this.unitSender = null;
    }

    storageChanged(newValue) {
        var selectedStorage = newValue;
        console.log(newValue)
        if (selectedStorage) {
            this.data.Storage = selectedStorage;
        }
        else {
            this.data.Storage = null;
            this.context.storageViewModel.editorValue = "";
        }
        this.data.Items = [];
        this.RONo = null;
        this.context.RONoHeaderViewModel.editorValue = "";
        this.RONoHeader = null;
    }

    RONoHeaderChanged(newValue) {
        //var selectedROHeader = newValue;
        this.newProduct = {};
        if (newValue == null) {
            this.context.RONoHeaderViewModel.editorValue = "";
            this.data.RONoHeader = null;
        }
        else if (newValue) {
            this.service.searchDOItems({ filter: JSON.stringify({ RONo: newValue.RONo, UnitId:this.data.UnitSender.Id, StorageId:this.data.Storage.Id ? this.data.Storage.Id : this.data.Storage._id, POSerialNumber : newValue.POSerialNumber, DOItemsId: newValue.DOItemsId}) })
                    .then(result=>{
                        var selectedROHeader= result.data[0];
                        this.newProduct.DOItemsId = selectedROHeader.DOItemsId;
                        this.newProduct.URNItemId = selectedROHeader.URNItemId;
                        this.newProduct.URNNo = selectedROHeader.URNNo;
                        this.newProduct.DODetailId = selectedROHeader.DODetailId;
                        this.newProduct.URNId = selectedROHeader.URNId;
                        this.newProduct.POItemId = selectedROHeader.POItemId;
                        this.newProduct.EPOItemId = selectedROHeader.EPOItemId;
                        this.newProduct.PRItemId = selectedROHeader.PRItemId;
                        this.newProduct.RONo = selectedROHeader.RONo;
                        this.newProduct.Article = selectedROHeader.Article;
                        this.newProduct.POSerialNumber = selectedROHeader.POSerialNumber;
                        this.newProduct.ProductId = selectedROHeader.ProductId;
                        this.newProduct.ProductCode = selectedROHeader.ProductCode;
                        this.newProduct.ProductName = selectedROHeader.ProductName;
                        this.newProduct.ProductRemark = `${selectedROHeader.POSerialNumber}; ${selectedROHeader.Article}; ${selectedROHeader.RONo}; ${selectedROHeader.ProductRemark}`;
                        this.newProduct.UomId = selectedROHeader.SmallUomId;
                        this.newProduct.UomUnit = selectedROHeader.SmallUomUnit;
                        this.newProduct.PricePerDealUnit = selectedROHeader.PricePerDealUnit;
                        this.newProduct.DesignColor = selectedROHeader.DesignColor;
                        this.newProduct.DefaultDOQuantity = parseFloat(selectedROHeader.RemainingQuantity.toFixed(2));
                        this.newProduct.Quantity = this.newProduct.DefaultDOQuantity;
                        this.newProduct.IsSave = this.newProduct.Quantity > 0;
                        this.newProduct.IsDisabled = !(this.newProduct.Quantity > 0);
                    });
            
        }
    }

    get unitRequestLoader() {
        return UnitRequestLoader;
    }

    get unitSenderLoader() {
        return UnitSenderLoader;
    }

    roNoView = (rono) => {
        return `${rono.RONo} - ${rono.ProductCode} - ${rono.ProductName} - ${rono.POSerialNumber} - ${rono.RemainingQuantity}`;
    }

    unitRequestView = (unitRequest) => {
        return `${unitRequest.Code} - ${unitRequest.Name}`
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
            "Jumlah DO Awal",
            "Satuan",
            "Tipe Fabric"
        ],
    };

    async RONoSampleChanged(newValue){
        if(newValue){
            this.data.RONo=newValue.RONoSample;
            var sample=await this.productionService.searchSampleComplete(newValue.Id);
            var article=sample.SampleProducts.map(d => d.Style);
            var unique = article.filter((v, i, a) => a.indexOf(v) === i);
            this.data.Article=unique.join(", ");
        }
    }

    async searchRONo() {
        // this.data.Items = this.dataItems;
        this.data.Items = [];
        this.dataItems = [];

        var filter= JSON.stringify({RONo:this.RONo});
        var info = {
            keyword: this.RONo,
            filter: filter
        };
        this.data.RONo = this.RONo;
        var ro=[];
        this.service.getGarmentEPOByRONo(info)
            .then((epo)=>{
                for(var a of epo.data){
                    if(a.RONo==this.data.RONo){
                        ro.push(a);break;
                    }
                }
                this.data.Article = ro[0].Article;
                this.service.searchDOItems({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId:this.data.UnitSender.Id, StorageId:this.data.Storage.Id ? this.data.Storage.Id : this.data.Storage._id}) })
                .then(result=>{
                    if(result.data.length>0){
                        for(var item of result.data){ 
                            
                            var Items = {};
                            Items.DOItemsId = item.DOItemsId;
                            Items.URNItemId = item.URNItemId;
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
                            Items.DefaultDOQuantity = parseFloat(item.RemainingQuantity.toFixed(2));
                            Items.Quantity = Items.DefaultDOQuantity;
                            Items.IsSave = Items.Quantity > 0;
                            Items.IsDisabled = !(Items.Quantity > 0);
            
                            this.dataItems.push(Items);
                        }
                    }
                    this.data.Items = this.dataItems;
                })
            }); 
        

        this.options.checkedAll = this.data.Items.filter(item => item.IsDisabled === false).reduce((acc, curr) => acc && curr.IsSave, true);
        this.context.error.Items = [];
        this.context.error = [];
        this.RONoHeader = null;
        this.context.RONoHeaderViewModel.editorValue = "";
    
    }
}