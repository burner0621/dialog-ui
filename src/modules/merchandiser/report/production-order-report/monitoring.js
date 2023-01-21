import { inject } from 'aurelia-framework'
import { Service } from "./service";

const SectionLoader = require("../../../../loader/garment-sections-loader");
const UnitLoader = require('../../../../loader/garment-units-loader');
const GarmentBuyerLoader = require("../../../../loader/garment-buyers-loader");

@inject(Service)
export class Monitoring {

    constructor(service) {
        this.service = service;

        const moment = require('moment');
        moment.locale('id');

        this.monthList = moment.months();

        this.currentYear = moment().year();
        this.currentMonth = moment().month();

        this.filterYear = this.currentYear;
        this.filterMonth = this.monthList[this.currentMonth];

        this.yearOptions = {
            min: this.currentYear - 50,
            max: this.currentYear + 50
        }
    }

    tableData = []

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    get sectionLoader() {
        return SectionLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }
    get garmentBuyerLoader() {
        return GarmentBuyerLoader;
    }

    get filter() {
        return {
            year: this.filterYear,
            month: this.monthList.indexOf(this.filterMonth) + 1,
            unit: (this.filterUnit || {}).Code,
            section: (this.filterSection || {}).Code,
            buyer: (this.filterBuyer || {}).Code
        }
    }

    search() {
        if (this.filterYear < this.yearOptions.min || this.filterYear > this.yearOptions.max) {
            alert("Tahun di luar batas.");
        } else {
            this.service.search({ filter: JSON.stringify(this.filter) })
                .then(result => {
                    this.tableData = result.data;
                    this.tableData.forEach(data => {
                        data.rowSpan = data.Buyers.reduce((acc, cur) => acc += cur.Details.length || 1, 0) || 1;
                    })

                    this.grandTotalByUom = [];
                    this.grandTotal = 0;
                    this.tableData.forEach(data => {
                        data.Buyers.forEach(buyer => {
                            buyer.Details.forEach(detail => {
                                const uomIndex = this.grandTotalByUom.findIndex(uom => uom.uom == detail.Uom);
                                if (uomIndex > -1) {
                                    this.grandTotalByUom[uomIndex].quantity += detail.Quantity;
                                    this.grandTotalByUom[uomIndex].amount += detail.Amount;
                                } else {
                                    this.grandTotalByUom.push({
                                        uom: detail.Uom,
                                        quantity: detail.Quantity,
                                        amount: detail.Amount
                                    });
                                }
                                this.grandTotal += detail.Amount;
                            });
                        });
                    });
                });
        }
        return;
    }

    clear() {
        this.filterYear = this.currentYear;
        this.filterMonth = this.monthList[this.currentMonth];
        this.filterUnit = null;
        this.filterSection = null;
        this.filterBuyer = null;
        this.tableData = [];
        this.grandTotalByUom = [];
        this.grandTotal = 0;
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}