import { buildQueryString } from "aurelia-path";
import { RestService } from "../../../../../utils/rest-service";

const uri = "master/budget-cashflows-template/cashflow-sub-categories";

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        let endpoint = `${uri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        let endpoint = `${uri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        let endpoint = `${uri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${uri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getById(id) {
        let endpoint = `${uri}/${id}`;
        return super.get(endpoint);
    }

    getBudgetCashflowCategoryById(id) {
        let endpoint = `master/budget-cashflows-template/cashflow-categories/${id}`;
        return super.get(endpoint);
    }
}

export { Service };
