import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-receipt-corrections';
const URNServiceUri = 'garment-unit-receipt-notes';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getURNById(id) {
        var endpoint = `${URNServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getDOItemsById(id) {
        var endpoint = `${URNServiceUri}/do-items/${id}`;
        return super.get(endpoint);
    }

}
