import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/letter-of-credits';
const amendLCServiceUri = 'garment-shipping/amend-letter-of-credits';
const packingListServiceUri = 'garment-shipping/packing-lists';
const invoiceServiceUri = 'garment-shipping/invoices';

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

    searchAmendLC(info) {
        var endpoint = `${amendLCServiceUri}`;
        return super.list(endpoint, info);
    }

    searchPackingList(info) {
        var endpoint = `${packingListServiceUri}`;
        return super.list(endpoint, info);
    }

    searchInvoice(info) {
        var endpoint = `${invoiceServiceUri}`;
        return super.list(endpoint, info);
    }
}


export { Service }