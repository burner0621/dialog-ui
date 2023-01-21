import { inject } from 'aurelia-framework'
import { Service } from "./service";

const SectionLoader = require("../../../../loader/garment-sections-loader");
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');
const GarmentBuyerLoader = require("../../../../loader/garment-buyers-loader");

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    statusList = [
        null,
        "OK",
        "NOT OK"
    ]

    costCalculationFilter = {}

    get sectionLoader() {
        return SectionLoader;
    }
    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }
    get garmentBuyerLoader() {
        return GarmentBuyerLoader;
    }

    tableData = []

    get filter() {
        return {
            section: (this.selectedSection || {}).Code,
            // roNo: (this.selectedROGarment || {}).RO_Number,
            // buyer: (this.selectedBuyer || {}).Code,
            availableDateStart: this.selectedAvailableDateStart,
            availableDateEnd: this.selectedAvailableDateEnd,
            // status: this.selectedStatus
        };
    }

    search() {
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => {
                this.tableData = result.data;
                const totalOk = this.tableData.filter(f => f.DateDiff <= 2).length;
                const totalNotOk = this.tableData.filter(f => f.DateDiff > 2).length;
                this.dataOk = {
                    total: totalOk,
                    percent: (totalOk / this.tableData.length * 100).toFixed(2)
                };
                this.dataNotOk = {
                    total: totalNotOk,
                    percent: (totalNotOk / this.tableData.length * 100).toFixed(2)
                };
            });
    }

    clear() {
        this.selectedSection = null;
        // this.selectedROGarment = null;
        // this.selectedBuyer = null;
        this.selectedAvailableDateStart = undefined;
        this.selectedAvailableDateEnd = undefined;
        // this.selectedStatus = this.statusList[0];
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}