import { buildQueryString } from "aurelia-path";
import { RestService } from "../../../../../utils/rest-service";

class MasterService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getCategoryById(id) {
        let endpoint = `master/categories/${id}`;
        return super.get(endpoint);
    }
}

export { MasterService };
