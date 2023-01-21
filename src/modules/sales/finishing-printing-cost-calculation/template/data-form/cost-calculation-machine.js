import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../../components/dialog/dialog';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const ProductLoader = require('../../../../../loader/product-loader');
const CategoryLoader = require('../../../../../loader/category-loader');
const MachineLoader = require('../../../../../loader/machines-loader');
import { Service } from '../../service';
import { ServiceCore } from '../../service-core';

import { UtilityForm } from '../../dialogs/utility-form';

import { DepretiationForm } from '../../dialogs/depretiation-form';
import { ChemicalAddForm } from '../../dialogs/chemical-add-form';
import { ChemicalListForm } from '../../dialogs/chemical-list-form';

const rateNumberFormat = "0,0.000";

// const materialLoader = require('../../../../loader/material-md-loader');
const UomLoader = require('../../../../../loader/uom-loader');

@inject(Dialog, Service, ServiceCore)
export class CostCalculationMaterial {
    @bindable selectedMachine;

    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor(dialog, service, serviceCore) {
        this.dialog = dialog;
        this.service = service;
        this.serviceCore = serviceCore
    }

    @bindable isProcess = false;
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
        this.disabled = true;
        this.selectedMachine = this.data.Machine || undefined;

        this.chemicals = this.data.Chemicals && this.data.Chemicals.length > 0 ? this.data.Chemicals : [];
        if (this.data.Machine) {
            this.data.Utility = this.selectedMachine.Electric + this.selectedMachine.Steam + this.selectedMachine.Water + this.selectedMachine.Solar + this.selectedMachine.LPG;
            this.data.Total = this.chemicalCost + this.data.Utility + this.data.Depretiation;
        }
        if (this.data.Step) {
            this.data.StepProcessId = this.data.Step.Id
        }

        // console.log(this.data)
        if (this.data.Id) {

            this.isReadOnly = true;
        }
        // console.log(this.data);
    }

    bind() {

    }

    // @bindable productCode = "Test";


    get machineLoader() {
        return MachineLoader;
    }

    get chemicalCost() {
        if (this.chemicals.length > 0) {
            return this.chemicals.reduce((previousValue, currentValue) => {
                var res = previousValue + (currentValue.Chemical.Price * currentValue.ChemicalQuantity)
                this.data.Total = res + this.data.Utility + this.data.Depretiation;
                return res;
            }, 0);
        } else {
            return 0;
        }
    }

    selectedMachineChanged(n, o) {
        if (this.selectedMachine) {
            this.chemicals = [];
            this.data.Machine = this.selectedMachine;
            this.data.MachineId = this.selectedMachine.Id;
            this.data.Utility = this.selectedMachine.Electric + this.selectedMachine.Steam + this.selectedMachine.Water + this.selectedMachine.Solar + this.selectedMachine.LPG;
            this.data.Total = this.chemicalCost + this.data.Utility + this.data.Depretiation;
        }
    }

    chemicals = [];
    chemicalAdd() {
        if (!this.selectedMachine)
            alert("Anda belum memilih mesin!");
        else {
            var params = {
                "machine": this.selectedMachine,
                "chemicals": this.chemicals
            }
            this.dialog.show(ChemicalAddForm, params)
                .then(response => {
                    console.log(response)
                    this.chemicals = response.output;
                    this.data.Chemicals = this.chemicals;
                });
        }
    }

    chemicalToggle() {
        if (!this.selectedMachine)
            alert("Anda belum memilih mesin!");
        else
            this.dialog.show(ChemicalListForm, this.chemicals)
                .then(response => {
                    return response;
                });
    }

    utilityToggle() {
        if (!this.selectedMachine)
            alert("Anda belum memilih mesin!");
        else
            this.dialog.show(UtilityForm, this.selectedMachine)
                .then(response => {
                    return response;
                });
    }
    depretiationToggle() {
        if (!this.selectedMachine)
            alert("Anda belum memilih mesin!");
        else
            this.dialog.show(DepretiationForm, this.selectedMachine)
                .then(response => {
                    return response;
                });
    }
  
}