import { inject, bindable, computedFrom } from 'aurelia-framework'
import { CostCalculationService } from '../service';
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');

@inject(CostCalculationService)
export class Detail {
    @bindable error;
    @bindable selectedCostCalculation;
    @bindable selectedPOSerialNumber;

    isOverUsageReasonReadOnly = true;

    constructor(CostCalculationService) {
        this.costCalculationService = CostCalculationService;
    }

    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }

    @computedFrom("data.Product")
    get dataProduct() {
        return this.data.Product ? this.data.Product.Code : "-";
    }

    @computedFrom("data.Quantity", "data.Conversion")
    get convertedQuantity() {
        return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.readOnly = this.options.readOnly;

        if ((this.error && this.error.OverUsageReason) || (this.data && this.data.OverUsageReason)) {
            this.isOverUsageReasonReadOnly = false || this.readOnly;
        } else {
            this.isOverUsageReasonReadOnly = true || this.readOnly;
        }
    }

    quantityChanged(value) {
        if (value <= this.data.QuantityCC) {
            this.isOverUsageReasonReadOnly = true;
            this.data.OverUsageReason = null;
            if (this.error) {
                this.error.OverUsageReason = null;
            }
        }
    }
    
}