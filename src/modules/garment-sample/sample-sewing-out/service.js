import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

const serviceUri = 'garment-sample-sewing-outs';
const UnitServiceUri = 'master/units';
const serviceUriSewIn =  'garment-sample-sewing-ins';
const serviceUriPR = 'garment-sample-requests';
const comodityPriceserviceUri = 'comodity-prices';
const serviceUriFinIn = 'garment-sample-finishing-ins';

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

    searchSewingIn(info) {
        var endpoint = `${serviceUriSewIn}`;
        return super.list(endpoint, info);
    }
    
    searchFinishingIn(info) {
        var endpoint = `${serviceUriFinIn}`;
        return super.list(endpoint, info);
    }
    
    searchSewingInByRo(info) {
        var endpoint = `${serviceUriSewIn}/get-by-ro`;
        return super.list(endpoint, info);
    }

    GetSewingInById(id) {
        var endpoint = `${serviceUriSewIn}/${id}`;
        return super.get(endpoint);
    }
    getGarmentPR(info) {
        var endpoint = `${serviceUriPR}`;
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

    getPdfById(id,buyer) {
        var endpoint = `${serviceUri}/${id}/${buyer}`;
        return super.getPdf(endpoint);
    }

}

class PurchasingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getGarmentPRs(info) {
        var endpoint = `${serviceUriPR}`;
        return super.list(endpoint, info);
    }
}
export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}
export { Service,PurchasingService }