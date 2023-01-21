import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../utils/rest-service';

//const uriPurchasingDocumentExpeditionReport = 'expedition/purchasing-document-expeditions-report';
const uriGRC = 'garment-receipt-correction-reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        console.log(info);
        let endpoint = `${uriGRC}`;
        return super.list(endpoint, info);
    }

    xls(info) {
        console.log(info)
        let endpoint = `${uriGRC}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}

