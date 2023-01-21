import { RestService } from '../../../utils/rest-service';

const serviceUri = "ro-garments";
const costCalculationGarmentServiceUri = "cost-calculation-garments";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    replace(id, data) {
        var endpoint = `${costCalculationGarmentServiceUri}/${id}`;
        return super.patch(endpoint, data);
    }
}
