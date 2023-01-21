import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uri = 'garment-disposition-expeditions';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    createVerification(data) {
        let endpoint = `${uri}/send-to-verification`;
        return super.post(endpoint, data);
    }

    createAccounting(data) {
        let endpoint = `${uri}/send-to-accounting`;
        return super.post(endpoint, data);
    }

    search(info) {
        var endpoint = `${uri}/send-to-verification-or-accounting`;
        return super.list(endpoint, info);
    }

    sendToPurchasing(data) {
        let endpoint = `${uri}/send-to-disposition-note/${data.Id}`;
        return super.put(endpoint, data);
    }
}
