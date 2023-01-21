import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'display/budget-master-sample';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    xls(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}