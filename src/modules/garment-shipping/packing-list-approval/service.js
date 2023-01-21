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

    update(data) {
        var endpoint = `${serviceUri}/approve-shipping/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    cancel(data) {
        var endpoint = `${serviceUri}/cancel/${data.id}`;
        return super.put(endpoint, JSON.stringify(data.reason));
    }

    rejectUnit(data) {
        var endpoint = `${serviceUri}/reject-shipping-unit/${data.id}`;
        return super.put(endpoint, JSON.stringify(data.reason));
    }

    rejectMd(data) {
        var endpoint = `${serviceUri}/reject-shipping-md/${data.id}`;
        return super.put(endpoint, JSON.stringify(data.reason));
    }
}

const costCalculationServiceUri = 'cost-calculation-garments';
const SalesContractserviceUri = "merchandiser/garment-sales-contracts";
class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationById(id) {
        var endpoint = `${costCalculationServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getSalesContractById(id) {
        var endpoint = `${SalesContractserviceUri}/${id}`;
        return super.get(endpoint);
    }

    getCostCalculationByRO(ro) {
        var endpoint = `${costCalculationServiceUri}/by-ro/${ro}`;
        return super.get(endpoint);
    }
}

const sectionServiceUri = "master/garment-sections";
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getSectionById(id) {
        var endpoint = `${sectionServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, SalesService, CoreService }