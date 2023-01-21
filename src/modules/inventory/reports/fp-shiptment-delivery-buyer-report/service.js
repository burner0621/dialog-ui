import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "inventory/reports/fp-shipment-document-buyer-delivery-report-router";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }


    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {

        var endpoint = `${serviceUri}`;
        var query = '';

        if (info.year) {
            if (query === '') query = `year=${info.year}`;
            else query = `${query}&year=${info.year}`;
        }
        if (info.month) {
            if (query === '') query = `month=${info.month}`;
            else query = `${query}&month=${info.month}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return endpoint;
    }

}