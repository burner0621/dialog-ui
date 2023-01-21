import { inject } from 'aurelia-framework'
import { Service } from "./service";

const SectionLoader = require("../../../../loader/garment-sections-loader");
const PreSalesContractLoader = require('../../../../loader/garment-pre-sales-contracts-loader');
const GarmentPurchaseRequestLoader = require('../../../../loader/garment-purchase-request-loader');
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');
const UnitLoader = require('../../../../loader/garment-units-loader');
const GarmentBuyerLoader = require("../../../../loader/garment-buyers-loader");
const GarmentBuyerBrandLoader = require("../../../../loader/garment-buyer-brands-loader");

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }
    controlOptionsLeft = {
        label: { length: 6 },
        control: { length: 4 }
    }
    controlOptionsRight = {
        label: { length: 3 },
        control: { length: 4 }
    }

    preSCTypeOptions = [
        null,
        "JOB ORDER",
        "SAMPLE"
    ]

    garmentPurchaseRequestFilter = {
        "PRType == \"MASTER\" || PRType == \"SAMPLE\"": true
    }

    costCalculationFilter = {}

    get sectionLoader() {
        return SectionLoader;
    }
    get preSalesContractLoader() {
        return PreSalesContractLoader;
    }
    get garmentBuyerLoader() { 
        return GarmentBuyerLoader;
    }
    get garmentBuyerBrandLoader() { 
        return GarmentBuyerBrandLoader;
    }
    get garmentPurchaseRequestLoader() {
        return GarmentPurchaseRequestLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }
    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }

    codeNameView = (data) => {
        return `${data.Code} - ${data.Name}`
    }

    tableData = []

    get filter() {
        return {
            section: (this.selectedSection || {}).Code,
            preSCNo: (this.selectedPreSC || {}).SCNo,
            preSCType: this.selectedPreSCType,
            buyerAgent: (this.selectedBuyerAgent || {}).Code,
            buyerBrand: (this.selectedBuyerBrand || {}).Code,
            prNoMaster: (this.selectedPRMaster || {}).PRNo,
            roNoMaster: (this.selectedROMaster || {}).RONo,
            unitMaster: (this.selectedUnitPRMaster || {}).Code,
            roNoJob: (this.selectedROJob || {}).RO_Number,
            unitJob: (this.selectedUnitROJob || {}).Code,
            dateStart: this.selectedDateStart,
            dateEnd: this.selectedDateEnd,
        };
    }

    search() {
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => this.tableData = result.data.map((data, index) => {
                data.itemsLength = Math.max(data.GarmentPurchaseRequests.length ,data.CostCalculations.length) || 1;
                data.style = {
                    'background-color': index % 2 == 0 ? "white" : "whitesmoke"
                };
                return data;
            }));
    }

    clear() {
        this.selectedSection = null;
        this.selectedPreSC = null;
        this.selectedPreSCType = this.preSCTypeOptions[0];
        this.selectedBuyerAgent = null;
        this.selectedBuyerBrand = null;
        this.selectedPRMaster = null;
        this.selectedROMaster = null;
        this.selectedUnitPRMaster = null;
        this.selectedROJob = null;
        this.selectedUnitROJob = null;
        this.selectedDateStart = undefined;
        this.selectedDateEnd = undefined;

        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}