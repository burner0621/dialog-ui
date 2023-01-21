import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentProductionService } from "../service";
const LeftoverComodityLoader = require('../../../../../../loader/garment-leftover-comodity-loader');

@inject(GarmentProductionService)
export class Detail {
    @bindable selectedComodity;
    @bindable selectedExpenditureGood;

    itemsColumns = [
        { header: "Size", value: "SizeName" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
        { header: "Keterangan", value: "Remark" },
        { header: "Komoditi", value: "ComodityName" }
    ]

    get leftoverComodityLoader() {
        return LeftoverComodityLoader;
    }

    leftoverComodityView = (leftoverComodity) => {
        return `${leftoverComodity.Code} - ${leftoverComodity.Name}`;
    }

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        console.log(this.data)

        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.Id = context.context.options.Id;

        this.selectedComodity = this.data.LeftoverComodity;

    }

    selectedComodityChanged(newValue) {
        if (newValue) {
            this.data.LeftoverComodity = newValue;
        }
    }

}