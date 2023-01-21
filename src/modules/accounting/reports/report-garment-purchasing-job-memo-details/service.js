import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'detail-garment-purchasing/memo/report';
const serviceUri2 = 'detail-garment-purchasing/memo/reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getPdf(url) {
        let endpoint = `${serviceUri2}/${url}`;
        return super.getPdf(endpoint);
    }

    getXls(url) {
        let endpoint = `${serviceUri2}/${url}`;
        return super.getXls(endpoint);
    }
}