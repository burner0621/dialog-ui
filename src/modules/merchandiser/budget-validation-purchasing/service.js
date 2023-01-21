import { RestService } from '../../../utils/rest-service';

const costCalculationGarmentServiceUri = "cost-calculation-garments";

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${costCalculationGarmentServiceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/${id}`;
        return super.get(endpoint);
    }

    replace(id, data) {
        var endpoint = `${costCalculationGarmentServiceUri}/${id}`;
        return super.patch(endpoint, data);
    }

    getByIdWithProductNames(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/with-product-names/${id}`;
        return super.get(endpoint);
    }
}

export { Service }