
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';


const serviceUri = "report-recap-stock-type";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/download?dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}