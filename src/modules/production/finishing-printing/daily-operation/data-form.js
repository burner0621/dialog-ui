import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis');
var MachineLoader = require('../../../../loader/dyeing-printing-machines-loader');
var KanbanLoader = require('../../../../loader/kanban-loader');

@inject(Service, BindingEngine, Element)
export class DataForm {
    @bindable readOnlyInput = false;
    @bindable readOnlyOutput = false;
    @bindable readOnly = false;
    @bindable output = false;
    @bindable input = false;
    @bindable data = {};
    @bindable error = {};
    @bindable machine;
    @bindable step;
    @bindable kanban;

    @bindable localInputDate = undefined;
    @bindable localOutputDate = undefined;

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 8
        }
    };

    auNumericInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 3
        }
    };

    auDropdownInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    shiftOptions = ['', 'Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    actionOptions = ['', 'Reproses', 'Digudangkan', 'Dibuang'];
    timePickerShowSecond = false;
    timePickerFormat = "HH:mm";

    badOutputInfo = {
        columns: [
            { header: "Alasan", value: "badOutputReason" },
            { header: "Jumlah Panjang (m)", value: "precentage" },
            { header: "Action", value: "action" },
            { header: "Mesin Penyebab Bad Output", value: "machine" },
            { header: "Keterangan", value: "description" }
        ],
        onAdd: function () {
            // this.context.ItemsCollection.bind()
            this.data.BadOutputReasons = this.data.BadOutputReasons || [];
            this.data.BadOutputReasons.push({ BadOutputReason: "", Precentage: 0, Description: "" });
        }.bind(this),
        onRemove: function () {
            console.log("bad output reason removed");
        }.bind(this)
    };

    constructor(service, bindingEngine, element) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    async bind(context) {

        this.context = context;
        this.isCreateOutput = context.isCreateOutput;
        this.data = this.context.data;
        console.log(this.data);
        this.error = this.context.error;
        this.localInputDate = new Date(Date.parse(this.data.DateInput));
        this.localOutputDate = new Date(Date.parse(this.data.DateOutput));
        this.filterReason = {};
        var reason = {};
        var machineCodes = {};
        // if (this.data.machine) {
        //     // reason = {

        //     //         "machines" : {
        //     //             "$elemMatch" : {
        //     //                 "code" : this.data.machine.code
        //     //             }
        //     //         },
        //     //         "action": this.data.action ? this.data.action : ""

        //     // }
        // }
        var _machineCode = [];
        if (this.data.Kanban && this.data.Machine && this.output) {
            var filterDaily = {
                KanbanCode: this.data.Kanban.Code,
                IsDeleted: false,
                Type: "input"
            };
            var dailyOperations = await this.service.search({ filter: JSON.stringify(filterDaily) });
            var _machineCode = [];
            _machineCode.push(this.data.Machine.Code);
            for (var item of dailyOperations.data) {
                if (_machineCode.length > 0) {
                    var dup = _machineCode.find(mc => mc == item.Machine.Code);
                    if (!dup)
                        _machineCode.push(item.Machine.Code);
                }
                else {
                    _machineCode.push(item.Machine.Code);
                }
            }
            machineCodes = {
                Code: _machineCode,
                Kanban: this.data.Kanban.Code
            }

            if (!this.data.Id && this.output && this.data.Kanban.Id != 0)
                this.data.GoodOutput = Number(this.data.Kanban.Cart.Qty);


        }
        reason = {
            "machines": {
                "$elemMatch": {
                    "code": this.data.Machine.Code
                }
            }
        }
        this.filterReason = { reason: reason, machineCode: machineCodes };

        this.filterMachine = {
            "UnitDivisionName": "FINISHING & PRINTING"
        }

        // this.selectMachine = ["code", "name", "process", "year", "condition", "monthlyCapacity", "code", "manufacture", "steps.step.process", "steps.step.code", "steps.step._id"];
        // this.selectStep = ["process", "processArea", "deadline", "isNotDone"];
        // this.selectKanban = ["code", "productionOrderId",
        //     "productionOrder._id", "productionOrder.orderNo", "productionOrder.salesContractNo",
        //     "productionOrder.materialId", "productionOrder.material.code", "productionOrder.material.name",
        //     "productionOrder.materialConstruction._id", "productionOrder.materialConstruction.name",
        //     "productionOrder.yarnMaterialId",
        //     "productionOrder.yarnMaterial._id", "productionOrder.yarnMaterial.name",
        //     "productionOrder.orderType.name", "selectedProductionOrderDetail.code",
        //     "selectedProductionOrderDetail.colorRequest", "selectedProductionOrderDetail.colorTemplate",
        //     "selectedProductionOrderDetail.uom._id", "selectedProductionOrderDetail.uom.unit",
        //     "productionOrder.materialWidth", "cart.cartNumber", "cart.qty",
        //     "cart.code", "cart.pcs", "cart.uom._id", "cart.uom.unit", "instruction.code",
        //     "instruction.name", "grade", "isComplete", "currentStepIndex", "currentQty",
        //     "oldKanbanId", "oldKanban.cart.cartNumber", "productionOrder.finishWidth",
        //     "instruction.steps.process", "instruction.steps.processArea",
        //     "instruction.steps.deadline", "instruction.steps.isNotDone",
        //     "productionOrder.orderTypeId", "productionOrder.orderType.code",
        //     "instruction.steps._id", "selectedProductionOrderDetail.uomId", "oldKanban.cart.code", "step._id"
        // ];
    }

    localInputDateChanged(newValue) {
        if (this.localInputDate != null) {
            this.data.DateInput = this.localInputDate;
            this.data.TimeInput = this.data.DateInput.getTime();
        }

    }

    localOutputDateChanged(newValue) {
        if (this.localOutputDate != null) {
            this.data.DateOutput = this.localOutputDate;
            this.data.TimeOutput = this.data.DateOutput.getTime();
        }
    }

    get isFilterKanban() {
        this.filterKanban = {};
        if (this.data.Step) {
            this.filterKanban = {
                "CustomFilter#IntructionStepProcess": this.data.Step.Process
            };
        }
        return this.filterKanban;
    }

    get hasStep() {
        return this.data && this.data.Step;
    }

    get hasMachine() {
        return this.data && this.data.Machine;
    }

    get hasKanban() {
        return this.data && this.data.Kanban;
    }

    get hasError() {
        return this.output && this.error && this.error.BadOutputReasons && typeof this.error.BadOutputReasons === "string";
    }

    get hasBadOutput() {
        return this.data && this.data.Machine && this.data.Machine.Id != 0 && this.data.BadOutput && this.data.BadOutput > 0 && this.output;
    }

    // get getFilterReason(){
    //     if(this.data.machine){
    //         reason = {

    //                 "machines" : {
    //                     "$elemMatch" : {
    //                         "code" : this.data.machine.code
    //                     }
    //                 },
    //                 "action": this.data.action ? this.data.action : ""

    //         }
    //     }
    //     var _machineCode=[];
    //     if(this.data.kanban && this.data.machine && this.data.badOutput>0){
    //         var filterDaily={
    //             "kanban.code":this.data.kanban.code,
    //             _deleted:false,
    //             type:"input"
    //         };
    //         var dailyOperations= this.service.search(filterDaily);
    //          var _machineCode=[];
    //         _machineCode.push(this.data.machine.code);
    //         for (var item of dailyOperations.data){
    //             if(_machineCode.length>0){
    //                 var dup=_machineCode.find(mc=>mc==item.machine.code);
    //                 if(!dup)
    //                     _machineCode.push(item.machine.code);
    //             }
    //             else{
    //                 _machineCode.push(item.machine.code);
    //             }
    //         }
    //         machineCodes={
    //             code:_machineCode,
    //             kanban:this.data.kanban.code
    //         }
    //         console.log(machineCodes)
    //     }

    //     this.filterReason={reason:reason,machineCode:machineCodes};

    //     console.log(this.filterReason)
    //     return this.filterReason;
    // }

    async kanbanChanged(newValue, oldValue) {
        var selectedKanban = newValue;

        if (selectedKanban) {
            // this.data.kanbanId = selectedKanban._id;
            this.data.Kanban = selectedKanban;
            if (this.input && this.data.Kanban.Id != 0)
                this.data.Input = Number(selectedKanban.Cart.Qty);
            if (this.output && this.data.Kanban.Id != 0)
                this.data.GoodOutput = Number(selectedKanban.Cart.Qty);

            console.log(this.data.GoodOutput);
            if (this.output) {
                var filterDaily = {
                    "KanbanCode": this.data.Kanban.Code,
                    IsDeleted: false,
                    Type: "input"
                };

                var dailyOperations = await this.service.search({ filter: JSON.stringify(filterDaily) });
                var _machineCode = [];
                _machineCode.push(this.data.machine.code);
                for (var item of dailyOperations.data) {
                    if (_machineCode.length > 0) {
                        var dup = _machineCode.find(mc => mc == item.machine.code);
                        if (!dup)
                            _machineCode.push(item.machine.code);
                    }
                    else {
                        _machineCode.push(item.machine.code);
                    }
                }

                // var machineCode=[];
                // if(this.data.step){
                //     for(var mc of this.data.kanban.instruction.steps){
                //         machineCode.push(mc.machine.code);
                //         if(this.data.stepId==mc._id){
                //             break;
                //         }
                //     }
                // }
                this.filterReason = {
                    reason: this.filterReason.reason,
                    machineCode: {
                        code: _machineCode,
                        kanban: this.data.kanban.code
                    }
                };

            }
        }
        else {
            delete this.data.kanbanId;
            this.data.kanban = undefined;
        }
    }

    stepChanged(newValue, oldValue) {
        var selectedStep = newValue;

        if (selectedStep) {

            this.data.Step = selectedStep;
            this.data.Step.StepId = selectedStep.Id;
        }
        else {
            delete this.data.Step.Id;
            this.data.Step = undefined;
        }

        this.kanbanAU.editorValue = "";
    }

    machineChanged(newValue, oldValue) {
        var selectedMachine = newValue;
        if (selectedMachine) {
            this.data.Machine = selectedMachine;
            // this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
            this.filterReason = {
                reason: {
                    "machines": {
                        "$elemMatch": {
                            "code": this.data.Machine.Code
                        }
                    }
                }
            }
        }
        else {
            this.data.Machine = {};
            this.data.Kanban = {};
            this.kanban = null;
            this.data.GoodOutput = 0;
            this.localOutputDate = null;
            this.localInputDate = null;

            delete this.data.Machine.Id;
            this.filterReason = {};
        }
        if (this.data && this.data.BadOutputReasons && this.data.BadOutputReasons.length > 0) {
            var count = this.data.BadOutputReasons.length;
            for (var a = count; a >= 0; a--) {
                this.data.badOutputReasons.splice((a - 1), 1);
            }
        }
        // console.log(this.ItemsCollection);
        // console.log(this.stepAU);
        this.stepAU.editorValue = "";
        this.kanbanAU.editorValue = "";
    }

    get machineLoader() {
        return MachineLoader;
    }

    get stepLoader() {

        return this.data.Machine && this.data.Machine.Steps ? this.data.Machine.Steps : [];
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    kanbanView(kanban) {
        if (kanban.ProductionOrder) {
            return `${kanban.ProductionOrder.OrderNo} - ${kanban.Cart.CartNumber}`;
        }
        else
            return '';
    }
}
