import { inject } from 'aurelia-framework'
import { Service } from "./service";

const SectionLoader = require("../../../../loader/garment-sections-loader");
// const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');
// const GarmentBuyerLoader = require("../../../../loader/garment-buyers-loader");

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    // costCalculationFilter = {}

    get sectionLoader() {
        return SectionLoader;
    }
    // get costCalculationGarmentLoader() {
    //     return CostCalculationGarmentLoader;
    // }
    // get garmentBuyerLoader() {
    //     return GarmentBuyerLoader;
    // }

    tableData = []

    get filter() {
        return {
            section: (this.selectedSection || {}).Code,
            // roNo: (this.selectedROGarment || {}).RO_Number,
            // buyer: (this.selectedBuyer || {}).Code,
            acceptedDateStart: this.selectedAcceptedDateStart,
            acceptedDateEnd: this.selectedAcceptedDateEnd,
        };
    }

    search() {
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => this.tableData = result.data);
    }

    clear() {
        this.selectedSection = null;
        // this.selectedROGarment = null;
        // this.selectedBuyer = null;
        // this.selectedAcceptedDateStart = undefined;
        this.selectedAcceptedDateEnd = undefined;
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}