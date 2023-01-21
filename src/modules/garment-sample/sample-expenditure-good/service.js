import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-sample-expenditure-goods';
const comodityPriceserviceUri = 'comodity-prices';
const finishedGoodServiceUri = 'garment-sample-finished-good-stocks';
const serviceUriFinOut = 'garment-sample-finishing-outs';
const serviceUriSampleRequest = 'garment-sample-requests';

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

    getFinishedGood(info) {
        var endpoint = `${finishedGoodServiceUri}/list`;
        return super.list(endpoint, info);
    }

    
    getFinishedGoodByRo(info) {
        var endpoint = `${finishedGoodServiceUri}/get-by-ro`;
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

    searchFinishingOut(info) {
        var endpoint = `${serviceUriFinOut}`;
        return super.list(endpoint, info);
    }

    getPdfById(id,buyer) {
        var endpoint = `${serviceUri}/${id}/${buyer}`;
        return super.getPdf(endpoint);
    }
    getSampleRequest(info) {
        var endpoint = `${serviceUriSampleRequest}`;
        return super.list(endpoint, info);
    }
}

const UnitServiceUri = 'master/units';
class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}

export { Service,CoreService }