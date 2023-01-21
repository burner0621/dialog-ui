import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'purchasing/unit-payment-orders-not-verified-report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    // getXls(info) {
    //     console.log(info);
    //     let endpoint = `${serviceUri}/download?trNo=${info.trNo}&unitId=${info.unitId}&status=${info.status}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    //     return super.getXls(endpoint);
    // }
}