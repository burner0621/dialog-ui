import { Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/machine-queue';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        let endpoint = `${serviceUri}`;
        let query = `orderType=${info.orderType}`;
        
        if (info.machine) {
            query = `${query}&machine=${info.machine}`;
        }

        endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}