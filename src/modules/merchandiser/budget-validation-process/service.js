
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "merchandiser/budget-validations/ppic";
const costCalculationGarmentServiceUri = "cost-calculation-garments";

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getCostCalculationGarmentById(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/with-product-names/${id}`;
        return super.get(endpoint);
    }
}

export { Service }