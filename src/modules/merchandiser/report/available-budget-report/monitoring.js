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
            dateStart: this.selectedDateStart,
            dateEnd: this.selectedDateEnd,
            // status: this.selectedStatus
        };
    }

    search() {
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => {
                this.tableData = result.data;
                                // DATA OK LEAD TIME 35  HARI
                const total35 = this.tableData.filter(f => f.LeadTime == 35).length;
                const totalOk35 = this.tableData.filter(f => f.DateDiff >= 35 && f.LeadTime == 35).length;
                const totalNotOk35 = this.tableData.filter(f => f.DateDiff < 35 && f.LeadTime == 35).length;

                this.dataOk35 = {
                    total: totalOk35,
                    percent: (totalOk35 / total35 * 100).toFixed(2)
                };
                this.dataNotOk35 = {
                    total: totalNotOk35,
                    percent: (totalNotOk35 / total35 * 100).toFixed(2)
                };
                this.tot35 = total35;

                // DATA OK LEAD TIME 25  HARI
                const total25 = this.tableData.filter(f => f.LeadTime == 25).length;
                const totalOk25 = this.tableData.filter(f => f.DateDiff >= 25 && f.LeadTime == 25).length;
                const totalNotOk25 = this.tableData.filter(f => f.DateDiff < 25 && f.LeadTime == 25).length;

                this.dataOk25 = {
                    total: totalOk25,
                    percent: (totalOk25 / total25 * 100).toFixed(2)
                };
                this.dataNotOk25 = {
                    total: totalNotOk25,
                    percent: (totalNotOk25 / total25 * 100).toFixed(2)
                };
                this.tot25 = total25;
                // AKUMULASI DATA
                const total = total35 + total25;
                const totalOk =  totalOk35 + totalOk25;
                const totalNotOk = totalNotOk35 + totalNotOk25;
                
                this.dataOk = {
                    total: totalOk,
                    percent: (totalOk / total * 100).toFixed(2)
                };
                this.dataNotOk = {
                    total: totalNotOk,
                    percent: (totalNotOk / total * 100).toFixed(2)
                };
                this.tot = this.tot25 + this.tot35;
            });
    }

    clear() {
        this.selectedSection = null;
        // this.selectedROGarment = null;
        // this.selectedBuyer = null;
        this.selectedDateStart = undefined;
        this.selectedDateEnd = undefined;
        // this.selectedStatus = this.statusList[0];
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}