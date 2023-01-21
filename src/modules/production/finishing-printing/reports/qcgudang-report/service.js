import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/quality-control/packings/reports/qcgudang';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    getReport(sdate, edate) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
       
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate) {
        var endpoint = `${serviceUri}/downloads/xls`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
      
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}