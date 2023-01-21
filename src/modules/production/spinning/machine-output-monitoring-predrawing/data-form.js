import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService } from './service';
import moment from 'moment';

var LotLoader = require('../../../../loader/lot-configuration-loader');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var CountConfigurationLoader = require('../../../../loader/count-configuration-loader');
@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable readOnly;
    @bindable processType = "Pre-Drawing";
    @bindable materialType;
    @bindable lot;
    @bindable shift;
    @bindable group;
    @bindable unit;
    @bindable isItem = true;
    @bindable detailOptions;
    @bindable error;
    @bindable countConfiguration;
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
    countFilter = {};
    shiftList = ["", "Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"];
    detailOptions = {};
    itemsColumnsHeader = [
        "Line Mesin",
        "Nomor Mesin",
        "Merk Mesin",
        "Output (Counter)",
        "UOM",
        "Bale",
        "Eff%"
    ];
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
        console.log(this);
        // this.bindingEngine = bindingEngine
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.isItem = tu;
        this.data.ProcessType = this.processType;
        this.detailOptions.ProcessType = this.processType;
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
                if (this.data.UnitDepartmentId && this.data.ProcessType) {
                    this.coreService.searchMachineSpinning(this.data.UnitDepartmentId, this.data.ProcessType)
                        .then(result2 => {

                            this.masterMachine = result2;
                            if (this.data.Items) {
                                for (var item of this.data.Items) {
                                    item.Identity = item.Id;
                                    item.MachineSpinningIdentity = item.MachineSpinning.Id;
                                    var dbItem = result2.find(x => x.Id == item.MachineSpinning.Id);
                                    item.MachineSpinning.Line = dbItem.Line;
                                }
                                this.itemTemp = this.data.Items
                            }
                        });
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
        if (this.data.CountConfiguration && this.data.CountConfiguration.Id) {

            this.countConfiguration = this.data.countRes;
            this.countConfiguration.Count = this.data.CountConfiguration.Count;
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
                    this.detailOptions.CountConfig = this.countConfiguration;
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
                        newData.MachineSpinning.Line = item.Line;
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

    materialTypeChanged(n, o) {
        if (this.materialType && this.materialType.Id) {
            // this.lotFilter = { "YarnTypeIdentity": this.materialType.Id };
            this.data.MaterialTypeId = this.materialType.Id;
            // this.fillItems();
        } else {
            this.data.MaterialTypeId = null;
            this.data.Items = [];
        }
    }

    async lotChanged(n, o) {

        if (this.lot && this.lot.Id) {
            this.data.LotId = this.lot.Id;
            if (this.lot.YarnType) {
                this.materialType = {
                    Id: this.lot.YarnType.Id,
                    Name: this.lot.YarnType.Name
                };
                let countData = await this.service.getCountByProcessAndYarn(this.processType, this.materialType.Id, this.data.UnitDepartmentId);

                if (countData) {
                    this.countConfiguration = countData;
                    this.fillItems();
                } else {
                    if (this.error) {
                        this.error.LotId = "Cannot find Count with this Lot Data";
                    } else {
                        this.error = {
                            LotId: "Cannot find Count with this Lot Data"
                        };
                    }
                }
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
            this.lotFilter = {
                "UnitDepartmentId": this.unit.Id
            };
            // this.countFilter = { "ProcessType": this.processType, "UnitDepartmentId": this.unit.Id };
            this.fillItems();
        } else {
            this.data.UnitDepartmentId = 0;
            this.data.Items = [];
        }
    }
    countConfigurationChanged(n, o) {
        if (this.countConfiguration && this.countConfiguration.Id) {
            this.data.CountConfigurationId = this.countConfiguration.Id;
            this.data.CountConfigurationName = this.countConfiguration.Count;

        } else {
            this.data.CountConfigurationId = null;
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

    get countConfigurationLoader() {
        return CountConfigurationLoader;
    }

    countView(count) {
        var materialComposition = count.MaterialComposition;

        if (materialComposition) {
            return count.Count + " - " + materialComposition[0].LotNo;
        } else {
            return count.Count;
        }

    }
}
