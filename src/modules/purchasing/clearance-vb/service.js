
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const servicePOUri = "vb-realization-documents/with-po";
const serviceNonPOUri = "vb-realization-documents/non-po";
const serviceUri = "clearance-vb";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPOById(id) {
        var endpoint = `${servicePOUri}/${id}`;
        return super.get(endpoint);
    }

    getNonPOById(id) {
        var endpoint = `${serviceNonPOUri}/${id}`;
        return super.get(endpoint);
    }

    post(data) {
        var endpoint = `${serviceUri}/post`;
        return super.put(endpoint, data);
    }

    unpost(data) {
        var endpoint = `${serviceUri}/unpost/${data.Id}`;
        return super.put(endpoint, data);
    }
}

export class VBRequestDocumentService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }

    getById(id) {
        let endpoint = `${vbRequestServiceWithPOUri}/${id}`;
        return super.get(endpoint);
    }
}