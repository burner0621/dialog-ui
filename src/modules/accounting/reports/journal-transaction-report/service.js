import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'journal-transactions/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getXls(info) {
        var query = `?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;

        let endpoint = `${serviceUri}/downloads/xls${query}`;
        return super.getXls(endpoint);
    }
}