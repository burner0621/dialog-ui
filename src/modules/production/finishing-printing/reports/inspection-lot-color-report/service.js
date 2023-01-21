import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/inspection-lot-color';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    search(info) {
        var endpoint = this._getEndPoint(info);
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.fabricQc) {
            if (query === '') query = `fabricQc=${info.fabricQc}`;
            else query = `${query}&fabricQc=${info.fabricQc}`;
        }

        if (info.kanban) {
            if (query === '') query = `kanban=${info.kanban}`;
            else query = `${query}&kanban=${info.kanban}`;
        }

        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return endpoint;
    }
}