import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'garment-purchase-book-report';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

search(info) { 
        var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&category=${info.category}&supplierType=${info.suppliertype}&suppliercode=${info.supplier}`;
        console.log(endpoint);
        return super.get(endpoint);
        
    }
    
generateExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&category=${info.category}&supplierType=${info.suppliertype}&suppliercode=${info.supplier}`;
        console.log(endpoint);
        return super.getXls(endpoint);
    }
}
