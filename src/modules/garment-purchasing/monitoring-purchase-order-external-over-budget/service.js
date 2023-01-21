import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'purchase-orders-externals-over-budget';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(epono,  unit,  supplier,  status,   dateFrom, dateTo) {
       
        var endpoint = `${serviceUri}/download?epono=${epono}&unit=${unit}&supplier=${supplier}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = serviceUri;
        var query = '';

        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;

        if (info.supplier)
            query = `${query}&supplier=${info.supplier}`;

        if (info.unit)
            query = `${query}&unit=${info.unit}`;
 

        if (info.epono)
            query = `${query}&epono=${info.epono}`;

        if (info.status) {
            query = `${query}&status=${info.status}`;
        }

        if (query !== '') {
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }
        return endpoint;
    }
}