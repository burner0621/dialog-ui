
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


// const serviceUri = 'customs-reports';
const serviceUri = 'traceable';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        // super(http, aggregator, config, "customs-report");
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}/in`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/in/download?bcno=${info.bcno}&type=${info.type}&tipebc=${info.tipebc}&DateFrom=${info.dateFrom}&DateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}