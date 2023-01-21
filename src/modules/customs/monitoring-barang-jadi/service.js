
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


// const serviceUri = 'customs-reports';
const serviceUri = 'expenditure-goods';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        // super(http, aggregator, config, "customs-report");
        super(http, aggregator, config, "garment-production");
    }

    search(info) { 
        // var endpoint = `${serviceUri}/exgood`;
        var endpoint = `${serviceUri}/report-out`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/report-out/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}