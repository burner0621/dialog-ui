import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

var moment = require('moment');
var MaterialTypeLoader = require('../../../../loader/material-types-loader');
var UnitLoader = require('../../../../loader/unit-azure-loader');
var ProductLoader = require('../../../../loader/product-azure-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable lotConfiguration;
    @bindable processType;
    @bindable yarnType;
    @bindable count;
    @bindable showItemRegular;
    @bindable regularItems;
    @bindable lot;
    @bindable mixDrawingLot;
    @bindable detailOptions;
    @bindable unit;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };


    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 7
        }
    }
    mixDrawing = false;
    processTypeList = [
    ];

    detailOptions = {};
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.detailOptions.service = service;
        this.detailOptions.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.processType = false;
        if (!this.readOnly)
            this.coreService.getMachineTypes()
                .then(result => {
                    if (this.data.ProcessType) {
                        this.processTypeList = result;
                    } else {
                        this.processTypeList.push("");
                        for (var list of result) {
                            this.processTypeList.push(list);
                        }
                    }
                });
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }

        if (this.data.ProcessType == "Mix Drawing") {
            this.showItemRegular = false;
            this.mixDrawing = true;
            if (this.data.MixDrawingLotNo) {
                this.mixDrawingLot = this.data.MixDrawingLotNo;
            }
            if(this.data.MixDrawingCountId){
                this.count = {};
                this.count.Id = this.data.MixDrawingCountId;
                this.count.Code = this.data.Count;
            }

        } else {
            this.showItemRegular = true;
            this.mixDrawing = false;
            this.yarnType = {};
            if (this.data.MaterialComposition) {
                this.yarnType.Id = this.data.MaterialComposition[0].YarnId;
                this.yarnType.Code = this.data.MaterialComposition[0].YarnCode;
                this.data.YarnMaterialTypeId = this.yarnType.Id;
                this.data.YarnMaterialTypeCode = this.yarnType.Code;
                if (this.yarnType.Id) {
                    this.yarnTypeId = this.yarnType.Id;
                    this.lot = this.data.LotNo;
                    this.regularItems = this.data.regularItems;

                }
            }

        }
    }

    inputInfo = {
        columns: [
            { header: "Nama Serat", value: "product" },
            { header: "Komposisi(%)", value: "composition" },
        ],
    };
    spinningFilter = { "(Code == \"S1\" || Code == \"S2\")": true };
    mixDrawingColumns = {
        columns: [
            "Jenis Material",
            "Nomor Lot",
            "Komposisi(%)"
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.MaterialComposition.push({});
        }.bind(this)
    };

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
            this.detailOptions.UnitDepartmentId = this.unit.Id;
        }
    }

    processTypeChanged(n, o) {
        var selectedProcess = this.processType;
        this.data.ProcessType = selectedProcess;
        if (selectedProcess) {
            if (this.data.ProcessType == "Mix Drawing") {
                this.showItemRegular = false;
                this.mixDrawing = true;
                this.lot = undefined;
                this.regularItems = [];


            } else {
                if (this.data.ProcessType == 'Winder')
                    this.data.ConeWeight = 1.89;

                this.data.MaterialComposition = [];
                this.showItemRegular = true;
                this.mixDrawing = false;

            }

        }
    }

    mixDrawingLotChanged(n, o) {
        if (this.mixDrawingLot) {
            this.data.mixDrawingLot = this.mixDrawingLot;
            this.data.MixDrawingLotNo = this.mixDrawingLot;
        }
    }

    countChanged(n, o){
        if(this.count){
            this.data.Count = this.count.Id;
            
        }
    }

    yarnTypeChanged(n, o) {
        var selectedProcess = this.yarnType;

        if (selectedProcess) {

            this.data.YarnMaterialTypeId = selectedProcess.Id;
            this.data.YarnMaterialTypeCode = selectedProcess.Code;
            var yarn = selectedProcess.Id;
            if (yarn) {
                this.service.getLotByYarnType(yarn, this.unit.Id, this.mixDrawing).then(result => {
                    if (result) {
                        this.lot = result.LotNo;
                        this.data.LotId = result.Id;
                        this.data.LotNo = result.LotNo;
                        if (this.error) {
                            this.error.YarnId = null;
                        }
                        if (this.data.ProcessType != "Mix Drawing") {

                            this.regularItems = result.CottonCompositions;
                        }
                    } else {
                        this.error.YarnId = "Lot tidak ditemukan";
                        this.data.MaterialComposition = null;
                        this.data.LotId = null;
                        this.data.LotNo = null;
                        this.cottonLot = null;
                        this.regularItems = null;
                        this.data.YarnMaterialTypeId = null;
                        this.data.YarnMaterialTypeCode = null;
                    }
                });
            }

        }
    }


    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }
} 