import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/credit-advices';
const serviceInvoiceUri = 'garment-shipping/invoices';
const servicePackingListUri = 'garment-shipping/packing-lists';

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

    getInvoiceById(id) {
        var endpoint = `${serviceInvoiceUri}/${id}`;
        return super.get(endpoint);
    }

    getPackingListById(id) {
        var endpoint = `${servicePackingListUri}/${id}`;
        return super.get(endpoint);
    }
}

const serviceBuyerUri = 'master/garment-buyers';
const serviceBankUri = 'master/account-banks';

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getBuyerById(id) {
        var endpoint = `${serviceBuyerUri}/${id}`;
        return super.get(endpoint);
    }

    getBankById(id) {
        var endpoint = `${serviceBankUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, CoreService }