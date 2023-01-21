import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/shipping-instructions';
const serviceUriPackingList = 'garment-shipping/packing-lists';

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

    update(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    searchPackingList(info) {
        var endpoint = `${serviceUriPackingList}`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}


const serviceUriBuyer = 'master/garment-buyers';
class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getBuyerById(id) {
        var endpoint = `${serviceUriBuyer}/${id}`;
        return super.get(endpoint);
    }
}


export { Service, CoreService}