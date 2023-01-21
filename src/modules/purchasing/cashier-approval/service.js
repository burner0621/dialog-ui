import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

// const serviceUri = 'cashier-approval';
const serviceUri = "vb-request-documents";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchNotApproveVB(info) {
        let endpoint = `${serviceUri}/not-approved`;
        return super.list(endpoint, info);
    }

    approval(data) {
        let endpoint = `${serviceUri}/approval`;
        return super.post(endpoint, data);
    }

    cancellation(data) {
        let endpoint = `${serviceUri}/cancellation`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}