import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service, SalesService } from "./service";
import { Dialog } from '../../../../../au-components/dialog/dialog';
import { FabricGradeTestEditor } from './dialogs/fabric-grade-test-editor';

let KanbanLoader = require("../../../../../loader/kanban-loader");

@containerless()
@inject(Service, Dialog, BindingSignaler, BindingEngine, SalesService)
export class DataForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    };
    layoutOptions2 = {
        label: {
            length: 6

        },
        control: {
            length: 6
        }
    }

    total = {
        initLength: 0,
        width: 0,
        aval: 0,
        sample: 0,
    }

    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    // kanbanFields = ["code", "cart", "productionOrder", "selectedProductionOrderDetail"];
    // salesContractFields = ["pointSystem", "pointLimit"];
    pointSystemOptions = [4, 10];
    shiftOptions = [
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"]

    constructor(service, dialog, bindingSignaler, bindingEngine, salesService) {
        this.service = service;
        this.dialog = dialog;
        this.salesService = salesService;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.colChanged = this.colChanged.bind(this);
    }

    async bind(context) {
        // console.log(context.data);
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        // this.error = this.context.error;
        this.data.FabricGradeTests = this.data.FabricGradeTests || [];
        this.data.PointSystem = this.data.PointSystem || 10;
        this.data.PointLimit = this.data.PointLimit || 0;

        // this.cancelCallback = this.context.cancelCallback;
        // this.deleteCallback = this.context.deleteCallback;
        // this.editCallback = this.context.editCallback;
        // this.saveCallback = this.context.saveCallback;


        this.selectedPointSystem = this.data.PointSystem;
        this.selectedPointLimit = this.data.PointLimit;
        this.selectedFabricGradeTest = this.data.FabricGradeTests.length > 0 ? this.data.FabricGradeTests[0] : null;


        var kanbanId = this.data.KanbanId;
        if (kanbanId) {
            this.selectedKanban = await this.service.getKanbanById(kanbanId);
        }
    }

    testo = (info) => {
        var count = this.data.FabricGradeTests.count
        var data = this.data.FabricGradeTests;
        var result = [];

        var grandTotal = {};
        grandTotal.grade = "Grand Total";
        grandTotal.initLength = 0;
        grandTotal.aval = 0;
        grandTotal.sample = 0;
        data.reduce(function (res, value) {
            let grade = value.Grade;
            if (!res[grade]) {
                res[grade] = {
                    grade: grade,
                    initLength: 0,
                    width: 0,
                    aval: 0,
                    sample: 0,
                };
                result.push(res[grade])
            }
            res[grade].initLength += value.InitLength;
            res[grade].width += value.Width;
            res[grade].aval += value.AvalLength;
            res[grade].sample += value.SampleLength;

            grandTotal.initLength += value.InitLength;
            grandTotal.aval += value.AvalLength;
            grandTotal.sample += value.SampleLength;
            return res;
        }, {});

        result.push(grandTotal);

        return {
            // total: count,
            data: result
        };
    }

    testoColumns = [
        { field: "grade", title: "Grade" },
        { field: "initLength", title: "Total Panjang (Meter)" },
        { field: "aval", title: "Total Aval (Meter)" },
        { field: "sample", title: "Total Sample (Meter)" },
    ]

    errorChanged() {
        if (this.error && this.error.FabricGradeTests) {
            var index = this.data.FabricGradeTests.indexOf(this.selectedFabricGradeTest);
            this.selectedFabricGradeTestError = this.error.FabricGradeTests[index];
        }
    }
    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() !== '';
    }

    @computedFrom("productionOrder.Material", "productionOrder.MaterialConstruction", "productionOrder.MaterialWidth")
    get construction() {
        if (!this.productionOrder)
            return "-";
        return `${this.productionOrder.Material.Name} / ${this.productionOrder.MaterialConstruction.Name} / ${this.productionOrder.MaterialWidth}`
    }

    @computedFrom("productionOrder.OrderNo")
    get sppNo() {
        if (!this.productionOrder)
            return "-";
        return `${this.productionOrder.OrderNo}`
    }

    @computedFrom("productionOrder.OrderQuantity", "productionOrder.Uom.Unit")
    get orderQuantity() {
        if (!this.selectedKanban)
            return "-";
        return `${this.productionOrder.OrderQuantity} ${this.productionOrder.Uom.Unit}`
    }

    @computedFrom("productionOrder.PackingInstruction")
    get packingInstruction() {
        if (!this.productionOrder)
            return "-";
        return `${this.productionOrder.PackingInstruction}`
    }

    @computedFrom("kanban.SelectedProductionOrderDetail.ColorRequest")
    get colorRequest() {
        if (!this.kanban)
            return "-";
        return `${this.kanban.SelectedProductionOrderDetail.ColorRequest}`
    }

    @computedFrom("data.PointSystem")
    get criteriaColumns() {
        if (this.data.PointSystem === 10)
            return ["Point", "1", "3", "5", "10"];
        else
            return ["Point", "1", "2", "3", "4"];
    }

    // @computedFrom("selectedKanban.ProductionOrder.SalesContractNo")

    @computedFrom("selectedPointSystem")
    get fabricGradeTestMultiplier() {
        if (this.data.PointSystem === 10)
            return { A: 1, B: 3, C: 5, D: 10 };
        else
            return { A: 1, B: 2, C: 3, D: 4 };
    }

    scoreGrade(finalScore) {

        if (this.data.PointSystem === 10) {
            if (finalScore >= 2.71)
                return "BS";
            else if (finalScore >= 1.31)
                return "C";
            else if (finalScore >= 0.91)
                return "B";
            else
                return "A";
        }
        else if (this.data.PointSystem === 4) {
            if (finalScore <= this.data.PointLimit) {
                return "OK";
            } else {
                return "Not OK"
            }
        } else {
            return "-";
        }
    }


    @bindable selectedPcsNo;
    @bindable selectedPcsLength;
    @bindable selectedPcsWidth;
    @bindable selectedFabricGradeTest;
    @bindable selectedFabricGradeTestError;
    @bindable selectedPointSystem;
    @bindable selectedPointLimit;
    @bindable selectedAvalLength;
    @bindable selectedSampleLength;
    @bindable subs;
    selectedAvalLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.AvalLength = this.selectedAvalLength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.fabricGradeTestTable.refresh();
        this.totalTable.refresh();
    }
    selectedSampleLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.SampleLength = this.selectedSampleLength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.totalTable.refresh();
    }
    selectedPointSystemChanged() {
        if (this.selectedPointSystem === 10) {
            this.selectedPointLimit = 0;
        }
        this.data.PointSystem = this.selectedPointSystem;
        // this.selectedPointSystem=this.data.pointSystem;
        this.data.FabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
    }
    selectedPointLimitChanged() {
        this.data.PointLimit = this.selectedPointLimit;
        this.computeGrade(this.selectedFabricGradeTest);
    }

    selectedFabricGradeTestChanged() {
        if (this.selectedFabricGradeTest) {
            if (this.subs) {
                this.subs.forEach(rowSub => rowSub.forEach(colSub => colSub.dispose()));
            }
            this.selectedPcsNo = this.selectedFabricGradeTest.PcsNo;
            this.selectedPcsLength = this.selectedFabricGradeTest.InitLength;
            this.selectedPcsWidth = this.selectedFabricGradeTest.Width;

            this.selectedAvalLength = this.selectedFabricGradeTest.AvalLength;
            this.selectedSampleLength = this.selectedFabricGradeTest.SampleLength;

            this.subs = [];

            if (this.error && this.error.FabricGradeTests) {
                var index = this.data.FabricGradeTests.indexOf(this.selectedFabricGradeTest);
                this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
            }
            if (this.selectedFabricGradeTest.Criteria)
                this.selectedFabricGradeTest.Criteria.forEach(criterion => {
                    var rowSubs = [];
                    for (var col of Object.getOwnPropertyNames(criterion.Score)) {
                        if (typeof criterion[col] === "object")
                            continue;
                        var colSub = this.bindingEngine.propertyObserver(criterion.Score, col).subscribe(this.colChanged);
                        rowSubs.push(colSub);
                    }
                    this.subs.push(rowSubs);
                })
        }
    }
    computeGrade(fabricGradeTest) {
        if (!fabricGradeTest)
            return;
        var multiplier = this.fabricGradeTestMultiplier;
        var score = fabricGradeTest.Criteria.reduce((p, c, i) => { return p + ((c.Score.A * multiplier.A) + (c.Score.B * multiplier.B) + (c.Score.C * multiplier.C) + (c.Score.D * multiplier.D)) }, 0);
        var finalLength = fabricGradeTest.InitLength - fabricGradeTest.AvalLength - fabricGradeTest.SampleLength;
        var finalArea = fabricGradeTest.InitLength * fabricGradeTest.Width;
        var finalScoreTS = finalLength > 0 && this.data.PointSystem === 10 ? score / finalLength : 0;
        var finalScoreFS = finalArea > 0 && this.data.PointSystem === 4 ? score * 100 / finalArea : 0;
        var grade = this.data.PointSystem === 10 ? this.scoreGrade(finalScoreTS) : this.scoreGrade(finalScoreFS);
        fabricGradeTest.Score = score;
        fabricGradeTest.FinalLength = finalLength;
        fabricGradeTest.FinalArea = this.data.PointSystem === 4 ? finalArea : 0;
        fabricGradeTest.FinalScore = this.data.PointSystem === 10 ? finalScoreTS.toFixed(2) : finalScoreFS.toFixed(2);
        fabricGradeTest.Grade = grade;
        this.totalTable.refresh();
        this.fabricGradeTestTable.refresh();
    }
    colChanged(newValue, oldValue) {
        if (!this.selectedFabricGradeTest)
            return;
        this.computeGrade(this.selectedFabricGradeTest);
    }
    selectedPcsNoChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.PcsNo = this.selectedPcsNo;
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }
    selectedPcsLengthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.InitLength = this.selectedPcsLength;
            this.computeGrade(this.selectedFabricGradeTest);
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }
    selectedPcsWidthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.Width = this.selectedPcsWidth;
            this.computeGrade(this.selectedFabricGradeTest);
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }

    fabricGradeTestColumns = [
        { field: "PcsNo", title: "Nomor Pcs" },
        { field: "InitLength", title: "Panjang (Meter)" },
        { field: "Width", title: "Lebar (Meter)" },
        { field: "Grade", title: "Grade" }
    ];
    fabricGradeTestContextMenu = ["Hapus"];
    fabricGradeTestTable;
    totalTable;

    __fabricGradeTestContextMenuCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Hapus":
                this.data.FabricGradeTests.splice(this.data.FabricGradeTests.indexOf(data), 1);
                this.selectedFabricGradeTest = this.data.FabricGradeTests[0];
                this.fabricGradeTestTable.refresh();
                this.totalTable.refresh();
                break;
        }
    }
    __fabricGradeTestCreateCallback() {
        if (!this.selectedKanban) {
            this.error = this.error || {};
            this.error.Kanban = "Harap isi kanban";
        }
        else {
            this.error = this.error || {};
            this.error.Kanban = null;
            this.__fabricGradeTestShowEditorDialog();
        }
    }

    __fabricGradeTestShowEditorDialog() {
        if (this.kanban)
            this.dialog.show(FabricGradeTestEditor)
                .then(response => {
                    if (!response.wasCancelled) {
                        this.selectedFabricGradeTest = new FabricGradeTest(this.kanban.ProductionOrder.OrderType.Name);

                        this.selectedFabricGradeTest.PcsNo = response.output.PcsNo;
                        this.selectedFabricGradeTest.InitLength = response.output.PcsLength;
                        this.selectedFabricGradeTest.Width = response.output.PcsWidth;

                        this.data.FabricGradeTests.push(this.selectedFabricGradeTest);

                        this.data.FabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
                        this.fabricGradeTestTable.refresh();
                        this.totalTable.refresh();
                    }
                });
    }
    __fabricGradeTestRowClickCallback(event) {
        var data = event.detail;
        this.selectedFabricGradeTest = data;
        this.signaler.signal("u")
    }

    fabricGradeTestLoader = (info) => {
        var count = this.data.FabricGradeTests.count
        var data = this.data.FabricGradeTests;
        return {
            total: count,
            data: data
        };
    };



    @bindable selectedKanban;
    @bindable productionOrder;
    @bindable salesContract;
    @bindable kanban;
    async selectedKanbanChanged(newValue, oldValue) {
        if (newValue) {
            this.kanban = await this.service.getKanbanById(this.selectedKanban.Id);
            // this.data.KanbanId = this.selectedKanban.Id;
            this.productionOrder = await this.salesService.getProductionOrderById(this.kanban.ProductionOrder.Id);
            this.salesContract = await this.salesService.getSalesContractById(this.productionOrder.FinishingPrintingSalesContract.Id);

            this.data.Buyer = this.productionOrder.Buyer.Name;
            this.data.BuyerAddress = this.productionOrder.Buyer.Address;
            this.data.CartNo = this.kanban.Cart.CartNumber;
            this.data.Color = this.kanban.SelectedProductionOrderDetail.ColorRequest;
            this.data.Construction = `${this.productionOrder.Material.Name} / ${this.productionOrder.MaterialConstruction.Name} / ${this.productionOrder.MaterialWidth}`;
            this.data.IsUsed = false;
            this.data.KanbanCode = this.kanban.Code;
            this.data.KanbanId = this.kanban.Id;
            this.data.OrderQuantity = this.productionOrder.OrderQuantity;
            this.data.PackingInstruction = this.productionOrder.PackingInstruction;
            this.data.ProductionOrderNo = this.productionOrder.OrderNo;
            this.data.ProductionOrderType = this.productionOrder.OrderType.Name;
            this.data.Uom = this.productionOrder.Uom.Unit;

            if (this.salesContract) {
                // await this.salesService.getSalesContractByNo(this.selectedKanban.ProductionOrder.SalesContractNo)
                //     .then((result) => {
                if (this.salesContract.PointSystem === 4 || this.salesContract.PointSystem === 10) {
                    this.selectedPointSystem = this.data.PointSystem || 10;
                    this.selectedPointLimit = this.data.PointLimit || 0;
                } else {
                    this.selectedPointSystem = this.data.PointSystem || 10;
                    this.selectedPointLimit = this.data.PointLimit || 0;
                }
                // })
            }
            if(!this.data.Id){
                
                this.data.FabricGradeTests = [];
                if(this.selectedFabricGradeTest){
                    this.selectedPcsNo = null;
                    this.selectedPcsLength = 0;
                    this.selectedPcsWidth = 0;

                    this.selectedFabricGradeTest.Criteria = [];
                }
                this.computeGrade(this.selectedFabricGradeTest);
                this.fabricGradeTestTable.refresh();
                this.totalTable.refresh();
            }
                
        }
        else
            this.data.KanbanId = null;
    }

    kanbanTextFormatter = (kanban) => {
        return `${kanban.ProductionOrder.OrderNo} - ${kanban.Cart.CartNumber}`
    }

    get kanbanLoader() {
        return KanbanLoader;
    }
}


