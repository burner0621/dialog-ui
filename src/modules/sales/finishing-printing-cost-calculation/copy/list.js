import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import CostCalculationLoader from "../../../../loader/finishing-printing-cost-calculation-loader";

@inject(Router)
export class List {
    controlOptions = {
        label: {
            length: 1
        },
        control: {
            length: 3
        }
    };

    costCalculationFilter = {};

    get costCalculationLoader() {
        return CostCalculationLoader;
    }

    constructor(router) {
        this.router = router;
    }

    copy() {
        if (this.costCalculation) {
            this.router.navigateToRoute('copy', { id: this.costCalculation.Id });
        }
    }

    costCalculationView(cc) {
        return cc.ProductionOrderNo;
    }
}
