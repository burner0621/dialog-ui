import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/report/annual-omzet-by-unit';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) { 
        var endpoint = `${serviceUri}?year=${info.year}`;
        return super.get(endpoint);
        
    }
    
    xls(info) {
        var endpoint = `${serviceUri}/download?year=${info.year}`;
        return super.getXls(endpoint);
    }
}