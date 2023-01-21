import { inject } from 'aurelia-framework'
import { Service } from "./service";
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');

@inject(Service)
export class List {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    costCalculationFilter = {}

    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }

    tableData = []

    search() {
        if (this.selectedROGarment) {
            this.service.search({filter: JSON.stringify({RONo: this.selectedROGarment.RO_Number})})
                .then(result => this.tableData = result.data);
        } else {
            alert("Nomor RO harus diisi!");
        }
    }

    xls() {
        if (this.selectedROGarment) {
            this.service.xls({filter: JSON.stringify({RONo: this.selectedROGarment.RO_Number})});
        } else {
            alert("Nomor RO harus diisi!");
        }
    }
}