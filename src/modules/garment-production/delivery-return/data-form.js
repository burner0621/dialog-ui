import { inject, bindable, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const StorageLoader = require('../../../loader/storage-loader');
const UnitDOLoader = require('../../../loader/garment-unit-delivery-order-loader');

@inject(BindingEngine, Service, PurchasingService)
export class DataForm {
    @bindable readOnly;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    @bindable options = {};
    @bindable error;
    @bindable tittle;
    // @bindable error = {};
    @bindable filterByUnit;
    @bindable filterDO;
    @bindable selectedUnitDO;
    @bindable Unit;
    @bindable Storages;
    @bindable itemOptions = {};

    constructor(bindingEngine, service, purchasingService) {
        this.service = service;
        this.purchasingService = purchasingService;
        this.BindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    returnTypes = [
        "RETUR",
        "SISA PRODUKSI"
    ]

    itemsColumns = [""];

    bind(context) {
        var storageTempId = 0;
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate : this.context.isCreate,
            isEdit: this.context.isEdit,
            checkedAll: this.data.Items.reduce((acc, curr) => acc && cur.IsSave, false),
            returnType: this.isEdit ? this.data.ReturnType :this.returnTypes[0]
        }
        if (this.data.DRNo && this.data.Items) {
            this.Storages = {};
            this.Storages._id = this.data.Storage.Id;
            this.Storages.name = this.data.Storage.Name;
            this.Storages.code = this.data.Storage.Code;
            this.Unit = this.data.Unit;
            
            
            this.selectedUnitDO = {
                        UnitDONo: this.data.UnitDONo
                    };
            this.data.Items.forEach(
                item => item.IsSave = true,
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    storageView = (storage) => {
        return `${storage.code} - ${storage.name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get storageLoader() {
        return StorageLoader;
    }

    get unitDOLoader() {
        return UnitDOLoader;
    }

    returnTypeChanged(e) {
        this.itemOptions.returnType = e.target.value;
        this.Unit = null;
    }

    async UnitChanged(newValue){
        if(!newValue){
            this.Storages = null;
            this.selectedUnitDO = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ReturnDate = null;
            this.data.UENId = null;
            this.data.UnitDOId = null;
            this.data.UnitDONo = null;
            this.data.PreparingId = null;
            this.context.UnitViewModel.editorValue = "";
            this.context.StoragesViewModel.editorValue = "";
            this.context.StoragesViewModel._suggestions = [];
            this.context.selectedUnitDOViewModel.editorValue = "";
            this.context.selectedUnitDOViewModel._suggestions = [];
            this.data.Items = [];
        } else if(newValue != this.data.Unit && this.context.isCreate){
            this.data.Unit = newValue;
            this.filterByUnit = {UnitId: this.data.Unit.Id};
            this.Storages = null;
            this.data.Storage = null;
            this.selectedUnitDO = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ReturnDate = null;
            this.data.UENId = null;
            this.data.UnitDOId = null;
            this.data.UnitDONo = null;
            this.data.PreparingId = null;
            this.data.Items = [];
            this.context.StoragesViewModel.editorValue = "";
            this.context.StoragesViewModel._suggestions = [];
            this.context.selectedUnitDOViewModel.editorValue = "";
            this.context.selectedUnitDOViewModel._suggestions = [];
        }
    }

    async StoragesChanged(newValue){
        if(!newValue){
            this.selectedUnitDO = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ReturnDate = null;
            this.data.UENId = null;
            this.data.UnitDOId = null;
            this.data.UnitDONo = null;
            this.data.PreparingId = null;
            this.context.StoragesViewModel.editorValue = "";
            this.context.StoragesViewModel._suggestions = [];
            this.data.Items = [];
        } else if(newValue && this.context.isCreate){
            this.data.Storage = {};
            this.data.Storage.Id = newValue._id;
            this.data.Storage.Name = newValue.name;
            this.data.Storage.Code = newValue.code;
            this.filterDO = {UnitSenderName: this.data.Unit.Name, StorageName: this.data.Storage.Name, UnitDOType: "PROSES"};
            
            this.selectedUnitDO = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ReturnDate = null;
            this.data.UENId = null;
            this.data.UnitDOId = null;
            this.data.UnitDONo = null;
            this.data.PreparingId = null;
            this.context.selectedUnitDOViewModel.editorValue = "";
            this.context.selectedUnitDOViewModel._suggestions = [];
            this.data.Items = [];
        }
    }

    async selectedUnitDOChanged(newValue){
        if(!newValue && this.context.isCreate) {
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ReturnDate = null;
            this.data.UENId = null;
            this.data.UnitDOId = null;
            this.data.UnitDONo = null;
            this.data.PreparingId = null;
            this.context.selectedUnitDOViewModel.editorValue = "";
            this.context.selectedUnitDOViewModel._suggestions = [];
            this.data.Items = [];
        } else if(newValue.Id && this.context.isCreate) {
            this.data.Items.splice(0);
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.ReturnDate = new Date();
            let dataExpenditure = await this.purchasingService.getExpenditureNote({size: 1, filter : JSON.stringify({UnitDONo : newValue.UnitDONo})});
            let dataPreparing = await this.service.getPreparingByUENNo({size: 1, filter : JSON.stringify({UENNo : dataExpenditure.data[0].UENNo})});
            this.data.UENId = dataExpenditure.data[0].Id;
            this.data.UnitDOId = newValue.Id;
            this.data.UnitDONo = newValue.UnitDONo;
            this.data.PreparingId = dataPreparing.data.length > 0 ? dataPreparing.data[0].Id : null;

            for(var itemUnitDO of newValue.Items){
                const item = (dataExpenditure.data[0] || []).Items.find(f => f.UnitDOItemId == itemUnitDO.Id)

                if (item) {

                    let product = {};
                    let uom = {};
                    product.Id = item.ProductId;
                    product.Code = item.ProductCode;
                    product.Name = item.ProductName;
                    uom.Id = item.UomId;
                    uom.Unit = item.UomUnit;

                    const items = {
                        Product : product,
                        DesignColor : itemUnitDO.DesignColor,
                        RONo : item.RONo,
                        Uom : uom,
                        UnitDOItemId : itemUnitDO.Id,
                        UENItemId : item.Id,
                    }

                    if (item.ProductName == "FABRIC") {
                        if (dataPreparing.data.length > 0) {
                            let itemPreparing = (dataPreparing.data[0].Items || []).find(f => f.UENItemId == item.Id);

                            if (itemPreparing) {
                                if ((this.data.ReturnType == "RETUR" && itemPreparing.RemainingQuantity == itemPreparing.Quantity) || (this.data.ReturnType == "SISA PRODUKSI" && itemPreparing.RemainingQuantity != itemPreparing.Quantity)) {
                                    this.data.Items.push(Object.assign(items, {
                                        Quantity : itemPreparing.RemainingQuantity,
                                        PreparingItemId : itemPreparing.Id,
                                        QuantityUENItem : itemPreparing.RemainingQuantity,
                                        RemainingQuantityPreparingItem : itemPreparing.RemainingQuantity,
                                    }));
                                }
                            }
                        }
                    } else {
                        if ((this.data.ReturnType == "RETUR" && item.ReturQuantity == 0) || (this.data.ReturnType == "SISA PRODUKSI" && item.ReturQuantity != item.Quantity)) {
                            let qty = item.Quantity - item.ReturQuantity;
                            this.data.Items.push(Object.assign(items, {
                                Quantity : qty,
                                QuantityUENItem : qty,
                                RemainingQuantityPreparingItem : qty,
                            }));
                        }
                    }
                }
            }
        } 
        else {
            let dataExpenditure = await this.purchasingService.getExpenditureNote({size: 1, filter : JSON.stringify({UnitDONo : newValue.UnitDONo})});
            let dataPreparing = await this.service.getPreparingByUENNo({size: 1, filter : JSON.stringify({UENNo : dataExpenditure.data[0].UENNo})});
            for(var dataItem of this.data.Items){
                for(var itemExpenditure of dataExpenditure.data[0].Items){
                    if(dataItem.Product.Code == itemExpenditure.ProductCode){
                        dataItem.QuantityUENItem = dataItem.Quantity + (itemExpenditure.Quantity - itemExpenditure.ReturQuantity);
                    }
                }
                if(dataPreparing.data.length>0){
                    for(var itemPreparing of dataPreparing.data[0].Items){
                        if(itemPreparing.UENItemId == dataItem.UENItemId){
                            dataItem.RemainingQuantityPreparingItem = itemPreparing.RemainingQuantity + dataItem.Quantity;
                        }
                    }
                }
            }
            
        }
    }

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Nama Barang",
            "Keterangan Barang",
            "RO Asal",
            "Jumlah",
            "Satuan",
        ]
    }
}