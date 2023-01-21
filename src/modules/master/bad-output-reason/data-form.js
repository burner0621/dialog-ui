import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable item;
    @bindable title;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.item = this.context.item;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    machineInfo = {
        columns: [
            { header: "Mesin", value: "machine" },
        ],
        onAdd: function () {
            this.data.MachineDetails = this.data.MachineDetails || [];

            var machine = {
                MachineId: 0,
                Name: "",
                Code: "",
            }
            this.data.MachineDetails.push(machine);

        }.bind(this),
        onRemove: function () {
            console.log("machine removed");
        }.bind(this)
    };
}