import { buildQueryString } from "aurelia-path";
import { RestService } from "../../../../utils/rest-service";

const uri = "master/budget-cashflows-template";

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        let endpoint = `${uri}`;
        return super.list(endpoint, info);
    }

    createCashflowType(data) {
        let endpoint = `${uri}/cashflow-types`;
        return super.post(endpoint, data);
    }

    createCashflowCategory(data) {
        let endpoint = `${uri}/cashflow-categories`;
        return super.post(endpoint, data);
    }

    createCashflowSubCategory(data) {
        let endpoint = `${uri}/cashflow-sub-categories`;
        return super.post(endpoint, data);
    }
}

export { Service };
