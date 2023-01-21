import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-purchase-requests';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
        return super.list(endpoint, info);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    patch(info, data) {
        var endpoint = `${serviceUri}/items`;
        return super.patch(endpoint, data, info);
    }
}

const serviceMasterGarmentProductUri = 'master/garmentProducts';

class CoreService extends RestService {
    constructor(http, aggregator, config) {
        super(http, aggregator, config, "core");
    }

    getGarmentProductsByIds(info) {
        var endpoint = `${serviceMasterGarmentProductUri}/byId`;
        return super.list(endpoint, { garmentProductList: info })
            .then((result) => result.data);
    }
}

const costCalculationServiceUri = 'cost-calculation-garments';

class CostCalculationService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    getMaterials(info) {
        var endpoint = `${costCalculationServiceUri}/materials/by-prmasteritemids`;
        return super.list(endpoint, info);
    }
}

export { Service, CoreService, CostCalculationService }