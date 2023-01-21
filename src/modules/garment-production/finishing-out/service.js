import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

const serviceUri = 'finishing-outs';
const serviceUriFinIn = 'finishing-ins';
const serviceUriPR = 'garment-purchase-requests';
const comodityPriceserviceUri = 'comodity-prices';
const serviceUriSewIn = 'sewing-ins';

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

    searchFinishingIn(info) {
        var endpoint = `${serviceUriFinIn}`;
        return super.list(endpoint, info);
    }

    searchFinishingInByRo(info) {
        var endpoint = `${serviceUriFinIn}/get-by-ro`;
        return super.list(endpoint, info);
    }

    searchFinishingInComplete(info) {
        var endpoint = `${serviceUriFinIn}/complete`;
        return super.list(endpoint, info);
    }

    GetFinishingInById(id) {
        var endpoint = `${serviceUriFinIn}/${id}`;
        return super.get(endpoint);
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

    searchSewingIn(info) {
        var endpoint = `${serviceUriSewIn}`;
        return super.list(endpoint, info);
    }

}

class PurchasingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getGarmentPR(info) {
        var endpoint = `${serviceUriPR}`;
        return super.list(endpoint, info);
    }
}

export { Service,PurchasingService }