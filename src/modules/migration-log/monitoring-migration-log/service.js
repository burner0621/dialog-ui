import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
const serviceUri = 'migrationLog';

export class Service extends RestService {


    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    search(info) { 
        var endpoint = `${serviceUri}/get/report`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
}