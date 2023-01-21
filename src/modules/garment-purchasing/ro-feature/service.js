import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'ro-feature';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}?RONo=${info.RONo}`;
        return super.get(endpoint);
    }
}