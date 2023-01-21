import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-receipts/monitoring-avals';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

}