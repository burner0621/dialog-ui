
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'garment-unit-receipt-notes';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}/monitoring-in`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/monitoring-in/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&type=${info.type}`;
        return super.getXls(endpoint);
    }
}