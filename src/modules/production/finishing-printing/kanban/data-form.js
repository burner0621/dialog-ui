import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

var moment = require('moment');

var InstructionLoader = require('../../../../loader/instruction-no-id-loader');
var KanbanLoader = require('../../../../loader/kanban-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable productionOrderDetails = [];
    @bindable instruction;

    @bindable isEdit;
    @bindable isView;
    @bindable isReprocess;

    @bindable productionOrder;
    @bindable kanban;

    kereta = "Kereta";
    options = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.element = element;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.Carts = this.data.Carts || [];

        if (this.data.ProductionOrder && this.data.ProductionOrder.Details && this.data.ProductionOrder.Details.length > 0) {
            this.productionOrderDetails = this.data.ProductionOrder.Details;
            this._mapProductionOrderDetail();

            if (this.data.countDoneStep == this.data.Instruction.Steps.length) {
                this.options.disabledStepAdd = true;
            }
        }

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.oldKanbanStatus = this.data.OldKanban && Object.getOwnPropertyNames(this.data.OldKanban).length > 0;

        if (this.isReprocess || this.oldKanbanStatus) {
            this.kereta = "Kereta Baru";
        }

        if (this.isReprocess) {
            var self = this;
            this.data.reprocessStatus = true;

            /* Constant */
            this.data.SEMUA = "Semua";
            this.data.SEBAGIAN = "Sebagian";
            this.data.LANJUT_PROSES = "Lanjut Proses";
            this.data.REPROSES = "Reproses";

            this.query = { "IsComplete": false };
            this.reprocess = [{ label: this.data.SEMUA, value: this.data.SEMUA }, { label: this.data.SEBAGIAN, value: this.data.SEBAGIAN }];
            this.options = { "isReprocess": this.isReprocess, reprocessClick: function (reprocess) { self.changeInstruction(reprocess); } };
            this.cartInfo.columns.splice(0, 0, { header: "", value: "reprocess" });
            this.options.reprocessStepsHide = true;
        }

        //#region  old select
        /*
        this.selectProductionOrder = [
            "_id",
            "material._id", "materialConstruction._id", "yarnMaterial._id",
            'orderNo', 'orderQuantity', 'salesContractNo', 'salesContractId',
            'buyerId', 'buyer.name', 'buyer._id', 'buyer.code', 'processTypeId', 'processType.code',
            'processType.orderTypeId', 'processType.orderType.code',
            'processType.orderType.name', 'processType.name',
            'materialId', 'material.code', 'material.name',
            'materialConstructionId', 'materialConstruction.code',
            'materialConstruction.name', 'yarnMaterialId', 'materialWidth',
            'yarnMaterial.code', 'yarnMaterial.name', 'handlingStandard',
            'finishWidth', 'orderType.name', 'orderType.code', 'orderTypeId',
            'details.code','details.colorRequest', 'details.colorTemplate',
            'details.colorType.code', 'details.colorType.name', 'details.colorType._id',
            'details.quantity', 'details.uom', 'details.uomId', 'uom.unit', 'deliveryDate'
        ];

        this.selectInstruction = [
            'code', 'name', 'steps._id', 'steps.process',
            'steps.stepIndicators.name', 'steps.stepIndicators.value',
            'steps.stepIndicators.uom', 'steps.alias', 'steps.processArea'
        ];

        this.selectKanban = [
            "productionOrder._id", 'productionOrder.buyer', 'productionOrder.deliveryDate',
            "productionOrder.materialConstruction._id", "productionOrder.yarnMaterial._id",
            '_id', 'code', 'productionOrderId', 'productionOrder.orderNo',
            'productionOrder.orderQuantity', 'productionOrder.salesContractNo',
            'productionOrder.salesContractId', 'productionOrder.buyerId',
            'productionOrder.buyer.name', 'productionOrder.processTypeId',
            "productionOrder.material._id", 'productionOrder.materialWidth',
            'productionOrder.processType.code', 'productionOrder.processType.orderTypeId',
            'productionOrder.processType.orderType.code', 'productionOrder.processType.orderType.name',
            'productionOrder.processType.name', 'productionOrder.materialId', 'productionOrder.material.code',
            'productionOrder.material.name', 'productionOrder.materialConstructionId',
            'productionOrder.materialConstruction.code', 'productionOrder.materialConstruction.name',
            'productionOrder.yarnMaterialId', 'productionOrder.yarnMaterial.code',
            'productionOrder.yarnMaterial.name', 'productionOrder.handlingStandard',
            'productionOrder.finishWidth', 'selectedProductionOrderDetail.code',
            'selectedProductionOrderDetail.colorRequest', 'selectedProductionOrderDetail.colorTemplate',
            'selectedProductionOrderDetail.colorTypeId', 'selectedProductionOrderDetail.quantity',
            'cart.cartNumber', 'cart.qty', 'cart.uomId', 'cart.uom.unit', 'cart.pcs',
            'instructionId', 'instruction.code', 'instruction.name', 'instruction.steps._id',
            'instruction.steps.process', 'instruction.steps.stepIndicators.name', 'instruction.steps.stepIndicators.value',
            'instruction.steps.stepIndicators.uom', 'instruction.steps.machine._id',
            'instruction.steps.machine.code', 'instruction.steps.machine.name',
            'instruction.steps.machine.monthlyCapacity', 'instruction.steps.processArea',
            'instruction.steps.alias', 'instruction.steps.deadline', 'instruction.steps.processArea',
            'instruction.steps.selectedIndex', 'instruction.steps.isNotDone',
            'grade', 'isComplete', 'currentStepIndex', 'currentQty', 'goodOutput',
            'badOutput', 'oldKanbanId', 'oldKanban.cart.cartNumber', 'isBadOutput',
            'isReproses', 'isInactive', 'productionOrder.orderType.name', 'productionOrder.orderType.code', 'productionOrder.orderTypeId',
            'productionOrder.details', 'productionOrder.uom', 'productionOrder.uomId',
        ];
        */
        //#endregion
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    cartInfo = {
        columns: [
            { header: "Nomor Kereta", value: "CartNumber" },
            { header: "Panjang", value: "Qty" },
            { header: "Satuan", value: "Uom" },
            { header: "Jumlah PCS", value: "Pcs" },
        ],
        onAdd: function () {
            this.data.Carts.push({ CartNumber: "", Qty: 0, Uom: { Unit: "MTR" }, Pcs: 0 });
        }.bind(this),
        onRemove: function () {

        }.bind(this)
    };

    stepInfo = {
        columns: [
            { header: "No.", value: "index" },
            { header: "Proses", value: "Process" },
            { header: "Mesin", value: "Machine" },
            { header: "Area", value: "ProccessArea" },
            { header: "Target Selesai", value: "Deadline" }
        ],
        onAdd: function () {
            this.context.StepsCollection.bind();
            this.data.Instruction.Steps = this.data.Instruction.Steps || [];
            if (this.isReprocess || this.oldKanbanStatus) {
                this.data.CurrentIndex++;
                this.data.Instruction.Steps.splice(this.data.CurrentIndex, 0, {});
            }
            else
                this.data.Instruction.Steps.push({});
        }.bind(this),
        onRemove: function () {
            this.context.StepsCollection.bind();

            if (this.isReprocess || this.oldKanbanStatus)
                this.data.CurrentIndex--;
        }.bind(this)
    };

    async kanbanChanged(newValue, oldValue) {
        var kanban = newValue;

        if (kanban) {
            let oldKanban = await this.service.getById(kanban.Id)
            Object.assign(this.data, oldKanban);

            this.cartNumber = this.data.Cart.CartNumber;
            this.data.reprocessSteps = {
                "LanjutProses": [],
                "Reproses": [],
                "Original": []
            };

            this.data.reprocessSteps.Original = this.data.Instruction.Steps;
            for (var i = this.data.CurrentStepIndex; i < this.data.Instruction.Steps.length; i++) {
                this.data.reprocessSteps.LanjutProses.push(this.data.Instruction.Steps[i]);
            }

            this.data.reprocess = !this.data.reprocessStatus ? this.data.SEBAGIAN : true;

            for (var i = 0; i < this.data.CurrentStepIndex; i++) {
                this.data.reprocessSteps.Reproses.push(this.data.Instruction.Steps[i]);
            }


            this.data.OldKanbanId = oldKanban.Id;

            delete this.data.Cart;
            delete this.data.Id;
            delete this.data.Active;
            delete this.data.CreatedUtc;
            delete this.data.CreatedBy;
            delete this.data.CreatedAgent;
            delete this.data.LastModifiedUtc;
            delete this.data.LastModifiedBy;
            delete this.data.LastModifiedAgent;

            var currentStepIndex = this.data.CurrentStepIndex;
            var i = 1;

            this.data.Instruction.Steps = this.data.Instruction.Steps.map(function (s) {
                s.IsNotDone = i <= currentStepIndex ? false : true;
                i++;
                return s;
            });

            this.data.currentIndex = this.data.CurrentStepIndex - 1;

            this.instruction = this.data.Instruction;

            this.service.getDurationEstimation(this.data.ProductionOrder.ProcessType.Code, ["areas"])
                .then((result) => {
                    if (result.data.length > 0) {
                        this.data.durationEstimation = result.data[0];
                    }
                    else {
                        delete this.data.durationEstimation;
                    }

                    this.generateDeadlineReprocess();
                });
        }
        else {
            delete this.data.durationEstimation;
        }
    }

    async productionOrderChanged(newValue, oldValue) {
        this.productionOrderDetails = [];

        var productionOrder = newValue;
        if (productionOrder) {
            this.data.ProductionOrder = productionOrder;
            this.productionOrderDetails = [];

            for (var detail of productionOrder.Details) {
                this.productionOrderDetails.push(detail);
            }

            this._mapProductionOrderDetail();
            this.data.SelectedProductionOrderDetail = {};
            this.data.SelectedProductionOrderDetail = {
                Code: this.productionOrderDetails[0].Code,
                ColorRequest: this.productionOrderDetails[0].ColorRequest,
                ColorTemplate: this.productionOrderDetails[0].ColorTemplate,
                ColorTypeId: this.productionOrderDetails[0].ColorTypeId,
                Quantity: this.productionOrderDetails[0].Quantity,
            };

            for (var cart of this.data.Carts) {
                cart.Uom = {
                    Unit: "MTR"
                };
            }

            this.service.getDurationEstimationByProcessType(this.data.ProductionOrder.ProcessType.Code)
                .then((result) => {
                    if (result) {
                        this.data.durationEstimation = result
                    }
                    else {
                        delete this.data.durationEstimation;
                    }

                    this.generateDeadline();
                });
        }
        else {
            for (var cart of this.data.Carts) {
                cart.Uom = null;
            }
            delete this.data.ProductionOrder;
            delete this.data.productionOrderId;
            delete this.data.SelectedProductionOrderDetail;
            delete this.data.durationEstimation;
        }
    }

    @computedFrom("data.ProductionOrder")
    get hasProductionOrder() {
        return this.data.ProductionOrder;
    }

    get hasProductionOrderDetails() {
        return this.productionOrderDetails.length > 0;
    }

    get hasColor() {
        return this.data.SelectedProductionOrderDetail;
    }

    @computedFrom("data.Instruction")
    get hasInstruction() {
        return this.data.Instruction ? this.data.Instruction.Steps.length > 0 : false;
    }

    get instructionLoader() {
        return InstructionLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    kanbanView(kanban) {
        if (kanban.ProductionOrder) {
            return `${kanban.ProductionOrder.OrderNo} - ${kanban.Cart.CartNumber}`;
        }

        else
            return '';
    }

    _mapProductionOrderDetail() {
        this.productionOrderDetails.map(detail => {
            detail.toString = function () {
                return `${this.ColorRequest}`;
            }
            return detail;
        });
    }

    moveItemUp(event) {
        var steps = this.data.Instruction.Steps;
        if (steps && steps.length > 0 && steps[0].SelectedIndex != null && steps[0].SelectedIndex > 0 && (this.isReprocess || this.oldKanbanStatus ? !steps[steps[0].SelectedIndex].isNotDone : true)) {
            var selectedSteps = steps.splice(steps[0].SelectedIndex, 1);
            steps.splice(steps[0].SelectedIndex - 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].SelectedIndex - 1);
        }
        this.context.StepsCollection.bind();
        // console.log(steps);
    }

    moveItemDown(event) {
        var steps = this.data.Instruction.Steps;
        var stepDoneLength = (this.isReprocess && this.data.reprocess == this.data.SEMUA ? this.data.reprocessSteps.LanjutProses.length : this.oldKanbanStatus ? this.data.countDoneStep : 0);
        if (steps && steps.length > 0 && steps[0].SelectedIndex != null && steps[0].SelectedIndex < steps.length - 1 - stepDoneLength) {
            var selectedSteps = steps.splice(steps[0].SelectedIndex, 1);
            steps.splice(steps[0].SelectedIndex + 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].SelectedIndex + 1);
        }
        this.context.StepsCollection.bind();
        // console.log(steps);
    }

    setCurrentIndex(currentIndex) {
        for (var step of this.data.Instruction.Steps) {
            step.SelectedIndex = currentIndex;
        }
    }

    reprocessChanged(e) {
        if (e.detail) {
            this.currentReprocess = undefined;
            this.data.reprocessStatus = false;

            var reprocessString = this.cartNumber.split('/ ')[0];
            var originalCartNumber = this.cartNumber.split('/ ').slice(1).join('/ ');
            var extractNumber = null;
            var reprocessCartNumber = "";
            if (this.data.IsReprocess && reprocessString && reprocessString.charAt(0) == 'R') {
                extractNumber = parseInt(reprocessString.replace(/\D/g, ""));
                if (extractNumber) {
                    reprocessCartNumber = `R${extractNumber + 1}/ ${originalCartNumber}`
                } else {
                    reprocessCartNumber = `R1/ ${this.cartNumber}`
                }
            } else {
                reprocessCartNumber = `R1/ ${this.cartNumber}`
            }

            if (e.detail == this.data.SEBAGIAN) {
                this.data.Carts = [{ reprocess: this.data.LANJUT_PROSES, CartNumber: "", Qty: 0, Uom: { Unit: 'MTR' }, Pcs: 0 }, { reprocess: this.data.REPROSES, CartNumber: reprocessCartNumber, Qty: 0, Uom: { Unit: 'MTR' }, Pcs: 0 }];
                this.options.reprocessSome = true;
                this.options.reprocessStepsHide = true;
            }
            else {
                this.data.Carts = [{ CartNumber: reprocessCartNumber, Qty: 0, Uom: { Unit: 'MTR' }, pcs: 0 }];
                this.options.reprocessSome = false;
                this.options.reprocessStepsHide = false;
                this.data.Instruction.Steps = this.data.reprocessSteps.Original;
            }
        }
    }

    instructionChanged(newValue, oldValue) {
        this.data.Instruction = newValue;
        // console.log(this.data.Instruction);
        if (!this.isReprocess)
            this.generateDeadline();
    }

    changeInstruction(reprocess) {
        if (reprocess != this.currentReprocess) {
            this.options.reprocessStepsHide = false;
            this.options.disabledStepAdd = false;
            this.data.Instruction.Steps = this.data.reprocessSteps.Original;

            if (reprocess === this.data.LANJUT_PROSES) {
                setTimeout(() => {
                    this.options.disabledStepAdd = true;
                    this.data.Instruction.Steps = this.data.reprocessSteps.LanjutProses;
                }, 1);
            } else {
                setTimeout(() => {
                    this.data.Instruction.Steps = this.data.reprocessSteps.Reproses;
                }, 1);
            }

            this.currentReprocess = reprocess;
        }
    }

    generateDeadline() {
        if (this.hasInstruction && this.hasProductionOrder) {
            if (this.data.durationEstimation.Areas) {

                // this.data.Instruction.Steps = this.data.Instruction.Steps.map((step) => {

                var totalDay = 1;
                for (var i = this.data.Instruction.Steps.length - 1; i > -1; i--) {
                    var step = this.data.Instruction.Steps[i];
                    if (step.ProcessArea && step.ProcessArea != "") {
                        // var d = new Date(deliveryDate);
                        // var totalDay = 0;

                        // for (var i = this.data.durationEstimation.Areas.length - 1; i >= 0; i--) {
                        //     var area = this.data.durationEstimation.Areas[i];
                        //     totalDay += area.Duration;

                        //     if (area.Name == step.ProcessArea.toUpperCase().replace("AREA ", ""))
                        //         break;
                        // }

                        // d.setDate(d.getDate() - totalDay + 1);

                        var durationEstimationArea = this.data.durationEstimation.Areas.find((area) => area.Name == step.ProcessArea.toUpperCase().replace("AREA ", ""));
                        // if (i == this.data.Instruction.Steps.length - 1) {
                        //     deadline = deadline.add(-1, 'days');
                        // } else {
                        //     deadline = 
                        // }

                        if (durationEstimationArea) {
                            if (i == this.data.Instruction.Steps.length - 1) {
                                step.Deadline = new Date(moment(this.data.ProductionOrder.DeliveryDate).add(-1, 'days').format());
                                totalDay += durationEstimationArea.Duration;
                            }
                            else {
                                step.Deadline = new Date(moment(this.data.ProductionOrder.DeliveryDate).add(totalDay * -1, 'days').format());
                                totalDay += durationEstimationArea.Duration;
                            }
                        }
                        // deadline = deadline.add(totalDay * -1, 'days');
                    }

                    // return step;
                }
                // });
            }
            else {
                this.data.Instruction.Steps = this.data.Instruction.Steps.map((step) => {
                    step.Deadline = null;
                    return step;
                });
            }
        }
    }

    generateDeadlineReprocess() {
        if (this.data.durationEstimation && this.data.durationEstimation.Areas) {

            // this.data.Instruction.Steps = this.data.Instruction.Steps.map((step) => {

            var totalDay = 1;
            for (var i = this.data.Instruction.Steps.length - 1; i > -1; i--) {
                var step = this.data.Instruction.Steps[i];
                if (step.ProcessArea && step.ProcessArea != "") {
                    // var d = new Date(deliveryDate);
                    // var totalDay = 0;

                    // for (var i = this.data.durationEstimation.Areas.length - 1; i >= 0; i--) {
                    //     var area = this.data.durationEstimation.Areas[i];
                    //     totalDay += area.Duration;

                    //     if (area.Name == step.ProcessArea.toUpperCase().replace("AREA ", ""))
                    //         break;
                    // }

                    // d.setDate(d.getDate() - totalDay + 1);

                    var durationEstimationArea = this.data.durationEstimation.Areas.find((area) => area.Name == step.ProcessArea.toUpperCase().replace("AREA ", ""));
                    // if (i == this.data.Instruction.Steps.length - 1) {
                    //     deadline = deadline.add(-1, 'days');
                    // } else {
                    //     deadline = 
                    // }

                    if (durationEstimationArea) {
                        if (i == this.data.Instruction.Steps.length - 1) {
                            step.Deadline = new Date(moment(this.data.ProductionOrder.DeliveryDate).add(-1, 'days').format());
                            totalDay += durationEstimationArea.Duration;
                        }
                        else {
                            step.Deadline = new Date(moment(this.data.ProductionOrder.DeliveryDate).add(totalDay * -1, 'days').format());
                            totalDay += durationEstimationArea.Duration;
                        }
                    }
                    // deadline = deadline.add(totalDay * -1, 'days');
                }

                // return step;
            }
            // });
        }
        else {
            this.data.Instruction.Steps = this.data.Instruction.Steps.map((step) => {
                step.Deadline = null;
                return step;
            });
        }
    }
}
