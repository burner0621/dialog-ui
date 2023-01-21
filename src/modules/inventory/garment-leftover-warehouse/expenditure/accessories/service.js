import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-expenditures/accessories';
const stockServiceUri = 'garment/leftover-warehouse-stocks';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
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
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
    
    searchStock(info) {
        var endpoint = stockServiceUri;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

const unitExpenditureNoteUri = 'garment-unit-expenditure-notes';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders';

class GarmentPurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getUnitExpenditureNoteById(id) {
        var endpoint = `${unitExpenditureNoteUri}/${id}`;
        return super.get(endpoint);
    }

    getUnitDeliveryOrderById(id) {
        var endpoint = `${unitDeliveryOrderUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, GarmentPurchasingService }