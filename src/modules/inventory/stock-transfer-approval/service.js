import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "stock-transfer-notes";
// const serviceUriByNotUser = 'stock-transfer-notes/by-not-user';
const approvalServiceUri = 'stock-transfer-notes/approve';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }
    
    // //by not user
    // search(info) {
    //     let endpoint = `${serviceUriByNotUser}`;
    //     return super.list(endpoint, info);
    // }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    approveData(id) {
        let endpoint = `${approvalServiceUri}/${id}`;
        return super.put(endpoint);
    }
}