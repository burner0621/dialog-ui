import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
var MachineLoader = require('../../../../loader/machines-loader');
import { Service } from './service';
//var EventOrganizerLoader = require('../../../../loader/event-organizer-loader');

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable isSelected = false;

    isSelected = false;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;

    }



    detailOptions = {};
    areaOptions = ["", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"];
    shiftOptions = ['', 'Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    groupOptions = ['', 'A', 'B', 'C'];


    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.ProcessArea) {
            this.ProcessArea = this.data.ProcessArea
        }


        if (this.data.Machine) {
            this.machine = this.data.Machine;

            if (this.machine.UseBQBS) {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "BQ", "BS"];
            } else {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
            }
        }

        if (this.data.ProcessArea) {
            this.processArea = this.data.ProcessArea;
            this.detailOptions.processArea = this.data.ProcessArea;
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    // get eventOrganizerLoader() {
    //     return EventOrganizerLoader;
    // }

    addLossEventItemCallback = (e) => {
        this.data.DailyMonitoringEventLossEventItems = this.data.DailyMonitoringEventLossEventItems || [];
        this.data.DailyMonitoringEventLossEventItems.push({})
    };

    addProductionOrderItemCallback = (e) => {
        this.data.DailyMonitoringEventProductionOrderItems = this.data.DailyMonitoringEventProductionOrderItems || [];
        this.data.DailyMonitoringEventProductionOrderItems.push({})
    };


    // @bindable eventOrganizer;
    // eventOrganizerChanged(n, o) {

    //     if (this.eventOrganizer) {

    //         this.isSelected = true;
    //         this.data.EventOrganizer = this.eventOrganizer;
    //         this.data.Group = this.eventOrganizer.Group;
    //         this.data.ProcessArea = this.eventOrganizer.ProcessArea;
    //         this.data.Kasie = this.eventOrganizer.Kasie;
    //         this.data.Kasubsie = this.eventOrganizer.Kasubsie;
    //         this.detailOptions.processArea = this.data.ProcessArea;


    //         if (!this.isEdit)
    //             this.data.DailyMonitoringEventLossEventItems.splice(0, this.data.DailyMonitoringEventLossEventItems.length);
    //     } else {
    //         this.data.ProcessArea == null;
    //     }
    // }

    @bindable area;
    async  areaChanged(n, o) {
        this.data.ProcessArea = this.area;

        if (this.data.Group && this.data.ProcessArea) {

            var info = { area: this.data.ProcessArea, group: this.data.Group }
            var result = await this.service.getByAreaAndGroup(info);

            if (result) {
                this.data.EventOrganizer = result;
                this.isSelected = true;
                this.data.Kasie = result.Kasie;
                this.data.Kasubsie = result.Kasubsie;
                if (!this.isEdit)
                    this.data.DailyMonitoringEventLossEventItems.splice(0, this.data.DailyMonitoringEventLossEventItems.length);

            } else {
                this.isSelected = false;
                this.data.Kasie = "";
                this.data.Kasubsie = "";
            }

        } else {
            this.data.ProcessArea = this.area
        }
    }


    @bindable group;
    async  groupChanged(n, o) {
        this.data.Group = this.group;

        if (this.data.Group && this.data.ProcessArea) {

            var info = { area: this.data.ProcessArea, group: this.data.Group }
            var result = await this.service.getByAreaAndGroup(info);

            if (result) {
                this.data.EventOrganizer = result;
                this.isSelected = true;
                this.data.Kasie = result.Kasie;
                this.data.Kasubsie = result.Kasubsie;
                if (!this.isEdit)
                    this.data.DailyMonitoringEventLossEventItems.splice(0, this.data.DailyMonitoringEventLossEventItems.length);

            } else {
                this.isSelected = false;
                this.data.Kasie = "";
                this.data.Kasubsie = "";
            }

        } else {
            this.data.Group = this.group
        }
    }

    @bindable machine;
    machineChanged(n, o) {
        console.log(this.machine)

        if (this.machine) {

            this.data.Machine = this.machine;

            if (this.machine.UseBQBS) {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "BQ", "BS"];
            } else {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
            }
        } else {
            this.data.Machine = null
        }
    }
    productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
    lossEventItemColumns = ["Kode Loss", "Kategori Loss", "Losses", "Keterangan", "Waktu (Menit)"];
}