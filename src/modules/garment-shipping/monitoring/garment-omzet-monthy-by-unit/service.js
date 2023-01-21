import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/monitoring/garment-omzet-by-unit';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    // search(info) {
    //     let endpoint = `${serviceUri}`;
    //     return super.list(endpoint, info);
    // }

    // xls(info) {
    //     let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
    //     return super.getXls(endpoint);
    // }

    search(info) { 
        var endpoint = `${serviceUri}?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
    xls(info) {
        var endpoint = `${serviceUri}/download?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}