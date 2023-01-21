import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'production/kanbans/snapshot/downloads/xls';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    getReport(sdate, edate, machine, kanban) {
        var endpoint = `${serviceUri}`;
        var query = '';
        
        if (sdate) {
            if (query === '') query = `dateFrom=${(sdate)}`;
            else query = `${query}&dateFrom=${(sdate)}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${(edate)}`;
            else query = `${query}&dateTo=${(edate)}`;
        }
        if (machine) {
            if (query === '') query = `machine=${machine.Id}`;
            else query = `${query}&machine=${machine.Id}`;
        }
        if (kanban) {
            if (query === '') query = `kanban=${kanban.Id}`;
            else query = `${query}&kanban=${kanban.Id}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
            
        return super.get(endpoint);
    }

    generateExcel(month, year) {
        
        var endpoint = `${serviceUri}`;
        var query = '';
        if (month) {
            if (query === '') query = `month=${month}`;
            else query = `${query}&month=${month}`;
        }

        if (year) {
            if (query === '') query = `year=${year}`;
            else query = `${query}&year=${year}`;
        }
        
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }
}