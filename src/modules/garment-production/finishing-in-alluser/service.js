import { RestService } from '../../../utils/rest-service';

const serviceUri = 'finishing-ins';
const serviceUriSewingOut = 'sewing-outs/complete';
const costCalculationServiceUri = 'cost-calculation-garments';
const comodityPriceserviceUri = 'comodity-prices';

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
    
    searchSewingOut(info) {
        var endpoint = `${serviceUriSewingOut}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getSewingOutbyId(id) {
        var endpoint = `${serviceUriSewingOut}/${id}`;
        return super.get(endpoint);
    }

}

export { Service }