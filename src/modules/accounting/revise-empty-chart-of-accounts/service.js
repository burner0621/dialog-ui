import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceCoaUri = "master/chart-of-accounts"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }

    getEmpties() {
        let endpoint = `${serviceCoaUri}/empty-names`;
        return super.get(endpoint);
    }

    reviseEmpties(data) {
        var endpoint = `${serviceCoaUri}/empty-names`;
        return super.put(endpoint, data);
    }
}
