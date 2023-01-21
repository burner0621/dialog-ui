import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentCoreService, GarmentPurchasingService } from "./service";

const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');
const UnitExpenditureNoteLoader = require('../../../../../loader/garment-unit-expenditure-note-custom-loader');

@inject(GarmentPurchasingService, GarmentCoreService)
export class DataForm {

    constructor(garmentPurchasingService, garmentCoreService) {
        this.garmentPurchasingService = garmentPurchasingService;
        this.garmentCoreService = garmentCoreService;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedUnitFrom;
    @bindable selectedUnitExpenditureNote;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "Kode Barang", value: "ProductCode" },
        { header: "Nama Barang", value: "ProductName" },
        { header: "Keterangan Barang", value: "ProductRemark" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ]

    get unitLoader() {
        return UnitLoader;
    }

    get unitExpenditureNoteLoader() {
        return UnitExpenditureNoteLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    @computedFrom("data.RequestUnit")
    get unitExpenditureNoteFilter() {
        // return {
        //     IsReceived: false,
        //     ExpenditureType: "SISA",
        //     StorageName: "GUDANG BAHAN BAKU",
        //     UnitSenderId: (this.data.RequestUnit || {}).Id || 0
        // };
        return  [
            {
                Key: "IsReceived",
                Condition: 2,
                Value:false

            },
            {
                Key: "ExpenditureType",
                Condition: 2,
                Value:"SISA"

            },
            {
                Key: "StorageName",
                Condition: 3,
                Value:"GUDANG BAHAN BAKU"

            },
            {
                Key: "UnitSenderId",
                Condition: 2,
                Value:(this.data.RequestUnit || {}).Id || 0

            },
        ]
        };

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.RequestUnit.Code,
                Name: this.data.RequestUnit.Name
            };
            this.selectedUnitExpenditureNote = {
                UENNo: this.data.UENNo
            };
            this.data.StorageFromName = this.data.Storage.name;
            for (const item of this.data.Items) {
                item.ProductCode = item.Product.Code;
                item.ProductName = item.Product.Name;
                item.UomUnit = item.Uom.Unit;
            }

            this.garmentPurchasingService.getUnitExpenditureNoteById(this.data.UENid)
                .then(dataUnitExpenditureNote => {
                    this.garmentPurchasingService.getUnitDeliveryOrderById(dataUnitExpenditureNote.UnitDOId)
                        .then(dataUnitDeliveryOrder => {
                            this.data.ROJob = dataUnitDeliveryOrder.RONo;
                        });
                });
        }
    }

    selectedUnitFromChanged(newValue) {
        if (this.data.Id) return;

        this.data.RequestUnit = newValue;

        this.selectedUnitExpenditureNote = null;
    }

    selectedUnitExpenditureNoteChanged(newValue) {
        if (this.data.Id) return;

        this.data.Items.splice(0);

        if (newValue) {
            this.garmentPurchasingService.getUnitExpenditureNoteById(newValue.Id)
                .then(dataUnitExpenditureNote => {
                    this.garmentPurchasingService.getUnitDeliveryOrderById(dataUnitExpenditureNote.UnitDOId)
                        .then(dataUnitDeliveryOrder => {
                            this.data.UENId = dataUnitExpenditureNote.Id;
                            this.data.UENid = dataUnitExpenditureNote.Id;
                            this.data.UENNo = dataUnitExpenditureNote.UENNo;
                            this.data.Storage = dataUnitExpenditureNote.Storage;
                            this.data.StorageFromName = dataUnitExpenditureNote.Storage.name;
                            this.data.ExpenditureDate = dataUnitExpenditureNote.ExpenditureDate;

                            for (const item of dataUnitExpenditureNote.Items) {
                                var fabricRemark;

                                this.garmentCoreService.getProductById(item.ProductId)
                                    .then(product => {
                                        fabricRemark = product.Remark;
                                        this.data.Items.push({
                                            UENItemId: item.Id,
                                            POSerialNumber: item.POSerialNumber,
                                            Product: {
                                                Id: item.ProductId,
                                                Code: item.ProductCode,
                                                Name: item.ProductName
                                            },
                                            ProductCode: item.ProductCode,
                                            ProductName: item.ProductName,
                                            ProductRemark: item.ProductRemark,
                                            FabricRemark: fabricRemark,
                                            Quantity: item.Quantity,
                                            Uom: {
                                                Id: item.UomId,
                                                Unit: item.UomUnit
                                            },
                                            UomUnit: item.UomUnit,
                                            BasicPrice : item.BasicPrice
                                        });

                                    });
                            }

                            this.data.ROJob = dataUnitDeliveryOrder.RONo;
                        })
                });
        } else {
            this.data.UENid = 0;
            this.data.UENNo = null;
            this.data.Storage = null;
            this.data.StorageFromName = null;
            delete this.data.ExpenditureDate;
            this.data.ROJob = null;
            this.context.UnitExpenditureNoteViewModel.editorValue = "";
        }
    }
}
