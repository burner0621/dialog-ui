import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var FabricQualityControlLoader = require("../../../../../loader/fabric-loader")
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');
var KanbanLoader = require('../../../../../loader/kanban-loader');
var OrderTypeLoader = require('../../../../../loader/order-type-loader');

@inject(Router, Service)
export class List {

    selectedFields = ["code", "kanbanCode", "cartNo", "productionOrderType", "productionOrderNo", "dateIm", "shiftIm", "operatorIm", "machineNoIm", "construction", "buyer", "color", "orderQuantity", "packingInstruction", "fabricGradeTests.pcsNo", "fabricGradeTests.initLength", "fabricGradeTests.width", "fabricGradeTests.finalScore", "fabricGradeTests.grade", "fabricGradeTests.avalLength", "fabricGradeTests.sampleLength"];

    info = {
        code: "",
        kanbanCode: "",
        productionOrderNo: "",
        productionOrderType: "",
        shiftIm: "",
        dateFrom: "",
        dateTo: ""        
    };

    listFQSDetailColumns = [
        { value: "no", header: "No" },
        { value: "code", header: "Nomor Pemeriksaan Kain" },
        { value: "productionOrderNo", header: "Nomor Order" },
        { value: "productionOrderType", header: "Jenis Order" },
        { value: "cartNo", header: "Nomor Kereta" },
        { value: "dateIm", header: "Tanggal IM" },
        { value: "shiftIm", header: "Shift" },
        { value: "operatorIm", header: "Operator IM" },
        { value: "machineNoIm", header: "No. Mesin IM" },
        { value: "construction", header: "Konstruksi" },
        { value: "buyer", header: "Buyer" },
        { value: "color", header: "Warna" },
        { value: "orderQuantity", header: "Jumlah Order (meter)" },
        { value: "packingInstruction", header: "Packing Instruction" },
        { value: "", header: "" },
    ];

    shiftOptions = [
        "",
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"];

    code = "";
    kanbanCode = "";
    productionOrderNo = "";
    productionOrderType = "";
    shiftIm = "";
    dateFrom = '';
    dateTo = '';
    newData;

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.newData = [];
    }

    searching() {
        
        if (this.filter) {
            this.info.code = this.filter.code ? this.filter.code.Code : "";
            this.info.kanbanCode = this.filter.kanbanCode ? this.filter.kanbanCode.Id : "";
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType.Name : "";
            
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
            // this.info.select = this.selectedFields;
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                // console.log(result)
                var tempData, tempDetailData;
                this.newData = [];
                this.no = 0;
                for (var i = 0; i < result.data.length; i++) {
                    tempData = {};
                    this.no += 1;
                    this.detailNo = 0;

                    tempData.no = this.no;
                    tempData.code = result.data[i].Code;
                    tempData.kanbanCode = result.data[i].KanbanCode;
                    tempData.cartNo = result.data[i].CartNo;
                    tempData.productionOrderType = result.data[i].ProductionOrderType;
                    tempData.productionOrderNo = result.data[i].ProductionOrderNo;
                    tempData.dateIm = result.data[i].DateIm;
                    tempData.shiftIm = result.data[i].ShiftIm;
                    tempData.operatorIm = result.data[i].OperatorIm;
                    tempData.machineNoIm = result.data[i].MachineNoIm;
                    tempData.construction = result.data[i].Construction;
                    tempData.buyer = result.data[i].Buyer;
                    tempData.color = result.data[i].Color;
                    tempData.orderQuantity = result.data[i].OrderQuantity;
                    tempData.packingInstruction = result.data[i].PackingInstruction;

                    tempData.details = [];

                    for (var j = 0; j < result.data[i].FabricGradeTests.length; j++) {
                        this.detailNo += 1;
                        tempDetailData = {};

                        tempDetailData.no = this.detailNo;
                        tempDetailData.pcsNo = result.data[i].FabricGradeTests[j].PcsNo;
                        tempDetailData.initLength = result.data[i].FabricGradeTests[j].InitLength;
                        tempDetailData.width = result.data[i].FabricGradeTests[j].Width;
                        tempDetailData.finalScore = result.data[i].FabricGradeTests[j].FinalScore.toFixed(2);
                        tempDetailData.grade = result.data[i].FabricGradeTests[j].Grade;
                        tempDetailData.avalLength = result.data[i].FabricGradeTests[j].AvalLength;
                        tempDetailData.sampleLength = result.data[i].FabricGradeTests[j].SampleLength;
                        tempData.details.push(tempDetailData);
                    }

                    this.newData.push(tempData);
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.code = this.filter.code ? this.filter.code.Code : "";
            this.info.kanbanCode = this.filter.kanbanCode ? this.filter.kanbanCode.Id : "";
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType.Name : "";
            
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
            // this.info.select = this.selectedFields;
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    fabricCodeChanged(e) {
        console.log('fabricQC changed')
    }

    kanbanCodeChanged(e) {
        console.log('kanban changed')
    }

    productionOrderNoChanged(e) {
        console.log('production number changed')
    }

    productionOrderTypeChanged(e) {
        console.log('production type changed')
    }

    cartNoChanged(e) {
        console.log('cart number changed')
    }

    shiftImChanged(e) {
        console.log('production type changed')
    }

    get fabricQCLoader() {
        return FabricQualityControlLoader;
    }

    reset() {
        this.filter = {};
        this.newData = [];
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    get filterKanban() {
        var temp = {};
        if (this.filter) {
            if (this.filter.productionOrder) {
                temp = {
                    "productionOrder.orderNo": this.filter.productionOrder.orderNo
                };
                return temp;
            } else
                return temp;
        } else
            return temp;
    }

    get orderTypeLoader() {
        return OrderTypeLoader;
    }

}