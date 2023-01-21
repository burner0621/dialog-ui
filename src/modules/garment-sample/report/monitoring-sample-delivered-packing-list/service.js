import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';


const serviceUri = 'garment-shipping/delivered-packing-list';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        let endpoint = `${serviceUri}?invoiceNo=${info.invoiceNo}&paymentTerm=${info.paymentTerm}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       
        return super.get(endpoint);
  
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?invoiceNo=${info.invoiceNo}&paymentTerm=${info.paymentTerm}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}
