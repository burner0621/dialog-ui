import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/local-sales-notes';
const serviceUriSC = 'garment-shipping/local-sales-contracts';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    approve(data) {
        var endpoint = `${serviceUri}/approve-shipping/${data.id}`;
        return super.put(endpoint, data);
    }

    reject(data) {
        var endpoint = `${serviceUri}/reject-shipping/${data.id}`;
        return super.put(endpoint, data);
    }

    getSCById(id) {
        var endpoint = `${serviceUriSC}/${id}`;
        return super.get(endpoint);
    }
}

export { Service }