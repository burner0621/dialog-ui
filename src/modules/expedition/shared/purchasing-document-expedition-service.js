import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uriPurchasingDocumentExpedition = 'expedition/purchasing-document-expeditions';

class PurchasingDocumentExpeditionService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        let endpoint = `${uriPurchasingDocumentExpedition}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${uriPurchasingDocumentExpedition}/${id}`;
        return super.get(endpoint);
    }

    delete(data) {
        let endpoint = `${uriPurchasingDocumentExpedition}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}

export default PurchasingDocumentExpeditionService;
