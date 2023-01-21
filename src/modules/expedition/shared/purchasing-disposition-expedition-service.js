import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uriPurchasingDispositionExpedition = 'purchasing-disposition-expeditions';

class PurchasingDispositionExpeditionService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${uriPurchasingDispositionExpedition}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${uriPurchasingDispositionExpedition}/${id}`;
        return super.get(endpoint);
    }

    delete(data) {
        let endpoint = `${uriPurchasingDispositionExpedition}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}

export default PurchasingDispositionExpeditionService;
