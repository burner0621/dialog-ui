import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var YarnsLoader = require('../../../../loader/yarn-spinning-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var MachineLoader = require('../../../../loader/machine-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;


    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.Spinning && this.data.Spinning._id) {
            this.selectedSpinning = this.data.Spinning;
        }
        if (this.data.Yarn && this.data.Yarn.Id) {
            this.selectedYarn = this.data.Yarn;
        }
        if (this.data.Machine && this.data.Machine._id) {
            this.selectedMachine = this.data.Machine;
        }
    }

    numberOptions = {
        control: {
          length: 2
        }
      }

    itemColumns = ["Berat Benang per Cone", "Good Output", "Bad Output", "Jumlah Drum"];
    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    @bindable machineFilter = { "unit.name": { "$exists": true } };
    shiftItems = ["", "Shift I: 06.00 - 14.00", "Shift II: 14.00 - 22.00", "Shift III: 22.00 - 06.00"];

    @bindable selectedYarn;
    async selectedYarnChanged(newVal, oldVal) {
        if (this.selectedYarn && this.selectedYarn.Id) {
            this.data.Yarn = this.selectedYarn;

            this.getLotYarn();
        }
        else {
            this.data.Yarn = null;
            this.data.LotYarn = null;

            this.selectedLotYarn = null;
        }
    }

    get yarnsLoader() {
        return YarnsLoader;
    }

    @bindable selectedLotYarn;
    selectedLotYarnChanged(newVal, oldVal) {
        if (this.selectedLotYarn && this.selectedLotYarn.Id) {
            this.data.LotYarn = this.selectedLotYarn;
        } else {
            this.data.LotYarn = null;
        }
    }

    async getLotYarn() {
        if (this.selectedSpinning && this.selectedMachine && this.selectedYarn && this.selectedSpinning._id && this.selectedMachine._id && this.selectedYarn.Id) {
            var info = {
                spinning: this.selectedSpinning.name,
                machine: this.selectedMachine.name,
                yarn: this.selectedYarn.Name
            };
            this.selectedLotYarn = await this.service.getLotYarn(info)
        }
    }

    @bindable selectedSpinning;
    async selectedSpinningChanged(newVal, oldVal) {
        if (this.selectedSpinning && this.selectedSpinning._id) {
            this.data.Spinning = this.selectedSpinning;
            this.machineFilter = { "unit.name": { "$regex": this.selectedSpinning.name, "$options": "i" } };

            if (oldVal) {
                this.selectedMachine = null;
            }

            this.getLotYarn();
        }
        else {
            this.machineFilter = { "unit.name": { "$exists": true } };
            this.data.Spinning = null;
            this.data.Machine = null;
            this.data.LotYarn = null;

            this.selectedMachine = null;
            this.selectedLotYarn = null
        }
    }

    get spinningLoader() {
        return UnitLoader;
    }

    @bindable selectedMachine;
    async selectedMachineChanged(newVal, oldVal) {
        if (this.selectedMachine && this.selectedMachine._id) {
            this.data.Machine = this.selectedMachine;

            this.getLotYarn();
        }
        else {
            this.data.Machine = null;
            this.data.LotYarn = null;

            this.selectedLotYarn = null;
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    YarnOutputItemsInfo = {
        columns: [
            { header: "Berat Benang per Cone", value: "YarnWeightPerCone" },
            { header: "Good Output", value: "GoodOutput" },
            { header: "Bad Output", value: "BadOutput" },
            { header: "Total Drum", value: "DrumTotal" }
        ],
        onAdd: function () {
            this.data.YarnOutputItems.push({
                YarnWeightPerCone: 1.89,
                GoodOutput: 0,
                BadOutput: 0,
                DrumTotal: 0
            });
        }.bind(this)
    };
} 