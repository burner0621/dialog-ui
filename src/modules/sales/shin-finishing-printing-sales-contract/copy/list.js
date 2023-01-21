import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import SalesContractLoader from "../../../../loader/shin-finishing-printing-sales-contract-loader";

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

    salesContractFilter = {};

    get salesContractLoader() {
        return SalesContractLoader;
    }

    constructor(router) {
        this.router = router;
    }

    copy() {
        if (this.salesContract) {
            this.router.navigateToRoute('copy', { id: this.salesContract.Id });
        }
    }

    salesContractView(sc) {
        return sc.SalesContractNo;
    }
}
