import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uri = 'garment-disposition-expeditions';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    sendToPurchasingRejected(id, remark) {
        let endpoint = `${uri}/send-to-purchasing-rejected/${id}`;
        return super.put(endpoint, { Remark: remark });
    }

    sendToAccounting(id) {
        let endpoint = `${uri}/send-to-accounting/${id}`;
        return super.put(endpoint, {});
    }

    sendToCashier(id) {
        let endpoint = `${uri}/send-to-cashier/${id}`;
        return super.put(endpoint, {});
    }

    search(info) {
        var endpoint = `${uri}/verified`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${uri}/verified/${id}`;
        return super.get(endpoint);
    }
}
