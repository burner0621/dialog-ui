import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/payment-disposition-recaps';
const disositionServiceUri = 'garment-shipping/payment-dispositions';
const invoiceServiceUri = 'garment-shipping/invoices';
const packingListServiceUri = 'garment-shipping/packing-lists';

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

    getDispositionById(id) {
        var endpoint = `${disositionServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getInvoiceById(id) {
        var endpoint = `${invoiceServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getPackingListById(id) {
        var endpoint = `${packingListServiceUri}/${id}`;
        return super.get(endpoint);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

export { Service }