import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'garment-purchase-book-reports';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

search(info) { 
        console.log(info);
        var endpoint = `${serviceUri}?unit=${info.unit}&jnsSpl=${info.jnsSpl}&payMtd=${info.payMtd}&category=${info.category}&year=${info.year}`;
        return super.get(endpoint);
        
    }
    
generateExcel(info) {
        var endpoint = `${serviceUri}/download?unit=${info.unit}&jnsSpl=${info.jnsSpl}&payMtd=${info.payMtd}&category=${info.category}&year=${info.year}`;
        return super.getXls(endpoint);
    }
}

