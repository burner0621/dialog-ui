import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'material-distribution-notes';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }
    
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    approveData(ids) {
        let endpoint = `${serviceUri}`;
        return super.put(endpoint, ids);
    }
}