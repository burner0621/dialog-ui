import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-stocks/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}/recapStock`;
        console.log(endpoint, info);
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        console.log(endpoint, info);
        return super.getXls(endpoint);
    }
    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download-recap-stock`;
        var query = '';

        if (info.dateFrom)
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }

        if (query !== '')
            endpoint = `${serviceUri}/download-recap-stock?${query}`;

        return endpoint;
    }
}