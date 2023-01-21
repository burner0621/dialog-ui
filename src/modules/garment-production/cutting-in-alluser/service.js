import { RestService } from '../../../utils/rest-service';

const serviceUri = 'cutting-ins';
const preparingServiceUri = 'preparings';
const uomServiceUri = 'master/uoms';
const comodityServiceUri = 'master/garment-comodities';
const comodityPriceserviceUri = 'comodity-prices';
const costCalculationServiceUri = 'cost-calculation-garments';
const hOrderKodeByNoServiceUri = 'local-merchandiser/horders/kode-by-no';
const sewingOutServiceUri = 'sewing-outs';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getComodityPrice(info) {
        var endpoint = `${comodityPriceserviceUri}`;
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

    getPreparing(info) {
        var endpoint = `${preparingServiceUri}`;
        return super.list(endpoint, info);
    }

    readPreparing(id) {
        var endpoint = `${preparingServiceUri}/${id}`;
        return super.get(endpoint);
    }

    readSewingOut(id) {
        var endpoint = `${sewingOutServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getUom(info) {
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }

    getComodities(info) {
        var endpoint = `${comodityServiceUri}`;
        return super.list(endpoint, info);
    }
}

class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationByRONo(info) {
        var endpoint = `${costCalculationServiceUri}`;
        return super.list(endpoint, info);
    }

    getHOrderKodeByNo(info) {
        var endpoint = `${hOrderKodeByNoServiceUri}`;
        return super.list(endpoint, info);
    }
}

export { Service, CoreService,SalesService }