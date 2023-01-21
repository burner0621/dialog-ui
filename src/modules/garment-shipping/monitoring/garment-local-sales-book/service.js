import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service'; 

const serviceUri = 'garment-shipping/monitoring/garment-local-sales-book';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

search(info) {
  console.log(info); 
        var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
    }
    
generateExcel(info) { 
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}