class FabricGradeTest {
    constructor(type) {
        this.Type = type || "PRINTING";
        this.PcsNo = 'PCSNO';
        this.Grade = '';
        this.Width = 0;

        this.InitLength = 0;
        this.AvalLength = 0;
        this.SampleLength = 0;
        this.FinalLength = 0;

        this.FabricGradeTest = 0;
        this.FinalGradeTest = 0;

        this.FabricGradeTest = 0;

        this.Criteria = [].concat(generalCriteria(), this.Type === "PRINTING" ? printingCriteria() : finishingCriteria());
    }
}



class FabricTestCriterion {
    constructor(group, code, name, score, index) {
        this.Code = code || "";
        this.Group = group || "";
        this.Name = name || "";
        this.Score = score || {
            A: 0,
            B: 0,
            C: 0,
            D: 0
        };
        this.index = index || 0;
    }
}
var generalCriteria = () => [
    new FabricTestCriterion("BENANG", "B001", "Slubs", null, 1),
    new FabricTestCriterion("BENANG", "B002", "Neps", null, 2),
    new FabricTestCriterion("BENANG", "B003", "Kontaminasi Fiber", null, 3),
    new FabricTestCriterion("WEAVING", "W001", "Pakan Renggang", null, 4),
    new FabricTestCriterion("WEAVING", "W002", "Pakan Rapat", null, 5),
    new FabricTestCriterion("WEAVING", "W003", "Pakan Double", null, 6),
    new FabricTestCriterion("WEAVING", "W004", "Pakan Tebal Tipis", null, 7),
    new FabricTestCriterion("WEAVING", "W005", "Lusi Tebal Tipis", null, 8),
    new FabricTestCriterion("WEAVING", "W006", "Lusi Putus", null, 9),
    new FabricTestCriterion("WEAVING", "W007", "Lusi Double", null, 10),
    new FabricTestCriterion("WEAVING", "W008", "Madal Sumbi", null, 11),
    new FabricTestCriterion("WEAVING", "W009", "Salah Anyam / UP", null, 12),
    new FabricTestCriterion("WEAVING", "W010", "Reed Mark", null, 13),
    new FabricTestCriterion("WEAVING", "W011", "Temple Mark", null, 14),
    new FabricTestCriterion("WEAVING", "W012", "Snarl", null, 15),
    new FabricTestCriterion("PRODUKSI", "P001", "Sobek Tepi", null, 16),
    new FabricTestCriterion("PRODUKSI", "P002", "Kusut Mati", null, 17),
    new FabricTestCriterion("PRODUKSI", "P003", "Kusut / Krismak", null, 18),
    new FabricTestCriterion("PRODUKSI", "P004", "Belang Kondensat", null, 19),
    new FabricTestCriterion("PRODUKSI", "P005", "Belang Absorbsi", null, 20),
    new FabricTestCriterion("PRODUKSI", "P006", "Flek Minyak / Dyest", null, 21),
    new FabricTestCriterion("PRODUKSI", "P007", "Flek Oil Jarum", null, 22),
    new FabricTestCriterion("PRODUKSI", "P008", "Bintik Htm, Mrh, Biru", null, 23),
    new FabricTestCriterion("PRODUKSI", "P009", "Tepi Melipat", null, 24),
    new FabricTestCriterion("PRODUKSI", "P010", "Lebar Tak Sama", null, 25),
    new FabricTestCriterion("PRODUKSI", "P011", "Lubang / Pin Hole", null, 26),
    new FabricTestCriterion("PRODUKSI", "P012", "Bowing", null, 27),
    new FabricTestCriterion("PRODUKSI", "P013", "Skewing", null, 28),
];

var printingCriteria = () => [
    new FabricTestCriterion("PRODUKSI", "P201", "Meleset", null, 29),
    new FabricTestCriterion("PRODUKSI", "P202", "Flek", null, 30),
    new FabricTestCriterion("PRODUKSI", "P203", "Print Kosong / Bundas", null, 31),
    new FabricTestCriterion("PRODUKSI", "P204", "Nyetrip", null, 32)
];

var finishingCriteria = () => [
    new FabricTestCriterion("PRODUKSI", "P101", "Kotor Tanah / Debu", null, 33),
    new FabricTestCriterion("PRODUKSI", "P102", "Kotor Hitam", null, 34),
    new FabricTestCriterion("PRODUKSI", "P103", "Belang Kusut", null, 35)
];