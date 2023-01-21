import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService } from './service';
import moment from 'moment';

var LotLoader = require('../../../../loader/lot-configuration-loader');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../loader/unit-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable readOnly;
    @bindable processType;
    @bindable inputDate;
    @bindable materialType;
    @bindable lot;
    @bindable shift;
    @bindable group;
    @bindable unit;
    @bindable isItem;
    @bindable detailOptions;
    @bindable error;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };
    typeOptions = []
    processTypeList = [
        "",
        "Blowing",
        "Carding",
        "Pre-Drawing",
        "Finish Drawing",
        "Flyer",
        "Ring Spinning",
        "Winder"
    ];

    get filters() {
        var filters = {
            isEdit: this.context.isEdit,
        }
    }

    shiftList = ["", "Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"];
    detailOptions = {};
    itemsColumnsHeader = [];
    machineSpinningFilter = {};
    masterFilter = {};
    lotFilter = {};
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        }
    };

    items = [];
    spinningFilter = { "(Code == \"S1\" || Code == \"S2\")": true };
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
        // this.bindingEngine = bindingEngine
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;
        this.coreService.getMachineTypes()
            .then(result => {
                if (this.data.ProcessType) {
                    this.typeOptions = result;
                } else {
                    this.typeOptions.push("");
                    for (var list of result) {
                        this.typeOptions.push(list);
                    }
                }
            });
        this.detailOptions.isEdit = this.context.isEdit;
        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }
        if (this.data.Lot && this.data.Lot.Id) {
            this.lot = this.data.Lot;
        }
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

        if (this.data.MaterialType && this.data.MaterialType.Id) {
            this.materialType = {};
            this.materialType.Id = this.data.MaterialType.Id;
            this.materialType.Name = this.data.MaterialType.Name;
            this.materialType.Code = this.data.MaterialType.Code;
        }

        if (this.data.Date) {
            this.inputDate = this.data.Date;
        }

        if (this.data.Shift) {
            this.shift = this.data.Shift;
        }

        if (this.data.Group) {
            this.group = this.data.Group;
        }

        if (this.data.Items) {
            for (var item of this.data.Items) {
                item.Identity = item.Id;
                item.MachineSpinningIdentity = item.MachineSpinning.Id;
            }
            this.itemTemp = this.data.Items
        }
    }

    items = {
        columns: [
            "Nomor Mesin",
            "Nama Mesin",
            "Output (Counter)",
            "UOM",
            "Bale",
            "Total Delivery",
            "Spindle Kosong (Flyer)",
            "Bad Cone (Winder)",
            "Eff%"],
        onRemove: function () {
            this.context.machineCollections.bind();

        }.bind(this)
    };


    async fillItems() {
        if (!this.readOnly && this.data.UnitDepartmentId && this.data.ProcessType && this.data.MaterialTypeId && this.data.LotId) {
            this.machineSpinningFilter.page = 1;
            this.machineSpinningFilter.size = 2147483647;
            this.machineSpinningFilter.order = { "No": "asc" }
            // this.machineSpinningFilter.filter = { "Type": this.data.ProcessType, "UnitId": this.data.UnitDepartmentId }
            this.filter = {};
            this.filter.Type = this.data.ProcessType;
            this.filter.UnitId = this.data.UnitDepartmentId.toString();
            this.machineSpinningFilter.filter = JSON.stringify(this.filter);
            this.data.Items = await this.coreService.searchMachineSpinning(this.filter.UnitId, this.filter.Type)
                .then(async results => {
                    let existedItem = {};
                    this.detailOptions.CountConfig = await this.service.getCountByProcessAndYarn(this.data.ProcessType, this.data.MaterialTypeId, this.data.LotId, this.data.UnitDepartmentId);
                    if (!this.detailOptions.CountConfig) {
                        this.error.LotId = "Count is not created with this Lot";
                        return [];
                    } else {
                        this.error.LotId = undefined;
                    }
                    // console.log(this.detailOptions.CountConfig);
                    this.detailOptions.MachineSpinnings = results;
                    if (this.data.Id) {
                        existedItem = this.data;
                    }
                    else {
                        // if(this.data.Date && this.data.Shift && this.data.Group && this.data.Group != "" && this.data.Shift != ""){
                        //     existedItem = await this.service.getByHeader(this.data.Date, this.processType, this.materialType.Id, this.lot.Id, this.data.Shift, this.data.Group, this.unit.Id);
                        //     if (existedItem.Items && existedItem.Items.length > 0) {
                        //         alert("Data already exist with this configuration");
                        //         this.inputDate = undefined;
                        //         this.processType = this.typeOptions[0];
                        //         this.materialType = undefined;
                        //         this.lot = undefined;
                        //         this.shift = this.shiftOptions[0];
                        //         this.group = undefined;
                        //         this.unit = undefined;
                        //         return [];
                        //     }
                        // }else{
                        existedItem = {};
                        existedItem.Items = [];
                        // }

                    }
                    // results.data = results.data.filter((el) => !existedItem.Items.some((al) => el.Id == al.MachineSpinning.Id));

                    var newItems = [];
                    for (var item of results) {
                        var dbItem = existedItem.Items.find(x => x.MachineSpinning.Id == item.Id);

                        var newData = {};
                        newData.MachineSpinning = {};
                        newData.Output = dbItem ? dbItem.Output : 0;
                        newData.MachineSpinning.No = item.No;
                        newData.MachineSpinning.Name = item.Name;
                        newData.MachineSpinning.UomUnit = item.UomUnit;
                        newData.MachineSpinning.Id = item.Id;
                        newData.MachineSpinningIdentity = item.Id;
                        newData.Bale = dbItem ? dbItem.Bale : 0;
                        newData.Eff = dbItem ? dbItem.Eff : 0;
                        newData.BadOutput = dbItem ? dbItem.BadOutput : 0;
                        newData.DeliveryTotal = dbItem ? dbItem.DeliveryTotal : 0;
                        newData.Spindle = dbItem ? dbItem.Spindle : 0;
                        newData.Waste = dbItem ? dbItem.Waste : 0;
                        newData.DrumTotal = dbItem ? dbItem.DrumTotal : 0;
                        if (this.itemTemp) {
                            for (var itemsTemp of this.itemTemp) {
                                if (itemsTemp.MachineSpinning.Id == newData.MachineSpinning.Id) {
                                    newData.ExistedItem = true;
                                }
                            }
                        }
                        newItems.push(newData);
                    }
                    return newItems;
                });

        }
    }

    processTypeChanged(n, o) {
        if (this.processType && this.processType != "") {
            this.data.ProcessType = this.processType;
            this.detailOptions.ProcessType = this.processType;
            if (this.processType == "Blowing") {
                this.itemsColumnsHeader = [
                    "Nomor Mesin",
                    "Merk Mesin",
                    "Output (Counter)",
                    "UOM",
                    "Bale",
                    "Bad Output",
                    "Eff%"
                ];

            } else if (this.processType == "Flyer") {
                this.itemsColumnsHeader = [
                    "Nomor Mesin",
                    "Merk Mesin",
                    "Output (Counter)",
                    "UOM",
                    "Bale",
                    "Total Delivery",
                    "Spindle Kosong",
                    "Eff%"
                ];
            } else if (this.processType == "Winder") {
                this.itemsColumnsHeader = [
                    "Nomor Mesin",
                    "Merk Mesin",
                    "Output (Counter)",
                    "UOM",
                    "Bale",
                    "Waste",
                    "Total Drum",
                    "Eff%"
                ];
            } else {
                this.itemsColumnsHeader = [
                    "Nomor Mesin",
                    "Merk Mesin",
                    "Output (Counter)",
                    "UOM",
                    "Bale",
                    "Eff%"
                ];
            }
            this.isItem = true;
            this.fillItems();
        } else {
            this.data.ProcessType = null;
            this.data.Items = [];
            this.itemsColumnsHeader = [
                "Nomor Mesin",
                "Merk Mesin",
                "Output (Counter)",
                "UOM",
                "Bale",
                "Eff%"
            ];
            this.isItem = false;
        }
    }

    inputDateChanged(n, o) {
        if (this.inputDate) {
            this.data.Date = this.inputDate;
            // this.fillItems();
        } else {
            this.data.Date = null;
            this.data.Items = [];
        }
    }

    materialTypeChanged(n, o) {
        if (this.materialType && this.materialType.Id) {
            this.lotFilter = { "YarnTypeIdentity": this.materialType.Id };
            this.data.MaterialTypeId = this.materialType.Id;
            this.fillItems();
        } else {
            this.data.MaterialTypeId = null;
            this.data.Items = [];
        }
    }

    async lotChanged(n, o) {

        if (this.lot && this.lot.Id) {

            let check = await this.service.validateLotInCount(this.lot.Id);
            if (check) {
                if (this.error) {
                    this.error.LotId = undefined;
                }

                this.data.LotId = this.lot.Id;
                this.fillItems();
            } else {
                this.error.LotId = "Count is not created with this Lot";
            }

        } else {
            this.data.LotId = null;
            this.data.Items = [];
        }
    }

    shiftChanged(n, o) {
        if (this.shift && this.shift != "") {
            this.data.Shift = this.shift;
            // this.fillItems();
        } else {
            this.data.Shift = null;
            this.data.Items = [];
        }
    }

    groupChanged(n, o) {
        if (this.group && this.group != "") {
            this.data.Group = this.group;
            // this.fillItems();
        } else {
            this.data.Group = null;
            this.data.Items = [];
        }

    }

    unitChanged(newValue, oldValue) {

        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
            this.fillItems();
        } else {
            this.data.UnitDepartmentId = 0;
            this.data.Items = [];
        }
    }

    get lotLoader() {
        //return LotLoader;
        return LotLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get grandTotal() {
        let result = 0;
        if (this.data.Items && this.data.Items.length > 0) {
            for (let item of this.data.Items) {
                if (item.Bale)
                    result += item.Bale;
            }
        }
        return result;
    }

    get unitLoader() {
        return UnitLoader;
    }
}
