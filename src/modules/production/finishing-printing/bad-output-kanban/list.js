import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian", "Cetak PDF"];
    }

    setColumns() {
        this.columns = [
            {
                field: "toBeCompleted", title: "toBeCompleted Checkbox", checkbox: true, sortable: false,
                formatter: function (value, data, index) {
                    this.checkboxEnabled = data.isIncomplete() ? !data.isIncomplete() : !data.isDone();
                    return ""
                }
            },
            { field: "ProductionOrder.OrderNo", title: "Order No" },
            { field: "Cart.CartNumber", title: "Nomor Kereta" },
            { field: "stepIndexPerTotal", title: "Step Index", sortable: false },
            { field: "SelectedProductionOrderDetail.ColorRequest", title: "Warna" },
            { field: "Instruction.Name", title: "Instruksi" },
            {
                field: "completeStatus", title: "Status",
                formatter: function (value, data, index) {
                    return data.IsInactive ? "INACTIVE" : data.IsComplete ? "COMPLETE" : data.isPending() ? "PENDING" : "INCOMPLETE";
                }
            },
            { field: "OldKanban.Cart.CartNumber", title: "Nomor Kereta Lama" }
        ];
    }

    rowFormatter(data, index) {
        if (data.IsInactive) {
            return { classes: "danger" }
        } else {
            if (data.IsComplete)
                return { classes: "success" };
            else {
                if (data.isPending())
                    return { classes: "warning" };
                else
                    return {};
            }
        }
    }

    loadData = (info) => {
        var order = {};
        var filter = {
            IsBadOutput: true
        };
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            filter: JSON.stringify(filter),
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
                let searchOldKanban = [];


                if (result.data.length > 0) {
                    for (let kanban of result.data) {
                        if (kanban.OldKanbanId) {
                            searchOldKanban.push(this.service.getById(kanban.OldKanbanId))
                        }
                    }
                }

                return Promise.all(searchOldKanban)
                    .then((oldKanbanResults) => {

                        // modify display data
                        for (var kanban of result.data) {
                            kanban.OldKanban = oldKanbanResults.find((oldKanban) => oldKanban.Id == kanban.OldKanbanId);
                            kanban.SelectedProductionOrderDetail.ColorRequest = kanban.SelectedProductionOrderDetail ? kanban.SelectedProductionOrderDetail.ColorRequest + " - " + kanban.SelectedProductionOrderDetail.ColorTemplate : kanban.SelectedProductionOrderDetail.ColorRequest;
                            kanban.CurrentStepIndex = kanban.CurrentStepIndex || 0; // old kanban data does not have currentStepIndex
                            kanban.stepIndexPerTotal = `${kanban.CurrentStepIndex}/${kanban.Instruction.Steps.length}`;
                            kanban.isPending = function () {
                                return !this.IsComplete && this.CurrentStepIndex >= this.Instruction.Steps.length && this.IsFulfilledOutput; // used for custom sort
                            };
                            kanban.isDone = function () {
                                return this.IsComplete;
                            };
                            kanban.isIncomplete = function () {

                                return ((!this.IsComplete && this.CurrentStepIndex < this.Instruction.Steps.length) || (!this.IsComplete && this.CurrentStepIndex == this.Instruction.Steps.length && !this.IsFulfilledOutput) || (!this.IsFulfilledOutput));
                            }
                        }

                        if (info.sort === "IsComplete") { //custom sort
                            if (info.order === "desc")
                                result.data.sort(this.desc());
                            else
                                result.data.sort(this.asc());
                        }

                        return {
                            total: result.info.total,
                            data: result.data
                        }

                    })
            });
    }

    // // modify display data
    // for (var kanban of result.data) {
    //     kanban.OldKanban = kanban.OldKanbanId ? this.service.getById(kanban.OldKanbanId).then((result) => result.data) : null;
    //     kanban.SelectedProductionOrderDetail.ColorRequest = kanban.SelectedProductionOrderDetail.ColorType ? kanban.SelectedProductionOrderDetail.ColorRequest + " - " + kanban.SelectedProductionOrderDetail.ColorType.Name : kanban.SelectedProductionOrderDetail.ColorRequest;
    //     kanban.currentStepIndex = kanban.currentStepIndex || 0; // old kanban data does not have currentStepIndex
    //     kanban.stepIndexPerTotal = `${kanban.currentStepIndex}/${kanban.Instruction.Steps.length}`;
    //     kanban.isPending = function () {
    //         return !this.IsComplete && this.currentStepIndex >= this.Instruction.Steps.length; // used for custom sort
    //     };
    //     kanban.isDone = function () {
    //         return this.IsComplete;
    //     };
    //     kanban.isIncomplete = function () {
    //         return !this.IsComplete && this.currentStepIndex < this.Instruction.Steps.length;
    //     }
    // }

    // if (info.sort === "IsComplete") { //custom sort
    //     if (info.order === "desc")
    //         result.data.sort(this.desc());
    //     else
    //         result.data.sort(this.asc());
    // }

    // console.log(result)
    // return {
    //     total: result.info.total,
    //     data: result.data
    // }

    asc() {
        return function (kanban1, kanban2) {
            if (kanban1.IsComplete && !kanban2.IsComplete)
                return -1;
            if (!kanban1.IsComplete && kanban2.isPending())
                return -1;
            if (!kanban1.IsComplete && kanban2.IsComplete)
                return 1;
            if (kanban1.isPending() && !kanban2.IsComplete)
                return 1;

            return 0;
        }
    }

    desc() {
        return function (kanban1, kanban2) {
            if (kanban1.IsComplete && !kanban2.IsComplete)
                return 1;
            if (!kanban1.IsComplete && kanban2.isPending())
                return 1;
            if (!kanban1.IsComplete && kanban2.IsComplete)
                return -1;
            if (kanban1.isPending() && !kanban2.IsComplete)
                return -1;

            return 0;
        }
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    submitCompleteData() {
        if (this.dataToBeCompleted.length > 0) {
            var updatePromise = [];
            for (var data of this.dataToBeCompleted) {
                updatePromise.push(this.service.updateIsComplete(data.Id));
            }

            Promise.all(updatePromise)
                .then(responses => {
                    this.error = {};
                    this.table.refresh();
                    this.dataToBeCompleted = [];
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    reprocess() {
        this.router.navigateToRoute('reprocess');
    }
}
