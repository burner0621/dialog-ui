import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/reports/categories';

export class Service extends RestService {
 
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getByData(sdate, edate) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }       
        if (query != '')
            endpoint = `${serviceUri}?${query}`;
        return super.get(endpoint);
    }

    generateExcel(sdate, edate) {
        var endpoint =  `${serviceUri}/download`;
        var query = '';
      
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (query !== '')
        console.log(query);
        endpoint = `${serviceUri}/download?${query}`;
        return super.getXls(endpoint);
    }

}
