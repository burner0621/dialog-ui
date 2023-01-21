import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

const serviceUri = 'subcon-reprocesses';
const serviceSubconSewingUri = 'service-subcon-sewings';
const serviceSubconCuttingUri = 'service-subcon-cuttings';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchItem(info) {
        var endpoint = `${serviceUri}/item`;
        return super.list(endpoint, info);
    }

    searchServiceSubconSewing(info) {
        var endpoint = `${serviceSubconSewingUri}`;
        return super.list(endpoint, info);
    }

    searchServiceSubconCutting(info) {
        var endpoint = `${serviceSubconCuttingUri}`;
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

    searchComplete(info) {
        var endpoint = `${serviceUri}/complete`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/get-pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

export { Service }
