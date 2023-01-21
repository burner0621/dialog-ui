import {inject, computedFrom} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');
var OrderTypeLoader = require("../../../../loader/order-type-loader");
var ProcessTypeLoader = require("../../../../loader/process-type-loader");

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    orderNo = '';
	 proses = '';
    orderType = null;
    processType = null;
	   reprosesOption = ['','Ya', 'Tidak'];

    activate() {
    }

    @computedFrom('orderType')
    get filterOrder() {
        if (this.orderType)
            return {
                "orderType.code": this.orderType.code
            }
        return {};
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.orderNo = '';
		this.proses = '';
        this.orderType = null;
        this.processType = null;
        this.data = [];
    }
    
    
    searching() {
        //var data = [];
        
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        var dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.service.getReport(dateFrom, dateTo, this.orderNo, this.orderType, this.processType,this.proses)
            .then(kanban => {
                //this.data = data;
                var dataTemp = [];
                var hasil="";
                
                for(var a of kanban){
					  if(a.IsReprocess==true){
                        hasil="Ya"; 
                    }else{
                        hasil="Tidak";
                    }
                    var temp = {
                        "_createdDate" : a.CreatedUtc ? moment(a.CreatedUtc).format("DD MMM YYYY")  :null,
                        "orderNo" : a.ProductionOrder.OrderNo,
                        "orderType" : a.ProductionOrder.OrderType.Name,
                        "processType" : a.ProductionOrder.ProcessType.Name,
                        "color" : a.SelectedProductionOrderDetail.ColorRequest,
                        "handfeelStandard" : a.ProductionOrder.HandlingStandard,
                        "finishWidth" : a.ProductionOrder.FinishWidth,
                        "material" : a.ProductionOrder.Material.Name,
                        "construction" : a.ProductionOrder.MaterialConstruction.Name,
                        "yarnNumber" : a.ProductionOrder.YarnMaterial.Name,
                        "grade" : a.Grade,
                        "cartNumber" : a.Cart.CartNumber,
                        "length" : a.Cart.Qty,
                        "pcs" : a.Cart.Pcs,
                        "uom" : a.Cart.Uom.Unit,
						  "isReprocess" :hasil,
                        "isComplete" : a.IsComplete ? "Complete" : a.CurrentStepIndex === a.Instruction.Steps.length ? "Pending" : a.IsInactive ? "Inactive" : "Incomplete",
                        "currentStepIndex" : `${a.CurrentStepIndex} / ${a.Instruction.Steps.length}`,
                        "step" : a.CurrentStepIndex === 0 ? " - " : a.CurrentStepIndex > a.Instruction.Steps.length ? "REPROSES" : a.Instruction.Steps[a.CurrentStepIndex - 1].Process
                    }
                    dataTemp.push(temp);
                }
                this.data = dataTemp;
            })
    }

    ExportToExcel() {
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        var dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.service.generateExcel(dateFrom, dateTo, this.orderNo, this.orderType, this.processType,this.proses);
    }

    // orderTypeChanged(e){
    //     var selectedOrderType = e.detail || null;
    //     if(selectedOrderType){
    //         this.filterOrder = {
    //             "orderType.code": selectedOrderType.code
    //         }
    //     }else{
    //         this.orderType = null;
    //         this.processType = null;
    //         this.filterOrder = {};
    //     }
    // }

    // processTypeChanged(e){
    //     var selectedProcessType = e.detail || null;
    //     if(!selectedProcessType){
    //         this.processType = null;
    //     }
    // }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

    get orderTypeLoader() {
        return OrderTypeLoader;
    }

    get processTypeLoader() {
        return ProcessTypeLoader;
    }
}