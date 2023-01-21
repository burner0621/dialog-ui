import { inject } from 'aurelia-framework'
import { Service } from "./service";

const SectionLoader = require("../../../../loader/garment-sections-loader");
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');
const PreSalesContractLoader = require('../../../../loader/garment-pre-sales-contracts-loader');
const UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    costCalculationFilter = {}

    preSalesContractFilter = {
        SCType: "JOB ORDER"
    }

    get sectionLoader() {
        return SectionLoader;
    }
    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }
    get preSalesContractLoader() {
        return PreSalesContractLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }
    get userLoader() {
        return (keyword) => {
            return this.service.unpostReasonCreators({ keyword: keyword })
                .then(result => {
                    return result.data.map(data => { return { username: data } });
                });
        };
    }

    tableData = []

    get filter() {
        return {
            Section: (this.selectedSection || {}).Code,
            RO_Number: (this.selectedROGarment || {}).RO_Number,
            PreSCNo : (this.selectedPreSC || {}).SCNo,
            UnitCode: (this.selectedUnit || {}).Code,
            CreatedBy: (this.selectedUser || {}).username,
        };
    }

    search() {
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => this.tableData = result.data);
    }

    clear() {
        this.selectedSection = null;
        this.selectedROGarment = null;
        this.selectedPreSC = null;
        this.selectedUnit = null;
        this.selectedUser = null;
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}