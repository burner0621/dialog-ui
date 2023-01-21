import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "inventory-weaving/inventory-weaving-detail-recaps";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);

        console.log(info);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?fromList=${info.from}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;       
        return super.getXls(endpoint);
    }
    
}