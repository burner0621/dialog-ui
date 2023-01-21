import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

const serviceUri = 'sewing-ins';
const loadingUri = 'loadings';
const serviceUriSewingOut = 'sewing-outs/complete';
const comodityPriceserviceUri = 'comodity-prices';
const serviceUriFinishingOut='finishing-outs/complete';


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

    getLoadingById(id){
        var endpoint = `${loadingUri}/${id}`;
        return super.get(endpoint);
    }

    searchSewingOut(info) {
        var endpoint = `${serviceUriSewingOut}`;
        return super.list(endpoint, info);
    }

    searchFinishingOut(info) {
        var endpoint = `${serviceUriFinishingOut}`;
        return super.list(endpoint, info);
    }
}

export { Service }