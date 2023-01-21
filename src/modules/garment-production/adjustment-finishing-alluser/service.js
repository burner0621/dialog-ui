import { RestService } from '../../../utils/rest-service';

const serviceUri = 'adjustments';
const serviceUriFinIn = 'finishing-ins';
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

    searchFinishingIn(info) {
        var endpoint = `${serviceUriFinIn}`;
        return super.list(endpoint, info);
    }

    searchFinishingInComplete(info) {
        var endpoint = `${serviceUriFinIn}/complete`;
        return super.list(endpoint, info);
    }

    GetFinishingInById(id) {
        var endpoint = `${serviceUriFinIn}/${id}`;
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

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    GetSewingInById(id) {
        var endpoint = `${serviceUriSewIn}/${id}`;
        return super.get(endpoint);
    }

}

export { Service }