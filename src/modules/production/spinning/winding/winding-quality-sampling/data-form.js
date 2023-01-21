import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    spinningUnitFilter = {
        "division.name": "SPINNING"
    }

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    get isFilter() {
        this.filter = {
            unitId: this.data.unitId
        };
        return this.filter;
    }

    attached() {
    }

    unitChanged(e) {
        var selectedUnit = e.detail;
        if (selectedUnit) {
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
            if (!this.readOnly) {
                this.data.machine = {};
                this.machineChanged({});
            }
            if (this.data.unitId) {
                this.filter = {
                    unitId: this.data.unitId
                };
            }
        }
    }

    machineChanged(e) {
        var selectedMachine = e.detail || {};
        if (selectedMachine)
            this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    threadChanged(e) {
        var selectedThread = e.detail;
        if (selectedThread) {
            this.data.usterId = selectedThread._id ? selectedThread._id : "";
        }
    }
}