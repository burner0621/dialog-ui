import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'customs-reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) {
        let endpoint = `${serviceUri}/out`;
        console.log(info)
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        console.log(info);
        let endpoint = `${serviceUri}/out/download?type=${info.type}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}