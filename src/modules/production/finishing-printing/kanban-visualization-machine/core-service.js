import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "master/machine";

export class CoreService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
}