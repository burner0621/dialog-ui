import { inject, bindable, computedFrom } from 'aurelia-framework';

var UnitLoader = require('../../../loader/unit-loader');
var MachineLoader = require('../../../loader/machine-loader');
var YarnLoader = require('../../../loader/yarn-spinning-loader');


export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable readOnly;
    @bindable unit;
    @bindable machine;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }



    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.selectedUnit = this.data.Unit || null;
        this.selectedYarn = this.data.Yarn || null;
        this.selectedMachine = this.data.Machine || null;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    @bindable machineFilter = { "unit.name": { "$exists": true } };

    @bindable selectedUnit;
    selectedUnitChanged(newVal, oldVal) {
        if (this.selectedUnit && this.selectedUnit._id) {
            this.data.Unit = this.selectedUnit;
            this.machineFilter = { "unit.name": { "$regex": this.selectedUnit.name, "$options": "i" } };
            if(oldVal){
                this.selectedMachine=null;
            }
        }
        else {
            this.machineFilter = { "unit.name": { "$exists": true } };
            this.data.Spinning = null;
            this.data.Yarn = null;
            this.data.Machine = null;

            this.selectedYarn = null;
            this.selectedMachine = null;
        }
    }

    @bindable selectedMachine;
    selectedMachineChanged(newValue, oldValue) {
        if (this.selectedMachine && this.selectedMachine._id) {
            this.data.Machine = this.selectedMachine;
        }
        else {
            this.data.Machine = null;
        }
    }

    @bindable selectedYarn;
    selectedYarnChanged(newVal, oldVal) {
        if (this.selectedYarn && this.selectedYarn.Id) {
            this.data.Yarn = this.selectedYarn;
        }
        else {
            this.data.Yarn = null;
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get yarnLoader() {
        return YarnLoader;
    }

}
