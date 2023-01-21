import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const uriPurchasingDocumentExpeditionReport = 'expedition/purchasing-document-expeditions-report';
const uriUPO = 'unit-payment-orders-expedition-report';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        let endpoint = `${uriUPO}`;
        return super.list(endpoint, info);
    }

    xls(info) {
        console.log(info)
        let endpoint = `${uriUPO}?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}

class AzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        let endpoint = `${uriPurchasingDocumentExpeditionReport}`;
        return super.list(endpoint, info);
    }
}

export {
    Service,
    AzureService,
};