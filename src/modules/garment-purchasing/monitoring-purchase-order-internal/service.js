import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'purchase-orders-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) {
        var endpoint = `${serviceUri}/get/report`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info, '/get/report');
        return super.getXls(endpoint);
    }

    _getEndPoint(info, uri) {
        var endpoint = `${serviceUri}${uri}`;
        var query = '';

        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;

        if (info.buyer)
            query = `${query}&buyer=${info.buyer}`;

        if (info.unit)
            query = `${query}&unit=${info.unit}`;

        if (info.category)
            query = `${query}&category=${info.category}`;
        if (info.no)
            query = `${query}&_id=${info.no}`;
            
        if (query !== '') {
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }

        return endpoint;
    }
}