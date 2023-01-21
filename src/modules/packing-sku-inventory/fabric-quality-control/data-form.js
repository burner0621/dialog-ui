import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service, SalesService } from "./service";
import { Dialog } from '../../../au-components/dialog/dialog';
import { FabricGradeTestEditor } from './dialogs/fabric-grade-test-editor';

let InspectionMaterialLoader = require("../../../loader/input-inspection-material-loader");
let InspectionMaterialSPPLoader = require("../../../loader/input-inspection-material-production-order-loader");
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
        avalA: 0,
        avalB: 0,
        avalConnection: 0,
        sample: 0,
    }

    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    // salesContractFields = ["pointSystem", "pointLimit"];
    pointSystemOptions = [4, 10];
    shiftOptions = [
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"]

    imSPPQuery = { "IsChecked": false };

    constructor(service, dialog, bindingSignaler, bindingEngine, salesService) {
        this.service = service;
        this.dialog = dialog;
        this.salesService = salesService;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.colChanged = this.colChanged.bind(this);
    }

    async bind(context) {
        
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        // this.error = this.context.error;
        this.data.fabricGradeTests = this.data.fabricGradeTests || [];
        this.data.pointSystem = this.data.pointSystem || 10;
        this.data.pointLimit = this.data.pointLimit || 0;

        // this.cancelCallback = this.context.cancelCallback;
        // this.deleteCallback = this.context.deleteCallback;
        // this.editCallback = this.context.editCallback;
        // this.saveCallback = this.context.saveCallback;


        this.selectedPointSystem = this.data.pointSystem;
        this.selectedPointLimit = this.data.pointLimit;
        this.selectedFabricGradeTest = this.data.fabricGradeTests.length > 0 ? this.data.fabricGradeTests[0] : null;

        if (this.data.inspectionMaterialId) {
            this.selectedIM = {};
            this.selectedIM.id = this.data.inspectionMaterialId;
            this.selectedIM.bonNo = this.data.inspectionMaterialBonNo;
            this.selectedIM.shift = this.data.shiftIm;

            this.selectedIMSPP = {};
            this.selectedIMSPP.id = this.data.inspectionMaterialProductionOrderId;
            this.selectedIMSPP.productionOrder = {};
            this.selectedIMSPP.productionOrder.id = this.data.productionOrderId;
            this.selectedIMSPP.productionOrder.no = this.data.productionOrderNo;
            this.selectedIMSPP.cartNo = this.data.cartNo;
            this.selectedIMSPP.color = this.data.color;
            this.selectedIMSPP.uomUnit = this.data.uom;
        }

    }

    testo = (info) => {
        var count = this.data.fabricGradeTests.count
        var data = this.data.fabricGradeTests;
        var result = [];

        var grandTotal = {};
        grandTotal.grade = "Grand Total";
        grandTotal.initLength = 0;
        grandTotal.avalA = 0;
        grandTotal.avalB = 0;
        grandTotal.avalConnection = 0;
        grandTotal.sample = 0;
        data.reduce(function (res, value) {
            let grade = value.grade;
            if (!res[grade]) {
                res[grade] = {
                    grade: grade,
                    initLength: 0,
                    width: 0,
                    avalA: 0,
                    avalB: 0,
                    avalConnection: 0,
                    sample: 0,
                };
                result.push(res[grade])
            }
            res[grade].initLength += value.initLength;
            res[grade].width += value.width;
            res[grade].avalA += value.avalALength;
            res[grade].avalB += value.avalBLength;
            res[grade].avalConnection += value.avalConnectionLength;
            res[grade].sample += value.sampleLength;

            grandTotal.initLength += value.initLength;
            grandTotal.avalA += value.avalALength;
            grandTotal.avalB += value.avalBLength;
            grandTotal.avalConnection += value.avalConnectionLength;
            grandTotal.sample += value.sampleLength;
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
        { field: "avalA", title: "Total Aval A (Meter)" },
        { field: "avalB", title: "Total Aval B (Meter)" },
        { field: "avalConnection", title: "Total Aval Sambungan (Meter)" },
        { field: "sample", title: "Total Sample (Meter)" },
    ]

    errorChanged() {
        if (this.error && this.error.FabricGradeTests) {
            var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
            this.selectedFabricGradeTestError = this.error.FabricGradeTests[index];
        }
    }
    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
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
        return `${this.productionOrder.OrderNo} - ${this.selectedIM.cartNo}`
    }

    @computedFrom("productionOrder.OrderQuantity", "productionOrder.Uom.Unit")
    get orderQuantity() {
        if (!this.productionOrder)
            return "-";
        return `${this.productionOrder.OrderQuantity} ${this.productionOrder.Uom.Unit}`
    }

    @computedFrom("productionOrder.packingInstruction")
    get packingInstruction() {
        if (!this.productionOrder)
            return "-";
        return `${this.productionOrder.PackingInstruction}`
    }

    @computedFrom("selectedIMSPP.color")
    get colorRequest() {
        if (!this.selectedIMSPP)
            return "-";
        return `${this.selectedIMSPP.color}`
    }

    @computedFrom("data.pointSystem")
    get criteriaColumns() {
        if (this.data.pointSystem === 10)
            return ["Point", "1", "3", "5", "10"];
        else
            return ["Point", "1", "2", "3", "4"];
    }

    @computedFrom("selectedPointSystem")
    get fabricGradeTestMultiplier() {
        if (this.data.pointSystem === 10)
            return { A: 1, B: 3, C: 5, D: 10 };
        else
            return { A: 1, B: 2, C: 3, D: 4 };
    }

    scoreGrade(finalScore) {

        if (this.data.pointSystem === 10) {
            if (finalScore >= 2.71)
                return "BS";
            else if (finalScore >= 1.31)
                return "C";
            else if (finalScore >= 0.91)
                return "B";
            else
                return "A";
        }
        else if (this.data.pointSystem === 4) {
            if (finalScore <= this.data.pointLimit) {
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
    @bindable selectedAvalALength;
    @bindable selectedAvalBLength;
    @bindable selectedAvalConnectionLength;
    @bindable selectedSampleLength;
    @bindable subs;
    selectedAvalALengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.avalALength = this.selectedAvalALength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.fabricGradeTestTable.refresh();
        this.totalTable.refresh();
    }
    selectedAvalBLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.avalBLength = this.selectedAvalBLength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.fabricGradeTestTable.refresh();
        this.totalTable.refresh();
    }
    selectedAvalConnectionLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.avalConnectionLength = this.selectedAvalConnectionLength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.fabricGradeTestTable.refresh();
        this.totalTable.refresh();
    }
    selectedSampleLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.sampleLength = this.selectedSampleLength;
        this.computeGrade(this.selectedFabricGradeTest);
        this.totalTable.refresh();
    }
    selectedPointSystemChanged() {
        if (this.selectedPointSystem === 10) {
            this.selectedPointLimit = 0;
        }
        this.data.pointSystem = this.selectedPointSystem;
        // this.selectedPointSystem=this.data.pointSystem;
        this.data.fabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
    }
    selectedPointLimitChanged() {
        this.data.pointLimit = this.selectedPointLimit;
        this.computeGrade(this.selectedFabricGradeTest);
    }

    selectedFabricGradeTestChanged() {
        if (this.selectedFabricGradeTest) {
            if (this.subs) {
                this.subs.forEach(rowSub => rowSub.forEach(colSub => colSub.dispose()));
            }
            this.selectedPcsNo = this.selectedFabricGradeTest.pcsNo;
            this.selectedPcsLength = this.selectedFabricGradeTest.initLength;
            this.selectedPcsWidth = this.selectedFabricGradeTest.width;

            this.selectedAvalALength = this.selectedFabricGradeTest.avalALength;
            this.selectedAvalBLength = this.selectedFabricGradeTest.avalBLength;
            this.selectedAvalConnectionLength = this.selectedFabricGradeTest.avalConnectionLength;
            this.selectedSampleLength = this.selectedFabricGradeTest.sampleLength;

            this.subs = [];

            if (this.error && this.error.FabricGradeTests) {
                var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
                this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
            }
            if (this.selectedFabricGradeTest.criteria)
                this.selectedFabricGradeTest.criteria.forEach(criterion => {
                    var rowSubs = [];
                    for (var col of Object.getOwnPropertyNames(criterion.score)) {
                        if (typeof criterion[col] === "object")
                            continue;
                        var colSub = this.bindingEngine.propertyObserver(criterion.score, col).subscribe(this.colChanged);
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
        var score = fabricGradeTest.criteria.reduce((p, c, i) => { return p + ((c.score.a * multiplier.A) + (c.score.b * multiplier.B) + (c.score.c * multiplier.C) + (c.score.d * multiplier.D)) }, 0);
        var finalLength = fabricGradeTest.initLength - fabricGradeTest.avalALength - fabricGradeTest.avalBLength - fabricGradeTest.avalConnectionLength - fabricGradeTest.sampleLength;
        var finalArea = fabricGradeTest.initLength * fabricGradeTest.width;
        var finalScoreTS = finalLength > 0 && this.data.pointSystem === 10 ? score / finalLength : 0;
        var finalScoreFS = finalArea > 0 && this.data.pointSystem === 4 ? score * 100 / finalArea : 0;
        var grade = this.data.pointSystem === 10 ? this.scoreGrade(finalScoreTS) : this.scoreGrade(finalScoreFS);
        fabricGradeTest.score = score;
        fabricGradeTest.finalLength = finalLength;
        fabricGradeTest.finalArea = this.data.pointSystem === 4 ? finalArea : 0;
        fabricGradeTest.finalScore = this.data.pointSystem === 10 ? finalScoreTS.toFixed(2) : finalScoreFS.toFixed(2);
        fabricGradeTest.grade = grade;
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
            this.selectedFabricGradeTest.pcsNo = this.selectedPcsNo;
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }
    selectedPcsLengthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.initLength = this.selectedPcsLength;
            this.computeGrade(this.selectedFabricGradeTest);
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }
    selectedPcsWidthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.width = this.selectedPcsWidth;
            this.computeGrade(this.selectedFabricGradeTest);
            this.fabricGradeTestTable.refresh();
            this.totalTable.refresh();
        }
    }

    fabricGradeTestColumns = [
        { field: "pcsNo", title: "Nomor Pcs" },
        { field: "initLength", title: "Panjang (Meter)" },
        { field: "width", title: "Lebar (Meter)" },
        { field: "grade", title: "Grade" }
    ];
    fabricGradeTestContextMenu = ["Hapus"];
    fabricGradeTestTable;
    totalTable;

    __fabricGradeTestContextMenuCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Hapus":
                this.data.fabricGradeTests.splice(this.data.fabricGradeTests.indexOf(data), 1);
                this.selectedFabricGradeTest = this.data.fabricGradeTests[0];
                this.fabricGradeTestTable.refresh();
                this.totalTable.refresh();
                break;
        }
    }
    __fabricGradeTestCreateCallback() {
        if (!this.selectedIM) {
            this.error = this.error || {};
            this.error.InspectionMaterialBonNo = "Harap isi Bon No";
        }
        else {
            this.error = this.error || {};
            this.error.InspectionMaterialBonNo = null;
            this.__fabricGradeTestShowEditorDialog();
        }
    }

    __fabricGradeTestShowEditorDialog() {
        if (this.selectedIM)
            this.dialog.show(FabricGradeTestEditor)
                .then(response => {
                    if (!response.wasCancelled) {
                        this.selectedFabricGradeTest = new FabricGradeTest(this.selectedIM.productionOrderType);

                        this.selectedFabricGradeTest.pcsNo = response.output.PcsNo;
                        this.selectedFabricGradeTest.initLength = response.output.PcsLength;
                        this.selectedFabricGradeTest.width = response.output.PcsWidth;

                        this.data.fabricGradeTests.push(this.selectedFabricGradeTest);

                        this.data.fabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
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
        var count = this.data.fabricGradeTests.count
        var data = this.data.fabricGradeTests;

        return {
            total: count,
            data: data
        };
    };


    @bindable inspectionMaterialSPPItems = [];
    @bindable selectedIM;
    @bindable productionOrder;
    @bindable salesContract;
    @bindable selectedIMSPP;
    async selectedIMChanged(newValue, oldValue) {
        if (newValue) {
            this.inspectionMaterialSPPItems = this.selectedIM.inspectionMaterialProductionOrders;
            this.data.inspectionMaterialBonNo = this.selectedIM.bonNo;
            this.data.inspectionMaterialId = this.selectedIM.id;
            this.data.shiftIm = this.selectedIM.shift;
            this.imSPPQuery.DyeingPrintingAreaInputId = this.data.inspectionMaterialId;
        }
        else
            this.data.inspectionMaterialId = 0;
    }

    async selectedIMSPPChanged(newValue, oldValue) {
        if (newValue) {
            this.productionOrder = await this.salesService.getProductionOrderById(this.selectedIMSPP.productionOrder.id);
            this.salesContract = await this.salesService.getSalesContractById(this.productionOrder.FinishingPrintingSalesContract.Id);

            this.data.buyer = this.productionOrder.Buyer.Name;
            this.data.buyerAddress = this.productionOrder.Buyer.Address;
            this.data.cartNo = this.selectedIMSPP.cartNo;
            this.data.color = this.selectedIMSPP.color;
            this.data.construction = `${this.productionOrder.Material.Name} / ${this.productionOrder.MaterialConstruction.Name} / ${this.productionOrder.MaterialWidth}`;
            this.data.isUsed = false;
            this.data.orderQuantity = this.productionOrder.OrderQuantity;
            this.data.packingInstruction = this.productionOrder.PackingInstruction;
            this.data.productionOrderNo = this.productionOrder.OrderNo;
            this.data.productionOrderType = this.productionOrder.OrderType.Name;
            this.data.uom = this.selectedIMSPP.uomUnit;
            this.data.inspectionMaterialProductionOrderId = this.selectedIMSPP.id;
            this.data.productionOrderId = this.productionOrder.Id;

            if (this.salesContract) {

                if (this.salesContract.PointSystem === 4 || this.salesContract.PointSystem === 10) {
                    this.selectedPointSystem = this.data.pointSystem || 10;
                    this.selectedPointLimit = this.data.pointLimit || 0;
                } else {
                    this.selectedPointSystem = this.data.pointSystem || 10;
                    this.selectedPointLimit = this.data.pointLimit || 0;
                }
                // })
            }
            if (!this.data.id) {

                this.data.fabricGradeTests = [];
                if (this.selectedFabricGradeTest) {
                    this.selectedPcsNo = null;
                    this.selectedPcsLength = 0;
                    this.selectedPcsWidth = 0;

                    this.selectedFabricGradeTest.criteria = [];
                }
                this.computeGrade(this.selectedFabricGradeTest);
                this.fabricGradeTestTable.refresh();
                this.totalTable.refresh();
            }

        }
        else
            this.data.inspectionMaterialProductionOrderId = 0;
    }

    imTextFormatter = (im) => {
        return `${im.bonNo}`
    }

    imSPPTextFormatter = (imSPP) => {
        return `${imSPP.productionOrder.no}`
    }

    get inspectionMaterialLoader() {
        return InspectionMaterialLoader;
    }

    get inspectionMaterialSPPLoader() {
        return InspectionMaterialSPPLoader;
    }
}


class FabricGradeTest {
    constructor(type) {
        this.type = type || "PRINTING";
        this.pcsNo = 'PCSNO';
        this.grade = '';
        this.width = 0;

        this.initLength = 0;
        this.avalALength = 0;
        this.avalBLength = 0;
        this.avalConnectionLength = 0;
        this.sampleLength = 0;
        this.finalLength = 0;

        this.fabricGradeTest = 0;
        this.finalGradeTest = 0;

        this.fabricGradeTest = 0;

        this.criteria = [].concat(generalCriteria(), this.type === "PRINTING" ? printingCriteria() : finishingCriteria());
    }
}



class FabricTestCriterion {
    constructor(group, code, name, score, index) {
        this.code = code || "";
        this.group = group || "";
        this.name = name || "";
        this.score = score || {
            a: 0,
            b: 0,
            c: 0,
            d: 0
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