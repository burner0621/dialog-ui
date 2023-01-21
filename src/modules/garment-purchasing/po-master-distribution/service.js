import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-po-master-distributions';
class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
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

    readDO(id) {
        var endpoint = `${serviceDOUri}/${id}`;
        return super.get(endpoint);
    }
}

const servicePRUri = 'garment-purchase-requests';
class PurchaseRequestService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${servicePRUri}/dynamic`;
        return super.list(endpoint, info);
    }
}

const serviceDOUri = 'garment-delivery-orders';
class DeliveryOrderService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceDOUri}/loader`;
        return super.list(endpoint, info);
    }

    read(id) {
        var endpoint = `${serviceDOUri}/${id}`;
        return super.get(endpoint);
    }
}

const serviceCCUri = 'cost-calculation-garments';
class CostCalculationService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    read(id) {
        var endpoint = `${serviceCCUri}/${id}`;
        return super.get(endpoint);
    }

    readMaterials(info) {
        var endpoint = `${serviceCCUri}/materials/dynamic`;
        return super.list(endpoint, info);
    }
}

export { Service, PurchaseRequestService, DeliveryOrderService, CostCalculationService }
