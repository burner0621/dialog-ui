import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'daily-bank-transactions/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
    getXls(args) {
        let url = Object.entries(args).map(e => e.join('=')).join('&');
        let endpoint = `${serviceUri}/xls-in?${url}`;
        return super.getXls(endpoint);
    }
}