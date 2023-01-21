import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/packing-lists';

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

    cancel(data) {
        var endpoint = `${serviceUri}/draft/cancel/${data.id}`;
        return super.put(endpoint, JSON.stringify(data.reason));
    }

    approve(data) {
        var endpoint = `${serviceUri}/draft/approve-md/${data.id}`;
        return super.put(endpoint, data);
    }

    reject(data) {
        var endpoint = `${serviceUri}/draft/reject-md/${data.id}`;
        return super.put(endpoint, JSON.stringify(data.reason));
    }
}

export { Service }