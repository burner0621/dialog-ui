import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'customs-reports/scrap';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        // super(http, aggregator, config, "customs-report");
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}/aval-komponen-in`;
        console.log(info)
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        console.log(info);
        let endpoint = `${serviceUri}/aval-komponen-in/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}