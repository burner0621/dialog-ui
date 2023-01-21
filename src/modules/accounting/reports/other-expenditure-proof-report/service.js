import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'others-expenditure-proof-documents/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
    getXls(args) {
        let url =Object.entries(args).map(e => e.join('=')).join('&');
        let endpoint = `${serviceUri}/xls?${url}`;
        return super.getXls(endpoint);
    }
}