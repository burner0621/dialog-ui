import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');
var momentToMillis = require('../../../../../utils/moment-to-millis')
var MachineLoader = require('../../../../../loader/machines-loader');
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');
var MachineEventLoader = require('../../../../../loader/machine-event-loader-by-machine');

@inject(BindingEngine, Router, Service, Element)
export class List {
    @bindable title;
    @bindable readOnly = false;
    // @bindable data = {};
    @bindable error = {};
    hasmachine = false;
    @bindable productionOrderDetails = [];

    @bindable localStartDate;
    @bindable localEndDate;
    @bindable productionOrder;
    @bindable Machine;
    @bindable machineEvent;

    info = {
        machineId: '',
        machineEventId: '',
        productionOrderNumber: '',
        dateFrom: '',
        dateTo: ''
    };

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    machine = {};
    machineEvent = {};
    productionOrder = {};
    dateFrom = '';
    dateTo = '';
    divisionFilter = { "UnitDivisionName": "FINISHING & PRINTING" };
    machineIdFilter = '';
    

    constructor(bindingEngine, router, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.element = element;
    }

    activate(params) {
        if (params.mId != null || params.meId != null || params.pONOn != null || params.dateF != null || params.dateT != null) {
            this.Machine = params.Mach;
            this.machineEvent = params.MachE;
            this.productionOrder = params.ProdNo;
            this.dateFrom=params.dateF;
            this.dateTo=params.dateT;
            this.machineIdFilter=params.mId;
            this.machineEv=params.meId;
            this.prodOrder=params.pONOn;
            if(this.Machine) this.hasmachine=true;
            else this.hasmachine=false;
            this.info.dateFrom = params.dateF;
            this.info.dateTo = params.dateT;
            this.info.machineId = params.mId;
            this.info.machineEventId = params.meId;
            this.info.productionOrderNumber = params.pONOn;
            
            this.info.dateFrom=this.info.dateFrom ? moment(this.info.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo=this.info.dateTo ? moment(this.info.dateTo).format("YYYY-MM-DD") : "";
            this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                for (var monitoringEvent of this.data) {
                    monitoringEvent.timeInMomentStart = moment(monitoringEvent.dateStart).format('HH:mm');
                    monitoringEvent.timeInMomentEnd = moment(monitoringEvent.dateEnd).format('HH:mm');
                    monitoringEvent.mId = params.mId ? params.mId:"";
                    monitoringEvent.Mach = this.Machine ? this.Machine:undefined;
                    monitoringEvent.meId = params.meId ? params.meId:"";
                    monitoringEvent.MachE = this.machineEvent ? this.machineEvent:undefined;
                    monitoringEvent.pONOn = params.pONOn ? params.pONOn:"";
                    monitoringEvent.ProdNo = this.productionOrder ? this.productionOrder:undefined;
                }
            })
    }
        // if(params.Machine!=null||params.MachineEvent!=null||params.productionOrder!=null||params.dateFrom!=null||params.dateTo!=null){
        //     this.Machine=params.Machine;
        // }
    }

    // machineChanged(e) {
    //     this.machineEvent = {};

    //     var selectedMachine = e.detail || {};
    //     this.machine._id = selectedMachine._id ? selectedMachine._id : "";
    //     this.machineCodeFilter = selectedMachine.code;
    // }
    MachineChanged(newValue) {
        this.machineEvent = {};
        if (this.Machine) {
            this.machineIdFilter = this.Machine.Id;
            this.hasmachine=true;
        }else{
            // this.Machine={};
            this.machineIdFilter='';
            this.hasmachine=false;
        }
    }

    productionOrderChanged(newValue){
        if(this.productionOrder)
        this.prodOrder=this.productionOrder.OrderNo;
        else
        this.prodOrder=undefined;
    }

    machineEventChanged(newValue){
        if(this.machineEvent)
        this.machineEv=this.machineEvent.Id;
        else
        this.machineEv=undefined;
    }

    searching() {
        this.info.machineId = this.machineIdFilter?this.machineIdFilter:undefined;
        this.info.machineEventId = this.machineEv?this.machineEv:undefined;
        this.info.productionOrderNumber = this.prodOrder?this.prodOrder:undefined;
        this.info.dateFrom = this.dateFrom;
        this.info.dateTo = this.dateTo;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                for (var monitoringEvent of this.data) {
                    monitoringEvent.timeInMomentStart = moment(monitoringEvent.dateStart).format('HH:mm');
                    monitoringEvent.timeInMomentEnd = moment(monitoringEvent.dateEnd).format('HH:mm');
                    monitoringEvent.mId = this.machineIdFilter ? this.machineIdFilter:"";
                    monitoringEvent.Mach = this.Machine ? this.Machine:undefined;
                    monitoringEvent.meId = this.machineEv ? this.machineEv:"";
                    monitoringEvent.MachE = this.machineEvent ? this.machineEvent:undefined;
                    monitoringEvent.pONOn = this.prodOrder ? this.prodOrder:"";
                    monitoringEvent.ProdNo = this.productionOrder ? this.productionOrder:undefined;
                }
            })
            
    }

    reset() {
        this.info.machineId = undefined;
        this.info.machineEventId = undefined;
        this.info.productionOrderNumber = undefined;
        this.info.dateFrom = undefined;
        this.info.dateTo = undefined;
        // this.hasmachine=false;
        this.Machine = undefined;
        this.machineEvent = undefined;
        this.productionOrder = undefined;
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }

    ExportToExcel() {
        this.info.machineId = this.machineIdFilter?this.machineIdFilter:undefined;
        this.info.machineEventId = this.machineEv?this.machineEv:undefined;
        this.info.productionOrderNumber = this.prodOrder?this.prodOrder:undefined;
        this.info.dateFrom = this.dateFrom;
        this.info.dateTo = this.dateTo;
        this.service.generateExcel(this.info);
    }

    // get hasMachine() {
    //     // return this.machine._id && this.machine._id !== '';
    //     return this.Machine && this.Machine.Id != 0;
    // }

    detail(data,dateF,dateT) {
        var time = data.timeInMomentStart.split(":");
        var date = data.dateStart.toString();
        var dateTime = new Date(date);
        var a=parseInt(time[0]);
        dateTime.setHours(a);
        var b=parseInt(time[1])
        dateTime.setMinutes(b);
        dateTime=moment(dateTime).format("YYYY/MM/DD HH:mm:ss");
        this.router.navigateToRoute('detail', { id: data.machineId, eventId: data.machineEventId, productionOrderNumber: data.productionOrderOrderNo, date: dateTime, mId: data.mId, Mach: data.Mach, meId:data.meId, MachE: data.MachE, pONOn: data.pONOn, ProdNo: data.ProdNo, dateF: this.dateFrom, dateT: this.dateTo});
    }

    get machineLoader() {
        return MachineLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get machineEventLoader() {
        return MachineEventLoader;
    }
}