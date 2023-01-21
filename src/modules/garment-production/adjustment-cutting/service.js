import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-cutting-adjustments';
const serviceUriCutIn = 'cutting-ins';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getComodityPrice(info) {
        var endpoint = `${comodityPriceserviceUri}`;
        return super.list(endpoint, info);
    }

    searchCuttingIn(info) {
        var endpoint = `${serviceUriCutIn}`;
        return super.list(endpoint, info);
    }

    searchCuttingInComplete(info) {
        var endpoint = `${serviceUriCutIn}/complete`;
        return super.list(endpoint, info);
    }

    GetCuttingById(id) {
        var endpoint = `${serviceUriCutIn}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

}

export { Service }