import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/report/detail-omzet-by-unit';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) { 
        var endpoint = `${serviceUri}?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
    xls(info) {
        var endpoint = `${serviceUri}/download?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}