import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/cover-letters';
const packingListServiceUri = 'garment-shipping/packing-lists';
const serviceUriShippingInstruction = 'garment-shipping/shipping-instructions';
const productionUri = 'expenditure-goods';

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

    searchShippingInstruction(info) {
        var endpoint = `${serviceUriShippingInstruction}`;
        return super.list(endpoint, info);
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

    getPackingListById(id) {
        var endpoint = `${packingListServiceUri}/${id}`;
        return super.get(endpoint);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

class ProductionService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "garment-production");
  }

  getExpenditureGoodByInvoiceNo(info) {
    var endpoint = `${productionUri}`;
    return super.list(endpoint, info);
  }
}

export { Service, ProductionService }
