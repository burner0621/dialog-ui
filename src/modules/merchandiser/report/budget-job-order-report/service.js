import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'display/budget-job-orders';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    xls(info) {
        let endpoint = `${serviceUri}?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}