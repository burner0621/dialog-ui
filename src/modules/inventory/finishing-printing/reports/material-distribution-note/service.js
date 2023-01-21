import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'material-distribution-note-report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    pdf(info) {
        let endpoint = `${serviceUri}?unitId=${info.unitId}&unitName=${info.unitName}&type=${info.type}&date=${info.date}`;
        return super.getPdf(endpoint);
    }
}