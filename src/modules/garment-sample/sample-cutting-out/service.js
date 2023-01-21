import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-sample-cutting-outs';
const cuttingInUri = 'garment-sample-cutting-ins';
const gComodityServiceUri = 'master/garment-comodities';
const uomServiceUri = 'master/uoms';
const SampleserviceUri = 'garment-sample-requests';
const UnitServiceUri = 'master/units';

const sewingInServiceUri = 'garment-sample-sewing-ins';

const comodityPriceserviceUri = 'comodity-prices';
const hOrderKodeByNoServiceUri = 'local-merchandiser/horders/kode-by-no';
const costCalculationServiceUri = 'cost-calculation-garments';

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

    getCuttingIn(info) {
        var endpoint = `${cuttingInUri}/complete`;
        return super.list(endpoint, info);
    }

    getSewingDO(id) { 
        var endpoint = `${sewingServiceUri}/byCutOutId/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id,buyer) {
        var endpoint = `${serviceUri}/${id}/${buyer}`;
        return super.getPdf(endpoint);
    }

    getSampleRequest(info) {
        var endpoint = `${SampleserviceUri}`;
        return super.list(endpoint, info);
    }

    getSewingIn(info) { 
        var endpoint = `${sewingInServiceUri}/complete`;
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

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getGComodity(info) {
        var endpoint = `${gComodityServiceUri}`;
        return super.list(endpoint, info);
    }

    getUom(info) { 
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}

const serviceUriPR = 'garment-purchase-requests';

class PurchasingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getGarmentPR(info) {
        var endpoint = `${serviceUriPR}`;
        return super.list(endpoint, info);
    }
}

export { Service, SalesService, CoreService,PurchasingService }