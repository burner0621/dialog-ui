import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis')
var MachineLoader = require('../../../../loader/dyeing-printing-machines-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');
var MachineEventLoader = require('../../../../loader/machine-event-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable title;
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable productionOrderDetails = [];

    @bindable localStartDate;
    @bindable localEndDate;
    @bindable productionOrder;
    @bindable Machine;

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    divisionFilter = { "UnitDivisionName": "DYEING & PRINTINg" };

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.element = element;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.localStartDate = new Date(Date.parse(this.data.DateStart));
        this.localEndDate = new Date(Date.parse(this.data.DateEnd));

        // this.data.TimeInMomentStart = this.data.TimeInMillisStart != undefined ? moment(this.data.TimeInMillisStart) : this._adjustMoment();
        // this.data.TimeInMomentEnd = this.data.TimeInMillisEnd != undefined && this.data.TimeInMillisEnd != null ? moment(this.data.TimeInMillisEnd) : this._adjustMoment();

        if (this.data.ProductionOrder && this.data.ProductionOrder.Details) {
            if (this.data.ProductionOrder.Details > 0) {
                this.productionOrder = this.data.ProductionOrder;
                this.productionOrderDetails = this.data.ProductionOrder.Details;
                this._mapProductionOrderDetail();
            }

        }
    }

    localStartDateChanged(newValue) {
        this.data.DateStart = new Date(this.localStartDate);
        this.data.TimeInMillisStart = this.localStartDate.getTime();
    }

    localEndDateChanged(newValue) {
        this.data.DateEnd = new Date(this.localEndDate);
        this.data.TimeInMillisEnd = this.localEndDate.getTime();
    }

    MachineChanged(newValue) {
        delete this.data.MachineEvent;
        if (this.Machine) {
            this.data.Machine = this.Machine;
        } else {
            this.Machine = null;
            this.data.Machine = {};
        }
    }

    timeStartChanged(E) {
        var tempTimeStart = e.detail;
        if (tempTimeStart) {
            tempTimeStart = this._adjustMoment(tempTimeStart);
            this.data.TimeInMillisStart = momentToMillis(tempTimeStart);
        }
        else {
            delete this.data.TimeInMillisStart;
        }
    }

    timeEndChanged(E) {
        var tempTimeEnd = e.detail;
        if (tempTimeEnd) {
            tempTimeEnd = this._adjustMoment(tempTimeEnd);
            this.data.TimeInMillisEnd = momentToMillis(tempTimeEnd);
        }
        else {
            delete this.data.TimeInMillisEnd;
        }
    }

    async productionOrderChanged(newValue) {
        if (this.productionOrder) {
            this.data.ProductionOrder = this.productionOrder
            this.productionOrderDetails = await this.service.getProductionOrderDetails(this.productionOrder.OrderNo);
            if (this.hasProductionOrderDetails) {
                this._mapProductionOrderDetail();
                this.data.ProductionOrderDetail = {};
                this.data.ProductionOrderDetail = this.productionOrderDetails[0];
            }
        }
        else {
            delete this.data.ProductionOrderDetail;
            this.productionOrder = null;
            this.data.ProductionOrder = {};
        }
    }

    get hasProductionOrderDetails() {
        return this.productionOrderDetails.length > 0;
    }

    get hasMachine() {
        // return this.data && this.data.machineId && this.data.machineId !== '';
        return this.data && this.data.Machine && this.data.Machine.Id != 0;
    }

    _mapProductionOrderDetail() {
        this.productionOrderDetails.map(detail => {
            detail.toString = function () {
                return `${this.ColorRequest}`;
            }
            return detail;
        });
    }

    _adjustMoment(timeInMoment) {
        if (timeInMoment) {
            timeInMoment.set('year', 1970);
            timeInMoment.set('month', 0);
            timeInMoment.set('date', 1);
        }
        return timeInMoment;
    }

    get machineLoader() {
        return MachineLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get machineEventLoader() {
        return this.Machine ? this.Machine.MachineEvents : [];
    }

}
